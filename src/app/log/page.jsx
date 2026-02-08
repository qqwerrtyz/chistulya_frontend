"use client"

import Image from "next/image"
import styles from "./log.module.css"
import avatarImage from "../../../public/avatar/avatar"
import ShowInput from "@/components/app/another/inputForLogAndReg/showInput"
import { useState } from "react"
import icons from "../../icons/icons"
import Link from "next/link"


export default function Log() {

    const [data, setData] = useState({
        email: null,
        pass: null
    })

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
                    
                    <div className={`${styles.logButtonWrapper} ${styles.logButtonActive}`}>
                        <Link href={"/app/child"} className={styles.logButton}>Войти</Link>
                    </div>

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