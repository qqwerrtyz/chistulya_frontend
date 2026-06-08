"use client"

import Image from "next/image"
import styles from "./log.module.css"
import avatarImage from "../../../public/avatar/avatar"
import ShowInput from "@/components/app/another/inputForLogAndReg/showInput"
import { useState } from "react"
import icons from "../../icons/icons"
import Link from "next/link"

const LOGIN_MUTATION = `
  mutation Login(
    $email: String!
    $password: String!
    $captcha_token: String
    $device: String
  ) {
    login(
      email: $email
      password: $password
      captcha_token: $captcha_token
      device: $device
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

      tokens {
        session_id

        access {
          token
          expires_at
        }

        refresh {
          token
          expires_at
        }
      }
    }
  }
`

export default function Log() {

    const [data, setData] = useState({
        email: null,
        pass: null
    })

    const [err, setErr] = useState(null)

    async function handleLogin() {
        setErr(null)

        try {
            const response = await fetch("/api/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: LOGIN_MUTATION,
                    variables: {
                        email: data.email,
                        password: data.pass,
                        captcha_token: null,
                        device: "web"
                    }
                })
            })

            const result = await response.json()

            if (result.errors?.length) {
                setErr(result.errors[0].message)
                return
            }

            const payload = result.data.login

            if (!payload.success) {
                const firstError = payload.errors?.[0]

                if (firstError?.__typename === "ValidationError") {
                    setErr(firstError.fields?.[0]?.messages?.[0] || firstError.message)
                    return
                }

                setErr(firstError?.message || "Ошибка входа")
                return
            }

            localStorage.setItem("access_token", payload.tokens.access.token)
            localStorage.setItem("refresh_token", payload.tokens.refresh.token)
            localStorage.setItem("session_id", payload.tokens.session_id)

            console.log("Вход выполнен успешно", payload.tokens)

            window.location.href = "/app/child"

        } catch (error) {
            setErr("Ошибка соединения с сервером")
        }
    }

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.login}>

                <div className={styles.loginAvatarWrapper}>
                    <Image src={avatarImage.avatar} className={styles.loginAvatar}/>
                </div>

                <div className={styles.loginFieldsContent}>
                    <div className={styles.loginFieldsWrapper}>
                        <ShowInput 
                            title={"Emal"}
                            nameData={"email"}
                            placeholder="Введите email"
                            data={data}
                            setData={setData}
                        />

                        <ShowInput 
                            title={"Пароль"}
                            nameData={"pass"}
                            placeholder="Введите пароль"
                            data={data}
                            type="password"
                            setData={setData}
                        />
                    </div>
                    
                    {/* <div className={`${styles.logButtonWrapper} ${styles.logButtonActive}`}>
                        <Link href={"/app/child"} className={styles.logButton}>Войти</Link>
                    </div> */}

                    <div className={`${styles.logButtonWrapper} ${styles.logButtonActive}`}>
                        <span className={styles.logButton} onClick={handleLogin}>Войти</span>
                    </div>

                    {err && <div>{err}</div>}

                    <div className={styles.orWrapper}>
                        <span className={styles.or}>или</span>
                    </div>

                     <div className={styles.logIntegrationsWrapper}>
                        <div className={styles.logIntegration}>
                            
                            <Image src={icons.google} className={styles.logIntegrationIcon}/>
                        </div>

                        <div className={styles.logIntegration}>
                            <Image src={icons.apple} className={styles.logIntegrationIcon}/>
                        </div>
                    </div>

                    <div className={styles.haveAccountWrapper} style={{display:"flex", flexDirection:"column"}}>
                        <span className={styles.haveAccount}>У вас уже есть аккаунт? </span>
                        <Link href={"/reg"} className={styles.haveAccountLink}>Зарегистрироваться</Link>
                    </div>

                </div>

                
            </div>
        </div>
    )
}