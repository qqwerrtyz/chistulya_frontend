// export default function MaisnPage() {
//     return
// }

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import styles from "./App.module.css"

const ME_QUERY = `
  query Me {
    me {
      id
      email
      profile {
        id
        name
        role
        timezone
      }
    }
  }
`

const UPSERT_PROFILE_MUTATION = `
  mutation UpsertProfile(
    $name: String!
    $role: String
    $timezone: String!
  ) {
    upsertProfile(
      name: $name
      role: $role
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

      profile {
        id
        name
        role
        timezone
      }
    }
  }
`

export default function MaisnPage() {
    const router = useRouter()

    const [user, setUser] = useState(null)
    const [selectedRole, setSelectedRole] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [err, setErr] = useState(null)

    useEffect(() => {
        async function checkRole() {
            const accessToken = localStorage.getItem("access_token")

            if (!accessToken) {
                router.replace("/log")
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
                        query: ME_QUERY
                    })
                })

                const result = await response.json()

                const currentUser = result.data?.me

                if (currentUser) {
                    setUser(currentUser)

                    if (currentUser.profile?.role === "parent") {
                        router.replace("/app/parent")
                        return
                    }

                    if (currentUser.profile?.role === "child") {
                        router.replace("/app/child")
                        return
                    }

                    setIsLoading(false)
                    return
                }

                if (result.errors?.length) {
                    router.replace("/log")
                    return
                }

                router.replace("/log")

            } catch (error) {
                setErr("Ошибка проверки роли пользователя")
                setIsLoading(false)
            }
        }

        checkRole()
    }, [router])

    async function handleContinue() {
        if (!selectedRole) {
            return
        }

        setErr(null)

        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
            router.replace("/log")
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
                    query: UPSERT_PROFILE_MUTATION,
                    variables: {
                        name: user?.profile?.name || user?.email?.split("@")[0] || "Пользователь",
                        role: selectedRole,
                        timezone: user?.profile?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
                    }
                })
            })

            const result = await response.json()

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

                setErr(firstError?.message || "Ошибка сохранения роли")
                return
            }

            if (selectedRole === "parent") {
                router.replace("/app/parent")
                return
            }

            if (selectedRole === "child") {
                router.replace("/app/child")
                return
            }

        } catch (error) {
            setErr("Ошибка соединения с сервером")
        }
    }

    if (isLoading) {
        return (
            <h1 className={styles.loadingTitle}>
                Подождите... Идет проверка роли пользователя
            </h1>
        )
    }

    return (
        <div className={styles.roleModal}>
            <div className={styles.roleContent}>
                <h1 className={styles.title}>Выберите роль</h1>

                <p className={styles.description}>
                    Укажите, кем вы будете пользоваться приложением
                </p>

                <div className={styles.rolesWrapper}>
                    <label className={`${styles.roleItem} ${selectedRole === "parent" ? styles.roleItemActive : ""}`}>
                        <div className={styles.roleImage}>
                            Изображение родителя
                        </div>

                        <div className={styles.roleInfo}>
                            <input
                                type="radio"
                                name="role"
                                value="parent"
                                checked={selectedRole === "parent"}
                                onChange={() => setSelectedRole("parent")}
                                className={styles.roleInput}
                            />

                            <span className={styles.roleName}>Родитель</span>
                        </div>
                    </label>

                    <label className={`${styles.roleItem} ${selectedRole === "child" ? styles.roleItemActive : ""}`}>
                        <div className={styles.roleImage}>
                            Изображение ребёнка
                        </div>

                        <div className={styles.roleInfo}>
                            <input
                                type="radio"
                                name="role"
                                value="child"
                                checked={selectedRole === "child"}
                                onChange={() => setSelectedRole("child")}
                                className={styles.roleInput}
                            />

                            <span className={styles.roleName}>Ребёнок</span>
                        </div>
                    </label>
                </div>

                {err && (
                    <div className={styles.error}>
                        {err}
                    </div>
                )}

                <button
                    type="button"
                    disabled={!selectedRole}
                    onClick={handleContinue}
                    className={`${styles.continueButton} ${selectedRole ? styles.continueButtonActive : ""}`}
                >
                    Продолжить
                </button>
            </div>
        </div>
    )
}