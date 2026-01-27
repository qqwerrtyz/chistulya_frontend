"use client"
import Image from "next/image"
import avatarImage from "../../../public/avatar/avatar"
import styles from "./reg.module.css"
import {  useState } from "react"
import icons from "../../../public/icons/icons"
import Link from "next/link"
import ShowInput from "@/components/app/another/inputForLogAndReg/showInput"


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

    function isValidEmail(email) {
        email = data[email]
        if (typeof email !== "string") return false;

        if (!email.includes("@")) return false;

        const parts = email.split("@");
        if (parts.length !== 2) return false;

        const [name, domain] = parts;

        if (!name || !domain) return false;

        // ---- проверка имени (до @) ----

        // запрещаем начальную и конечную точку
        if (name.startsWith(".") || name.endsWith(".")) return false;

        // запрещаем две точки подряд
        if (name.includes("..")) return false;

        // разрешённые символы
        for (let char of name) {
            const isLetter = char >= "a" && char <= "z" || char >= "A" && char <= "Z";
            const isNumber = char >= "0" && char <= "9";
            const isAllowedSymbol = char === "." || char === "_" || char === "-";

            if (!isLetter && !isNumber && !isAllowedSymbol) {
                return false;
            }
        }

        // ---- проверка домена ----

        if (!domain.includes(".")) return false;

        const domainParts = domain.split(".");
        if (domainParts.some(part => part.length === 0)) return false;

        for (let part of domainParts) {
            for (let char of part) {
                const isLetter = char >= "a" && char <= "z" || char >= "A" && char <= "Z";
                const isNumber = char >= "0" && char <= "9";

                if (!isLetter && !isNumber) {
                    return false;
                }
            }
        }

        return true;
    }

    function isValidName(name) {
        name = data[name]
        if (typeof name !== "string") return false;

        const trimmed = name.trim();
        if (trimmed.length === 0) return false; // пустая строка

        // Быстрые запрещающие проверки:
        // - цифры и точки недопустимы
        if (/[0-9.]/.test(trimmed)) return false;

        // Разбиваем по пробелам на "части" (например: "Анна Мария")
        const parts = trimmed.split(/\s+/);
        for (const part of parts) {
            if (part.length === 0) return false; // двойные пробелы или пустая часть

            // Допустимы только буквы (латиница или кириллица) — никаких знаков/символов
            if (/[^A-Za-z\u0400-\u04FF]/.test(part)) return false;

            const isCyrillic = /^[\u0400-\u04FF]+$/.test(part);
            const isLatin    = /^[A-Za-z]+$/.test(part);

            // Часть должна быть либо полностью русской, либо полностью английской
            if (!isCyrillic && !isLatin) return false;
        }

        return true;
    }

    function isValidPass(pass) {
        pass = data[pass]
        if (typeof pass !== "string") return false;

        // минимальная длина
        if (pass.length < 8) return false;

        // пробелы запрещены
        if (/\s/.test(pass)) return false;

        // обязательные группы символов
        if (!/[a-z]/.test(pass)) return false; // строчные буквы
        if (!/[A-Z]/.test(pass)) return false; // заглавные буквы
        if (!/[0-9]/.test(pass)) return false; // цифры

        return true;
        }




    function chekField(type) {


        for (let value in data) {
            if (value === "email") {
                if (!isValidEmail(value)) {
                    alert("не корректный email")
                    return false
                }
                setInputDone(prev => {
                    let clone = {
                        ...prev,
                        value: true
                    };
                    
                })
            } else if (value === "name") {
                if (!isValidName(value)) {
                    alert("введите корректное имя")
                    return false
                }
                setInputDone(prev => {
                    let clone = {
                        ...prev,
                        value: true
                    };
                    
                })

            } else if (value === "pass") {
                if (!isValidPass(value)) {
                    alert("Введите корректный пароль")
                    return false
                }
                setInputDone(prev => {
                    let clone = {
                        ...prev,
                        value: true
                    };
                    
                })

            }
        }

        return alert("Вы успешно зарегистрировались!")
        
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

                    <div className={styles.regButtonWrapper} onClick={()=> chekField()}>
                        <span className={`${styles.regButton} ${styles.regButtonActive}`}>Зарегистрироваться</span>
                    </div>

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