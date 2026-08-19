

"use client"

import {
    APP_URL,
    GRAPHQL_URL
} from "@/config/publicEnv"

import { useEffect, useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import styles from "./QR.module.css"
const GENERATE_FAMILY_LINK_TOKEN_MUTATION = `
    mutation GenerateFamilyLinkToken($ttl_minutes: Int) {
        generateFamilyLinkToken(ttl_minutes: $ttl_minutes) {
            success
            token {
                token
                expires_at
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


export default function QR ({isShow, setIsShow}) {
    const [qrValue, setQrValue] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    function handleClose() {
        setIsShow(prev => !prev)
    }

    function getErrorMessage(payload, result) {
        if (result?.errors?.length) {
            return result.errors[0].message
        }

        const firstError = payload?.errors?.[0]

        if (!firstError) {
            return "Не удалось создать QR-код"
        }

        if (firstError.__typename === "ValidationError") {
            return firstError.fields?.[0]?.messages?.[0] || firstError.message
        }

        if (firstError.__typename === "RateLimitError") {
            return `${firstError.message} Повторите через ${firstError.retryAfter} сек.`
        }

        return firstError.message || "Не удалось создать QR-код"
    }

    useEffect(() => {
        async function generateQrToken() {
            if (!isShow) {
                return
            }

            const accessToken = localStorage.getItem("access_token")

            if (!accessToken) {
                setError("Нет токена авторизации")
                return
            }

            try {
                setIsLoading(true)
                setError("")
                setQrValue("")

                const response = await fetch(GRAPHQL_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        query: GENERATE_FAMILY_LINK_TOKEN_MUTATION,
                        variables: {
                            ttl_minutes: 60
                        }
                    })
                })

                const result = await response.json()

                console.log("GENERATE FAMILY LINK TOKEN RESULT:", result)

                const payload = result.data?.generateFamilyLinkToken

                if (!payload?.success) {
                    setError(getErrorMessage(payload, result))
                    return
                }

                const childLinkToken = payload.token?.token

                if (!childLinkToken) {
                    setError("Сервер не вернул токен привязки")
                    return
                }

                const link =`${APP_URL}/app/parent/link-child?token=${encodeURIComponent(childLinkToken)}`


                setQrValue(link)

            } catch (error) {
                console.log("GENERATE QR TOKEN ERROR:", error)
                setError("Ошибка соединения с сервером")
            } finally {
                setIsLoading(false)
            }
        }

        generateQrToken()
    }, [isShow])

    return (
        isShow && (
            <div className={styles.qrWrapper}>
                <div className={styles.qrBody}>

                    {isLoading && (
                        <span>
                            Создаём QR-код...
                        </span>
                    )}

                    {error && (
                        <span>
                            {error}
                        </span>
                    )}

                    {qrValue && (
                        <QRCodeSVG 
                            value={qrValue}
                            size={220}
                        />
                    )}

                    <div onClick={handleClose} className={styles.qrCloseWrapper}>
                        <span className={styles.qrClose}>Закрыть</span>
                    </div>
                </div>
            </div>
        )
    )
}