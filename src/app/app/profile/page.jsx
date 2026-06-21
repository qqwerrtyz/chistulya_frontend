// "use client"

// import { useEffect, useState } from "react"
// import Avatar from "@/components/app/profile/avatar/Avatar"
// import styles from "./Profile.module.css"
// import NameAndAge from "@/components/app/profile/nameAndAge/NameAndAge"
// import UserData from "@/components/app/profile/userData/UserData"

// const CURRENT_USER_FULL_INFO_QUERY = `
//   query CurrentUserFullInfo {
//     me {
//       id
//       email
//       role
//       email_verified_at
//       created_at

//       profile {
//         name
//         role
//         sex
//         date_of_birth
//         city
//         timezone
//       }

//       wallet {
//         child_id
//         coins
//       }

//       exp {
//         child_id
//         level
//         xp
//       }

//       parents {
//         id
//         email
//         role
//         email_verified_at
//         created_at

//         profile {
//           name
//           role
//           sex
//           date_of_birth
//           city
//           timezone
//         }

//         wallet {
//           child_id
//           coins
//         }

//         exp {
//           child_id
//           level
//           xp
//         }
//       }

//       children {
//         id
//         email
//         role
//         email_verified_at
//         created_at

//         profile {
//           name
//           role
//           sex
//           date_of_birth
//           city
//           timezone
//         }

//         wallet {
//           child_id
//           coins
//         }

//         exp {
//           child_id
//           level
//           xp
//         }
//       }
//     }
//   }
// `

// export default function Profile() {
//     const [user, setUser] = useState(null)
//     const [err, setErr] = useState(null)

//     useEffect(() => {
//         async function getCurrentUserFullInfo() {
//             const accessToken = localStorage.getItem("access_token")

//             if (!accessToken) {
//                 setErr("Нет токена авторизации")
//                 return
//             }

//             try {
//                 const response = await fetch("/api/graphql", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Bearer ${accessToken}`
//                     },
//                     body: JSON.stringify({
//                         query: CURRENT_USER_FULL_INFO_QUERY
//                     })
//                 })

//                 const result = await response.json()

//                 console.log("CURRENT USER FULL INFO RESULT:", result)

//                 if (result.data?.me) {
//                     setUser(result.data.me)
//                     return
//                 }

//                 if (result.errors?.length) {
//                     setErr(result.errors[0].message)
//                     return
//                 }

//                 setErr("Не удалось получить данные пользователя")

//             } catch (error) {
//                 console.log("PROFILE USER INFO ERROR:", error)
//                 setErr("Ошибка загрузки данных пользователя")
//             }
//         }

//         getCurrentUserFullInfo()
//     }, [])

//     const appRole = user?.profile?.role
//     const systemRole = user?.role
//     const coins = user?.wallet?.coins
//     const level = user?.exp?.level
//     const xp = user?.exp?.xp

//     return (
//         <div className={styles.profileWrapper}>
//             <div className={styles.profile}>

//                 <Avatar />

//                 <NameAndAge />

//                 <div className={styles.userData}>
//                     <UserData />
//                 </div>

//                 {err && (
//                     <div>
//                         {err}
//                     </div>
//                 )}
                
//                 {/* Это не трогать не при каких обстоятельствах */}
//                 {user && (
//                     <div>
//                         <div>
//                             Email: {user.email}
//                         </div>

//                         <div>
//                             Системная роль: {systemRole || "Не указана"}
//                         </div>

//                         <div>
//                             Роль в приложении: {appRole || "Роль не выбрана"}
//                         </div>

//                         <div>
//                             Баланс: {coins ?? 0}
//                         </div>

//                         <div>
//                             Уровень: {level ?? 0}
//                         </div>

//                         <div>
//                             XP: {xp ?? 0}
//                         </div>
//                     </div>
//                 )}

//                 <button onClick={() => console.log("USER DATA:", user)}>
//                     user data
//                 </button>

//             </div>
//         </div>
//     )
// }

"use client"

import { useEffect, useState } from "react"
import Avatar from "@/components/app/profile/avatar/Avatar"
import styles from "./Profile.module.css"
import NameAndAge from "@/components/app/profile/nameAndAge/NameAndAge"
import UserData from "@/components/app/profile/userData/UserData"

const CURRENT_USER_FULL_INFO_QUERY = `
  query CurrentUserFullInfo {
    me {
      id
      email
      role
      email_verified_at
      created_at

      profile {
        name
        role
        sex
        date_of_birth
        city
        timezone
      }

      wallet {
        child_id
        coins
      }

      exp {
        child_id
        level
        xp
      }

      parents {
        id
        email
        role
        email_verified_at
        created_at

        profile {
          name
          role
          sex
          date_of_birth
          city
          timezone
        }

        wallet {
          child_id
          coins
        }

        exp {
          child_id
          level
          xp
        }
      }

      children {
        id
        email
        role
        email_verified_at
        created_at

        profile {
          name
          role
          sex
          date_of_birth
          city
          timezone
        }

        wallet {
          child_id
          coins
        }

        exp {
          child_id
          level
          xp
        }
      }
    }
  }
`

