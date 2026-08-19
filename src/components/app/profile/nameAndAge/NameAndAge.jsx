// import styles from './../Profile.module.css';


// export default function NameAndAge() {
//     return (
//         <div className={styles.nameAndAgeWrapper}>
//             <div className={styles.nameAndAge}>
//                 <span className={styles.userName}>Леша</span>
//                 <span className={styles.userAge}>29 лет</span>
//             </div>
//         </div>
//     )
// }


// import styles from './../Profile.module.css';

// export default function NameAndAge({ user }) {
//     const userName = user?.profile?.name || user?.email || "Пользователь"

//     return (
//         <div className={styles.nameAndAgeWrapper}>
//             <div className={styles.nameAndAge}>
//                 <span className={styles.userName}>{userName}</span>
//                 <span className={styles.userAge}>29 лет</span>
//             </div>
//         </div>
//     )
// }


"use client"

import { GRAPHQL_URL } from "@/config/publicEnv"
import { useEffect, useState } from "react";
import styles from './../Profile.module.css';

const UPDATE_PROFILE_NAME_MUTATION = `
  mutation UpdateProfileName(
    $name: String!
    $role: String
    $sex: Boolean
    $date_of_birth: String
    $city: String
    $timezone: String!
  ) {
    upsertProfile(
      name: $name
      role: $role
      sex: $sex
      date_of_birth: $date_of_birth
      city: $city
      timezone: $timezone
    ) {
      success
      errors {
        __typename

        ... on ValidationError {
          message
          fields {
            field
            messages
          }
        }

        ... on RateLimitError {
          message
          retryAfter
        }

        ... on InvalidActionError {
          message
        }
      }
    }
  }
`

export default function NameAndAge({ user }) {
    const userName = user?.profile?.name || user?.email || "Пользователь"

    const [name, setName] = useState(userName)
    const [changeName, setChangeName] = useState(userName)
    const [isEditName, setIsEditName] = useState(false)
    const [err, setErr] = useState(null)

    useEffect(() => {
        setName(userName)
        setChangeName(userName)
    }, [userName])

    async function handleSaveName() {
        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
            setErr("Нет токена авторизации")
            return
        }

        if (!changeName.trim()) {
            setErr("Имя не может быть пустым")
            return
        }

        try {
            setErr(null)

            const response = await fetch(GRAPHQL_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    query: UPDATE_PROFILE_NAME_MUTATION,
                    variables: {
                        name: changeName,
                        role: user?.profile?.role,
                        sex: user?.profile?.sex,
                        date_of_birth: user?.profile?.date_of_birth,
                        city: user?.profile?.city,
                        timezone: user?.profile?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
                    }
                })
            })

            const result = await response.json()

            console.log("UPDATE PROFILE NAME RESULT:", result)

            if (result.errors?.length && !result.data?.upsertProfile) {
                setErr(result.errors[0].message)
                return
            }

            const payload = result.data?.upsertProfile

            if (!payload?.success) {
                const firstError = payload?.errors?.[0]

                if (firstError?.__typename === "ValidationError") {
                    setErr(firstError.fields?.[0]?.messages?.[0] || firstError.message)
                    return
                }

                setErr(firstError?.message || "Ошибка изменения имени")
                return
            }

            setName(changeName)
            setIsEditName(false)

        } catch (error) {
            console.log("UPDATE NAME ERROR:", error)
            setErr("Ошибка соединения с сервером")
        }
    }

    return (
    <div className={styles.nameAndAgeWrapper}>
        <div className={styles.nameAndAge}>

            {isEditName ? (
                <div className={styles.nameEditRow}>
                    <input
                        className={styles.changeName}
                        value={changeName}
                        onChange={(event) => setChangeName(event.target.value)}
                    />

                    {changeName !== name && (
                        <button 
                            className={styles.saveNameButton}
                            onClick={handleSaveName}
                        >
                            сохранить
                        </button>
                    )}
                </div>
            ) : (
                <div className={styles.nameEditRow}>
                    <span className={styles.userName}>{name}</span>

                    <button 
                        className={styles.changeNameButton}
                        onClick={() => {
                            setChangeName(name)
                            setIsEditName(true)
                            setErr(null)
                        }}
                    >
                        изменить
                    </button>
                </div>
            )}

            <span className={styles.userAge}>29 лет</span>

            {err && (
                <div>
                    {err}
                </div>
            )}
        </div>
    </div>
)
}