"use client"
import Header from "@/components/app/notifications/header/Header"
import styles from "./Notifications.module.css"
import Body from "@/components/app/notifications/body/Body"
import { useState } from "react"
export default function Notifications () {
    
    const [selectCategories, setSelectCategories] = useState("active")
    const [showAddNotification, setShowAddNotification] = useState(false)

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
                        setShowAddNotification={setShowAddNotification}
                    />
                    <Body 
                        selectCategories={selectCategories}
                        showAddNotification={showAddNotification}
                        
                        setShowAddNotification={setShowAddNotification}
                    />
                </div>
            </div>
        </div>
    )
}