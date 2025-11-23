"use client"
import Header from "@/components/app/notifications/header/Header"
import styles from "./Notifications.module.css"
import Body from "@/components/app/notifications/body/Body"
import { useState } from "react"
export default function Notifications () {
    
    const [selectCategories, setSelectCategories] = useState("active")

    return (
        <div className={styles.notificationsWrapper}>
            <div className={styles.notifications}>
                <div className={styles.notificationsHealineWrapper}>
                    <h1 className={styles.notificationsHealine}>Напоминания</h1>
                </div>

                <div className={styles.notificationsContent}>
                    <Header 
                        selectCategories={selectCategories}
                        setSelectCategories={setSelectCategories}
                    />
                    <Body selectCategories={selectCategories}/>
                </div>
            </div>
        </div>
    )
}