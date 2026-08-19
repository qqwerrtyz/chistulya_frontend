
"use client"

import { GRAPHQL_URL } from "@/config/publicEnv"

import { useState } from "react"
import icons from "../../../../icons/icons"
import styles from "./../Profile.module.css"
import Item from "./item/Item"

const REQUEST_EMAIL_VERIFICATION_MUTATION = `
    mutation RequestEmailVerification {
        requestEmailVerification {
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

export default function UserData({ user }) {
    const [emailVerificationLoading, setEmailVerificationLoading] = useState(false)

    async function handleRequestEmailVerification() {
        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
            alert("Нет токена авторизации")
            return
        }

        try {
            setEmailVerificationLoading(true)

            const response = await fetch(GRAPHQL_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    query: REQUEST_EMAIL_VERIFICATION_MUTATION
                })
            })

            const result = await response.json()

            console.log("REQUEST EMAIL VERIFICATION RESULT:", result)

            const payload = result.data?.requestEmailVerification

            if (!payload?.success) {
                const firstError = payload?.errors?.[0]

                if (firstError?.__typename === "RateLimitError") {
                    alert(`Повторить можно через ${firstError.retryAfter} сек.`)
                    return
                }

                alert(firstError?.message || result.errors?.[0]?.message || "Не удалось отправить письмо")
                return
            }

            alert("Письмо подтверждения отправлено на почту")

        } catch (error) {
            console.log("REQUEST EMAIL VERIFICATION ERROR:", error)
            alert("Ошибка отправки письма подтверждения")
        } finally {
            setEmailVerificationLoading(false)
        }
    }

    const isEmailVerified = Boolean(user?.email_verified_at)

    const itemData = [
        {   
            name: "password",
            icon: icons.lockData,
            title: "Пароль",
            value: "Нет возможности выводить пароль",
            dropDown: true,
            link: false
        },

        {   
            name: "mail",
            icon: icons.mailData,
            title: "Почта",
            value: user?.email || "Почта не указана",
            dropDown: true,
            link: false
        },

        // {
        //     name: "emailVerification",
        //     icon: icons.qrData,
        //     title: "Подтвердить почту",
        //     value: isEmailVerified 
        //         ? "почта подтверждена" 
        //         : emailVerificationLoading 
        //             ? "Отправляем письмо..." 
        //             : "Кликните для подтверждения",
        //     dropDown: true,
        //     link: false,
        //     valueClickable: !isEmailVerified && !emailVerificationLoading,
        //     onValueClick: handleRequestEmailVerification
        // },

        {
            name: "support",
            icon: icons.supportData,
            title: "Поддержка",
            value: null,
            dropDown: false,
            link: true
        },

        // {
        //     name: "exit",
        //     icon: icons.exitData,
        //     title: "Выход",
        //     value: null,
        //     dropDown: false,
        //     link: true
        // }
    ]

    return (
        <div className={styles.userDataWrapper}>
            <div className={styles.userData}>
                
                {
                    itemData.map((item, index) => {
                        return (
                            <Item 
                                key={`${item.name}-${index}`}
                                name={item.name}
                                icon={item.icon}
                                title={item.title}
                                value={item.value}
                                dropDown={item.dropDown}
                                link={item.link}
                                valueClickable={item.valueClickable}
                                onValueClick={item.onValueClick}
                            />
                        )
                    })
                }

            </div>
        </div>
    )
}