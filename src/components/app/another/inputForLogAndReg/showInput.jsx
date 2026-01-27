"use client"

import Image from "next/image"
import { useState } from "react"
import icons from "../../../../../public/icons/icons"
import styles from "./showInput.module.css"

export default function ShowInput({title, nameData, type = "text", placeholder="Загрузка данных...", data={data}, setData = {setData}}) {
        // Определяем, это поле пароля или нет
    const isPasswordField = nameData === "pass" && type === "password"
    const [showPassword, setShowPassword] = useState(false)
    
    // Тип инпута в зависимости от состояния
    const inputType = isPasswordField && showPassword ? "text" : type
    function saveChange(value) {
        setData(prev => {
            const clone = {
                ...prev,
                [nameData]: value
            }

            return clone
        })
    }

    const [isEyeClose, setIsEyeClose] = useState(true)


    return (
        <div className={styles.regInputItem}>
            <div className={styles.regInputTitleWrapper}>
                <span className={styles.regInputTitle}>
                    {title}
                </span>
                <div className={styles.regInputField}>
                    <input 
                        className={styles.regInput} 
                        placeholder={placeholder} 
                        type={inputType} 
                        value={data[nameData] || ""}
                        onChange={(event) => saveChange(event.target.value, event)}
                    />
                    {
                        type === "password" && (
                            <div className={styles.eyes}>
                                <Image 
                                    src={icons.eye} 
                                    className={`${styles.eye} ${isEyeClose && styles.eyeDNone}`}
                                    onClick={() => {
                                        setIsEyeClose(prev => !prev)
                                        setShowPassword(prev=> !prev)
                                    }}  
                                />
                                <Image 
                                    src={icons.eyeClose} 
                                    className={`${styles.eye} ${!isEyeClose && styles.eyeDNone}`}
                                    onClick={() => {
                                        setIsEyeClose(prev => !prev)
                                        setShowPassword(prev=> !prev)
                                    }}  
                                />
                            </div>
                        )
                    }
                    
                </div>
            </div>
        </div>
    )
}