const REQUEST_MEDIA_UPLOAD_MUTATION = `
  mutation RequestMediaUpload($file_name: String!) {
    requestMediaUpload(file_name: $file_name) {
      success
      media_id
      upload_url
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

const CONFIRM_MEDIA_UPLOAD_MUTATION = `
  mutation ConfirmMediaUpload($media_id: String!) {
    confirmMediaUpload(media_id: $media_id) {
      success
      media {
        id
        file_name
        mime_type
        size
        url
        uploaded_at
        created_at
      }
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

export default function Profile() {
    const [user, setUser] = useState(null)
    const [avatarUrl, setAvatarUrl] = useState(null)
    const [err, setErr] = useState(null)

    useEffect(() => {
        async function getCurrentUserFullInfo() {
            const accessToken = localStorage.getItem("access_token")

            if (!accessToken) {
                setErr("Нет токена авторизации")
                return
            }

            try {
                const response = await fetch("/api/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        query: CURRENT_USER_FULL_INFO_QUERY
                    })
                })

                const result = await response.json()

                console.log("CURRENT USER FULL INFO RESULT:", result)

                if (result.data?.me) {
                    setUser(result.data.me)
                    return
                }

                if (result.errors?.length) {
                    setErr(result.errors[0].message)
                    return
                }

                setErr("Не удалось получить данные пользователя")

            } catch (error) {
                console.log("PROFILE USER INFO ERROR:", error)
                setErr("Ошибка загрузки данных пользователя")
            }
        }

        getCurrentUserFullInfo()
    }, [])

    async function handleUploadAvatar(file) {
        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
            setErr("Нет токена авторизации")
            return
        }

        if (!file) {
            return
        }

        try {
            setErr(null)

            const requestResponse = await fetch("/api/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    query: REQUEST_MEDIA_UPLOAD_MUTATION,
                    variables: {
                        file_name: file.name
                    }
                })
            })

            const requestResult = await requestResponse.json()

            console.log("REQUEST MEDIA UPLOAD RESULT:", requestResult)

            const requestPayload = requestResult.data?.requestMediaUpload

            if (!requestPayload?.success) {
                const firstError = requestPayload?.errors?.[0]
                setErr(firstError?.message || requestResult.errors?.[0]?.message || "Ошибка подготовки загрузки фото")
                return
            }

            const uploadResponse = await fetch(requestPayload.upload_url, {
                method: "PUT",
                body: file
            })

            if (!uploadResponse.ok) {
                setErr("Ошибка загрузки файла")
                return
            }

            const confirmResponse = await fetch("/api/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    query: CONFIRM_MEDIA_UPLOAD_MUTATION,
                    variables: {
                        media_id: requestPayload.media_id
                    }
                })
            })

            const confirmResult = await confirmResponse.json()

            console.log("CONFIRM MEDIA UPLOAD RESULT:", confirmResult)

            const confirmPayload = confirmResult.data?.confirmMediaUpload

            if (!confirmPayload?.success) {
                const firstError = confirmPayload?.errors?.[0]
                setErr(firstError?.message || confirmResult.errors?.[0]?.message || "Ошибка подтверждения загрузки фото")
                return
            }

            setAvatarUrl(confirmPayload.media?.url || null)

        } catch (error) {
            console.log("UPLOAD AVATAR ERROR:", error)
            setErr("Ошибка загрузки фото")
        }
    }

    const appRole = user?.profile?.role
    const systemRole = user?.role
    const coins = user?.wallet?.coins
    const level = user?.exp?.level
    const xp = user?.exp?.xp

    return (
        <div className={styles.profileWrapper}>
            <div className={styles.profile}>

                <Avatar 
                    avatarUrl={avatarUrl}
                    onUploadAvatar={handleUploadAvatar}
                />

                <NameAndAge user={user} />

                <div className={styles.userData}>
                    <UserData user={user} />
                </div>

                {err && (
                    <div>
                        {err}
                    </div>
                )}
                
                {/* Это не трогать не при каких обстоятельствах */}
                {user && (
                    <div>
                        <div>
                            Email: {user.email}
                        </div>

                        <div>
                            Системная роль: {systemRole || "Не указана"}
                        </div>

                        <div>
                            Роль в приложении: {appRole || "Роль не выбрана"}
                        </div>

                        <div>
                            Баланс: {coins ?? 0}
                        </div>

                        <div>
                            Уровень: {level ?? 0}
                        </div>

                        <div>
                            XP: {xp ?? 0}
                        </div>
                    </div>
                )}

                <button onClick={() => console.log("USER DATA:", user)}>
                    user data
                </button>

            </div>
        </div>
    )
}