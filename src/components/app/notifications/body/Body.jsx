import Image from "next/image"
import styles from "./../Notifications.module.css"
import icons from "../../../../../public/icons/icons"
export default function Body({selectCategories}) {
    const notifications = {
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
    }
    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.body}>
                {
                    // Проходимся по ключам:
                    // active / notActive
                    notifications[selectCategories].item.map((i, idx) => {
                        return (
                            <>
                                <div className={styles.categoryItemWrapper}>
                                    <div className={styles.categoryContent}>
                                        <span className={styles.categoryTitle}>{i.title}</span>
                                        <span className={styles.categorySubTitle}>{i.subTitle}</span>
                                    </div>

                                    {
                                        selectCategories === "active" && (
                                            <div className={styles.categoryCheckWrapper}>
                                                {
                                                    i.done && <Image className={styles.categoryCheck} src={icons.cheked}/>
                                                }
                                            </div>
                                        )
                                    }
                                    
                                </div>

                                {
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
        </div>
    )
}