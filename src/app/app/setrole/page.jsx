"use client"

import { GRAPHQL_URL } from "@/config/publicEnv"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const ME_QUERY = `
  query Me {
    me {
      id
      email
      role
      profile {
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
    }
  }
`

export default function SetRole() {
    const router = useRouter()

    const [user, setUser] = useState(null)
    const [selectedRole, setSelectedRole] = useState(null)
    const [err, setErr] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function getUser() {
            const accessToken = localStorage.getItem("access_token")

            if (!accessToken) {
                router.replace("/log")
                return
            }

            try {
                const response = await fetch(GRAPHQL_URL, {
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

                console.log("SET ROLE USER:", result)

                const currentUser = result.data?.me

                if (!currentUser) {
                    router.replace("/log")
                    return
                }

                // if (currentUser.profile?.role === "parent" || currentUser.profile?.role === "child") {
                //     router.replace("/app/getrole")
                //     return
                // }

                setUser(currentUser)
                setIsLoading(false)

            } catch (error) {
                console.log("SET ROLE GET USER ERROR:", error)
                router.replace("/log")
            }
        }

        getUser()
    }, [router])

    async function handleSetRole() {
        if (!selectedRole) {
            setErr("Выберите роль")
            return
        }

        setErr(null)

        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
            router.replace("/log")
            return
        }

        try {
            const response = await fetch(GRAPHQL_URL, {
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

            console.log("SET ROLE RESULT:", result)

            const payload = result.data?.upsertProfile

            if (!payload?.success) {
                const firstError = payload?.errors?.[0]

                if (firstError?.__typename === "ValidationError") {
                    setErr(firstError.fields?.[0]?.messages?.[0] || firstError.message)
                    return
                }

                setErr(firstError?.message || "Ошибка установки роли")
                return
            }

            router.replace("/app/getrole")

        } catch (error) {
            console.log("SET ROLE ERROR:", error)
            setErr("Ошибка соединения с сервером")
        }
    }

    if (isLoading) {
        return (
            <div>
                <h1>Подождите... загружаем данные пользователя</h1>
            </div>
        )
    }

    return (
        <div>
            <h1>Выберите роль</h1>

            <div>
                <button
                    type="button"
                    onClick={() => setSelectedRole("parent")}
                    disabled={selectedRole === "parent"}
                >
                    Родитель
                </button>

                <button
                    type="button"
                    onClick={() => setSelectedRole("child")}
                    disabled={selectedRole === "child"}
                >
                    Ребёнок
                </button>
            </div>

            <p>
                Выбранная роль: {selectedRole || "не выбрана"}
            </p>

            {err && (
                <p style={{ color: "red" }}>
                    {err}
                </p>
            )}

            <button
                type="button"
                onClick={handleSetRole}
                disabled={!selectedRole}
            >
                Продолжить
            </button>
        </div>
    )
}