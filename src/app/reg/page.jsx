"use client"
import Image from "next/image"
import avatarImage from "../../../public/avatar/avatar"
import styles from "./reg.module.css"
import {  useState } from "react"
import icons from "../../icons/icons"
import Link from "next/link"
import ShowInput from "@/components/app/another/inputForLogAndReg/showInput"

const REGISTER_MUTATION = `
  mutation Register(
    $email: String!
    $password: String!
    $captcha_token: String
    $device: String
  ) {
    register(
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

export default function Reg() {
    const [data, setData] = useState({
        email: null,
        name: null,
        pass: null
    })

    const [inputDone, setInputDone] = useState({
        email: false,
        name: false,
        pass: false
    })

    const [err, setErr] = useState()

    async function handleRegister() {
        setErr(null)

        try {
            const response = await fetch("/api/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    query: REGISTER_MUTATION,
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

            const payload = result.data.register

            if (!payload.success) {
                const firstError = payload.errors?.[0]

                if (firstError?.__typename === "ValidationError") {
                    setErr(firstError.fields?.[0]?.messages?.[0] || firstError.message)
                    return
                }

                setErr(firstError?.message || "Ошибка регистрации")
                return
            }

            localStorage.setItem("access_token", payload.tokens.access.token)
            localStorage.setItem("refresh_token", payload.tokens.refresh.token)
            localStorage.setItem("session_id", payload.tokens.session_id)

            console.log("Регистрация успешна", payload.tokens)

            alert("Вы успешно зарегистрированы")
            window.location.href = "/log"

        } catch (error) {
            setErr("Ошибка соединения с сервером")
        }
    }


    return (
        <div className={styles.regWrapper}>
            <div className={styles.reg}>

                <div className={`${styles.regPersWrapper} ${styles.regPersWrapperAvatar}`}>
                    <Image src={avatarImage.avatar} className={styles.regPers}/>
                </div>

                <div className={`${styles.regInputWrapper} ${styles.regPersWrapperFields}`}>
                    <>
                        <ShowInput 
                            title="Email" 
                            nameData="email" 
                            placeholder="Введите email"
                            data={data}
                            setData={setData}
                        />
                        <ShowInput 
                            title="Имя" 
                            nameData="name" 
                            placeholder="Введите ваше имя"
                            data={data}
                            setData={setData}
                        />
                        <ShowInput 
                            title="Пароль" 
                            nameData="pass" 
                            type="password"
                            placeholder="Введите пароль"
                            data={data}
                            setData={setData}
                            
                        />
                    </>

                    {/* <div className={styles.regButtonWrapper}>
                        <span className={`${styles.regButton} ${styles.regButtonActive}`}>Зарегистрироваться</span>
                    </div> */}

                    <div className={styles.regButtonWrapper}>
                        <span 
                            className={`${styles.regButton} ${styles.regButtonActive}`}
                            onClick={handleRegister}
                        >
                            Зарегистрироваться
                        </span>
                    </div>

                    {err && <div>{err}</div>}

                    <div className={styles.orWrapper}>
                        <span className={styles.or}>или</span>
                    </div>

                    <div className={styles.regIntegrationsWrapper}>
                        <div className={styles.regIntegration}>
                            <Image src={icons.google} className={styles.regIntegrationIcon}/>
                        </div>

                        <div className={styles.regIntegration}>
                            <Image src={icons.apple} className={styles.regIntegrationIcon}/>
                        </div>
                    </div>

                    <div className={styles.haveAccountWrapper}>
                        <span className={styles.haveAccount}>У вас уже есть аккаунт? <Link href={"/log"} className={styles.haveAccountLink}>Войти</Link></span>
                    </div>
                </div>
                
                
            </div>

           
        </div>
    )
}