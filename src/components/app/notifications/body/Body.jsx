import Image from "next/image"
import styles from "./../Notifications.module.css"
import icons from "../../../../icons/icons"
import { useState } from "react"
import AddNotification from "../addNotification/AddNotification"
export default function Body({selectCategories, showAddNotification, setShowAddNotification}) {
    
    const [notifications, setNotifications] = useState({
        active: {
            name: "active",
            item: [
                {
                    author: "me",
                    title: "Напоминание 1",
                    subTitle: "Тут будет текст про напоминание 1",
                    time: "00:46",
                    interval: "Каждый четверг",
                    type: "everydayTask",
                    ruType: "Ежедневные задания",
                    done: true
                },

                {
                    author: "parent",
                    title: "Напоминание 2",
                    subTitle: "Тут будет текст про напоминание 2",
                    time: "00:46",
                    interval: "Каждый четверг",
                    type: "everydayTask",
                    ruType: "Ежедневные задания",
                    done: false
                }
            ]
        },

        notActive: {
            name: "notActive",
            item: [
                {
                    title: "Напоминание 3",
                    subTitle: "Текст напоминания 3"
                },

                {
                    title: "Напоминание 4",
                    subTitle: "Текст напоминания 4"
                }
            ]
        }
    })

    

    function handleComplete(_valueIgnored, indexItem) {
        setNotifications(prev => {
        // защитимся на случай, если вдруг indexItem вне диапазона
        const activeItems = prev.active?.item ?? []

        if (indexItem < 0 || indexItem >= activeItems.length) {
            // ничего не делаем — возвращаем прежний стейт
            return prev
        }

        // создаём новый массив, где только нужный элемент заменён на новый объект с toggled done
        const newActiveItems = activeItems.map((el, idx) => {
            if (idx !== indexItem) return el // не трогаем
            // возвращаем новый объект (иммутабельно) с инвертированным флагом done
            return { ...el, done: !el.done }
        })

        // возвращаем новый стейт, не мутируя предыдущий
        return {
            ...prev,
            active: {
            ...prev.active,
            item: newActiveItems
            }
        }
        })
    }

    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.body}>
                {
                    // Проходимся по ключам:
                    // active / notActive
                    notifications[selectCategories]?.item.map((i, idx) => {
                        return (
                            <>
                                <div className={`${styles.categoryItemWrapper} ${selectCategories === "active" && styles.categoryItemWrapperMarginBottom}`}>
                                    <div 
                                        className={`${styles.categoryContent} `}>
                                        <span className={styles.categoryTitle}>{i.title}</span>
                                        <span className={styles.categorySubTitle}>{i.subTitle}</span>
                                    </div>

                                    {
                                        // Для категории Активные
                                        selectCategories === "active" && (
                                            <div
                                                className={styles.categoryCheckWrapper}
                                                onClick={() => handleComplete(i.done, idx)}
                                            >
                                                {
                                                    i.done && <Image className={styles.categoryCheck} src={icons.cheked}/>
                                                }
                                            </div>
                                        )
                                    }
                                    
                                </div>

                                {
                                    // Для категории завершенные
                                    selectCategories === "notActive" && (
                                        <div className={styles.bringBackWrapper}>
                                            <Image src={icons.bringBack} className={styles.bringBackIcon}/>
                                            <span className={styles.bringBack}>Вернуть к активным</span>
                                        </div>
                                    )
                                }

                                
                            </>
                        )
                    })
                }
                
            </div>
            
            {
                showAddNotification && <AddNotification setShowAddNotification={setShowAddNotification}/>
            }
            
        </div>
    )
}