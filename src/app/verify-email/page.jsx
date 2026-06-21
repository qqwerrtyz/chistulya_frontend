// "use client"

// import { useEffect, useState } from "react"
// import { useRouter, useSearchParams } from "next/navigation"
// import styles from "./ConfirmReg.module.css"

// const VERIFY_EMAIL_MUTATION = `
//     mutation VerifyEmail($token: String!) {
//         verifyEmail(token: $token) {
//             success
//             errors {
//                 __typename

//                 ... on ValidationError {
//                     message
//                     fields {
//                         field
//                         messages
//                     }
//                 }

//                 ... on RateLimitError {
//                     message
//                     retryAfter
//                 }

//                 ... on InvalidActionError {
//                     message
//                 }
//             }
//         }
//     }
// `

// export default function ConfirmReg() {
//     const router = useRouter()
//     const searchParams = useSearchParams()

//     const [status, setStatus] = useState("loading")
//     const [errorMessage, setErrorMessage] = useState("")

//     function getErrorMessage(payload, result) {
//         if (result?.errors?.length) {
//             return result.errors[0].message
//         }

//         const firstError = payload?.errors?.[0]

//         if (!firstError) {
//             return "Не удалось подтвердить почту"
//         }

//         if (firstError.__typename === "ValidationError") {
//             return firstError.fields?.[0]?.messages?.[0] || firstError.message
//         }

//         if (firstError.__typename === "RateLimitError") {
//             return `${firstError.message} Повторите через ${firstError.retryAfter} сек.`
//         }

//         return firstError.message || "Не удалось подтвердить почту"
//     }

//     useEffect(() => {
//         async function confirmEmail() {
//             const token = searchParams.get("token")

//             if (!token) {
//                 setStatus("error")
//                 setErrorMessage("Токен подтверждения отсутствует")
//                 return
//             }

//             try {
//                 const response = await fetch("/api/graphql", {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json"
//                     },
//                     body: JSON.stringify({
//                         query: VERIFY_EMAIL_MUTATION,
//                         variables: {
//                             token: token
//                         }
//                     })
//                 })

//                 const result = await response.json()

//                 console.log("VERIFY EMAIL RESULT:", result)

//                 const payload = result.data?.verifyEmail

//                 if (!payload?.success) {
//                     setStatus("error")
//                     setErrorMessage(getErrorMessage(payload, result))
//                     return
//                 }

//                 setStatus("success")

//             } catch (error) {
//                 console.log("VERIFY EMAIL ERROR:", error)
//                 setStatus("error")
//                 setErrorMessage("Ошибка соединения с сервером")
//             }
//         }

//         confirmEmail()
//     }, [searchParams])

//     return (
//         <div className={styles.confirmRegWrapper}>
//             <div className={styles.confirmReg}>
//                 <div className={styles.confirmRegCard}>

//                     {status === "loading" && (
//                         <>
//                             <div className={styles.confirmRegIconWrapper}>
//                                 <span className={styles.confirmRegIcon}>...</span>
//                             </div>

//                             <h1 className={styles.confirmRegTitle}>
//                                 Подтверждаем почту
//                             </h1>

//                             <p className={styles.confirmRegText}>
//                                 Подождите, идёт проверка ссылки подтверждения.
//                             </p>
//                         </>
//                     )}

//                     {status === "success" && (
//                         <>
//                             <div className={styles.confirmRegIconWrapperSuccess}>
//                                 <span className={styles.confirmRegIcon}>✓</span>
//                             </div>

//                             <h1 className={styles.confirmRegTitle}>
//                                 ваша почта успешно подтверждена
//                             </h1>

//                             <p className={styles.confirmRegText}>
//                                 Теперь вы можете войти в аккаунт.
//                             </p>
//                         </>
//                     )}

//                     {status === "error" && (
//                         <>
//                             <div className={styles.confirmRegIconWrapperError}>
//                                 <span className={styles.confirmRegIcon}>!</span>
//                             </div>

//                             <h1 className={styles.confirmRegTitle}>
//                                 Возникли проблемы
//                             </h1>

//                             <p className={styles.confirmRegText}>
//                                 {errorMessage}
//                             </p>

//                             <p className={styles.confirmRegHelpText}>
//                                 обратитесь к администратору
//                             </p>
//                         </>
//                     )}

//                     <button
//                         className={styles.confirmRegButton}
//                         onClick={() => router.push("/log")}
//                     >
//                         Перейти на логин
//                     </button>

//                 </div>
//             </div>
//         </div>
//     )
// }


import { Suspense } from "react"
import ConfirmRegClient from "./ConfirmRegClient"
import styles from "./ConfirmReg.module.css"

export default function ConfirmReg() {
    return (
        <Suspense 
            fallback={
                <div className={styles.confirmRegWrapper}>
                    <div className={styles.confirmReg}>
                        <div className={styles.confirmRegCard}>
                            <div className={styles.confirmRegIconWrapper}>
                                <span className={styles.confirmRegIcon}>...</span>
                            </div>

                            <h1 className={styles.confirmRegTitle}>
                                Подтверждаем почту
                            </h1>

                            <p className={styles.confirmRegText}>
                                Подождите, идёт проверка ссылки подтверждения.
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <ConfirmRegClient />
        </Suspense>
    )
}