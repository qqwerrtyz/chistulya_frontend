"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const LINK_CHILD_BY_TOKEN_MUTATION = `
    mutation LinkChildByToken($token: String!) {
        linkChildByToken(token: $token) {
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

export default function LinkChildClient() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [status, setStatus] = useState("loading")
    const [error, setError] = useState("")

    function getErrorMessage(payload, result) {
        if (result?.errors?.length) {
            return result.errors[0].message
        }

        const firstError = payload?.errors?.[0]

        if (!firstError) {
            return "Не удалось привязать ребёнка"
        }

        if (firstError.__typename === "ValidationError") {
            return firstError.fields?.[0]?.messages?.[0] || firstError.message
        }

        if (firstError.__typename === "RateLimitError") {
            return `${firstError.message} Повторите через ${firstError.retryAfter} сек.`
        }

        return firstError.message || "Не удалось привязать ребёнка"
    }

    useEffect(() => {
        async function linkChild() {
            const token = searchParams.get("token")
            const accessToken = localStorage.getItem("access_token")

            if (!token) {
                setStatus("error")
                setError("Токен привязки отсутствует")
                return
            }

            if (!accessToken) {
                setStatus("error")
                setError("Нужно войти в аккаунт родителя")
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
                        query: LINK_CHILD_BY_TOKEN_MUTATION,
                        variables: {
                            token: token
                        }
                    })
                })

                const result = await response.json()

                console.log("LINK CHILD BY TOKEN RESULT:", result)

                const payload = result.data?.linkChildByToken

                if (!payload?.success) {
                    setStatus("error")
                    setError(getErrorMessage(payload, result))
                    return
                }

                setStatus("success")

            } catch (error) {
                console.log("LINK CHILD ERROR:", error)
                setStatus("error")
                setError("Ошибка соединения с сервером")
            }
        }

        linkChild()
    }, [searchParams])

    return (
        <div>
            {status === "loading" && (
                <div>
                    Привязываем ребёнка...
                </div>
            )}

            {status === "success" && (
                <div>
                    <div>
                        Ребёнок успешно привязан
                    </div>

                    <button onClick={() => router.push("/app/parent/")}>
                        Перейти в кабинет родителя
                    </button>
                </div>
            )}

            {status === "error" && (
                <div>
                    <div>
                        {error}
                    </div>

                    <button onClick={() => router.push("/app/parent/")}>
                        Вернуться назад
                    </button>
                </div>
            )}
        </div>
    )
}