"use client"
import Image from "next/image"
import styles from "./../Notifications.module.css"
import icons from "../../../../../public/icons/icons"
import { useState } from "react"

export default function Header({selectCategories, setSelectCategories}) {
    
    const categories = [
        {
            ruName: "Активные",
            enName: "active"
        },

        {
            ruName: "Завершенные",
            enName: "notActive"
        }
    ]
    
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                <div className={styles.menu}>

                    {
                        categories.map((item, index) => {
                            const enName = item.enName
                            return (
                                <div 
                                    className={`${styles.categoryWrapper}`}
                                    style={{
                                        backgroundColor: enName === selectCategories ? "#5B84ED" : "",
                                        color: enName === selectCategories ? "#fff" : ""
                                    }}
                                    onClick={() => setSelectCategories(prev => enName)}
                                >
                                    <span className={styles.category}>{item.ruName}</span>
                                </div>
                            )
                        })
                    }
                   


                </div>

                <div className={styles.addNotificationsWrapper}>
                    <Image src={icons.addNotifications} className={styles.addNotifications}/>
                </div>
            </div>
        </div>
    )
}