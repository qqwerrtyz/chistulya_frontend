// import Image from "next/image"
// import styles from "./../Notifications.module.css"
// import icons from "../../../../icons/icons"
// import { useState } from "react"
// import AddNotification from "../addNotification/AddNotification"
// export default function Body({selectCategories, showAddNotification, setShowAddNotification}) {
    
//     const [notifications, setNotifications] = useState({
//         active: {
//             name: "active",
//             item: [
//                 {
//                     author: "me",
//                     title: "Напоминание 1",
//                     subTitle: "Тут будет текст про напоминание 1",
//                     time: "00:46",
//                     interval: "Каждый четверг",
//                     type: "everydayTask",
//                     ruType: "Ежедневные задания",
//                     done: true
//                 },

//                 {
//                     author: "parent",
//                     title: "Напоминание 2",
//                     subTitle: "Тут будет текст про напоминание 2",
//                     time: "00:46",
//                     interval: "Каждый четверг",
//                     type: "everydayTask",
//                     ruType: "Ежедневные задания",
//                     done: false
//                 }
//             ]
//         },

//         notActive: {
//             name: "notActive",
//             item: [
//                 {
//                     title: "Напоминание 3",
//                     subTitle: "Текст напоминания 3"
//                 },

//                 {
//                     title: "Напоминание 4",
//                     subTitle: "Текст напоминания 4"
//                 }
//             ]
//         }
//     })

    

//     function handleComplete(_valueIgnored, indexItem) {
//         setNotifications(prev => {
//         // защитимся на случай, если вдруг indexItem вне диапазона
//         const activeItems = prev.active?.item ?? []

//         if (indexItem < 0 || indexItem >= activeItems.length) {
//             // ничего не делаем — возвращаем прежний стейт
//             return prev
//         }

//         // создаём новый массив, где только нужный элемент заменён на новый объект с toggled done
//         const newActiveItems = activeItems.map((el, idx) => {
//             if (idx !== indexItem) return el // не трогаем
//             // возвращаем новый объект (иммутабельно) с инвертированным флагом done
//             return { ...el, done: !el.done }
//         })

//         // возвращаем новый стейт, не мутируя предыдущий
//         return {
//             ...prev,
//             active: {
//             ...prev.active,
//             item: newActiveItems
//             }
//         }
//         })
//     }

//     return (
//         <div className={styles.bodyWrapper}>
//             <div className={styles.body}>
//                 {
//                     // Проходимся по ключам:
//                     // active / notActive
//                     notifications[selectCategories]?.item.map((i, idx) => {
//                         return (
//                             <>
//                                 <div className={`${styles.categoryItemWrapper} ${selectCategories === "active" && styles.categoryItemWrapperMarginBottom}`}>
//                                     <div 
//                                         className={`${styles.categoryContent} `}>
//                                         <span className={styles.categoryTitle}>{i.title}</span>
//                                         <span className={styles.categorySubTitle}>{i.subTitle}</span>
//                                     </div>

//                                     {
//                                         // Для категории Активные
//                                         selectCategories === "active" && (
//                                             <div
//                                                 className={styles.categoryCheckWrapper}
//                                                 onClick={() => handleComplete(i.done, idx)}
//                                             >
//                                                 {
//                                                     i.done && <Image className={styles.categoryCheck} src={icons.cheked}/>
//                                                 }
//                                             </div>
//                                         )
//                                     }
                                    
//                                 </div>

//                                 {
//                                     // Для категории завершенные
//                                     selectCategories === "notActive" && (
//                                         <div className={styles.bringBackWrapper}>
//                                             <Image src={icons.bringBack} className={styles.bringBackIcon}/>
//                                             <span className={styles.bringBack}>Вернуть к активным</span>
//                                         </div>
//                                     )
//                                 }

                                
//                             </>
//                         )
//                     })
//                 }
                
//             </div>
            
//             {
//                 showAddNotification && <AddNotification setShowAddNotification={setShowAddNotification}/>
//             }
            
//         </div>
//     )
// }


import { GRAPHQL_URL } from "@/config/publicEnv"
import Image from "next/image"
import styles from "./../Notifications.module.css"
import icons from "../../../../icons/icons"
import { useEffect, useState } from "react"
import AddNotification from "../addNotification/AddNotification"

const MY_REMINDERS_QUERY = `
    query MyReminders($page: Int!, $perPage: Int!) {
        activeReminders: myReminders(completed: false, page: $page, per_page: $perPage) {
            current_page
            total
            data {
                id
                title
                short_description
                time
                repeating_pattern
                repeating_days
                status
                completed_at
            }
        }

        completedReminders: myReminders(completed: true, page: $page, per_page: $perPage) {
            current_page
            total
            data {
                id
                title
                short_description
                time
                repeating_pattern
                repeating_days
                status
                completed_at
            }
        }
    }
`

const COMPLETE_REMINDER_MUTATION = `
    mutation CompleteReminder($reminder_id: String!) {
        completeReminder(reminder_id: $reminder_id) {
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
        }
    }
`

const ACTIVATE_REMINDER_MUTATION = `
    mutation ActivateReminder($reminder_id: String!) {
        activateReminder(reminder_id: $reminder_id) {
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
        }
    }
`

export default function Body({selectCategories, showAddNotification, setShowAddNotification}) {
    const [notifications, setNotifications] = useState({
        active: {
            name: "active",
            item: []
        },

        notActive: {
            name: "notActive",
            item: []
        }
    })

    function getReminderErrorMessage(payload, result) {
        if (result?.errors?.length) {
            return result.errors[0].message
        }

        const firstError = payload?.errors?.[0]

        if (!firstError) {
            return "Ошибка при работе с напоминанием"
        }

        if (firstError.__typename === "ValidationError") {
            return firstError.fields?.[0]?.messages?.[0] || firstError.message
        }

        if (firstError.__typename === "RateLimitError") {
            return `${firstError.message} Повторите через ${firstError.retryAfter} сек.`
        }

        return firstError.message || "Ошибка при работе с напоминанием"
    }

    function getIntervalText(reminder) {
        const days = {
            monday: "Каждый понедельник",
            tuesday: "Каждый вторник",
            wednesday: "Каждую среду",
            thursday: "Каждый четверг",
            friday: "Каждую пятницу",
            saturday: "Каждую субботу",
            sunday: "Каждое воскресенье"
        }

        if (reminder.repeating_pattern === "weekly" && reminder.repeating_days?.length) {
            return days[reminder.repeating_days[0]] || reminder.repeating_days[0]
        }

        if (reminder.repeating_pattern === "daily") {
            return "Каждый день"
        }

        return "Без повтора"
    }

    function prepareReminder(reminder) {
        return {
            id: reminder.id,
            author: "me",
            title: reminder.title,
            subTitle: reminder.short_description || "",
            time: reminder.time,
            interval: getIntervalText(reminder),
            type: reminder.repeating_pattern,
            ruType: "Напоминание",
            done: false
        }
    }

    async function getReminders() {
        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
            alert("Нет токена авторизации")
            return
        }

        try {
            const response = await fetch(GRAPHQL_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    query: MY_REMINDERS_QUERY,
                    variables: {
                        page: 1,
                        perPage: 20
                    }
                })
            })

            const result = await response.json()

            console.log("MY REMINDERS RESULT:", result)

            if (result.errors?.length) {
                alert(result.errors[0].message)
                return
            }

            setNotifications({
                active: {
                    name: "active",
                    item: result.data?.activeReminders?.data?.map(prepareReminder) || []
                },

                notActive: {
                    name: "notActive",
                    item: result.data?.completedReminders?.data?.map(prepareReminder) || []
                }
            })

        } catch (error) {
            console.log("GET REMINDERS ERROR:", error)
            alert("Ошибка загрузки напоминаний")
        }
    }

    useEffect(() => {
        getReminders()
    }, [showAddNotification])

    async function handleComplete(_valueIgnored, indexItem) {
        const reminder = notifications.active?.item?.[indexItem]

        if (!reminder?.id) {
            return
        }

        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
            alert("Нет токена авторизации")
            return
        }

        try {
            const response = await fetch(GRAPHQL_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    query: COMPLETE_REMINDER_MUTATION,
                    variables: {
                        reminder_id: reminder.id
                    }
                })
            })

            const result = await response.json()

            console.log("COMPLETE REMINDER RESULT:", result)

            const payload = result.data?.completeReminder

            if (!payload?.success) {
                alert(getReminderErrorMessage(payload, result))
                return
            }

            setNotifications(prev => {
                const activeItems = prev.active?.item ?? []
                const completedItem = activeItems[indexItem]

                return {
                    active: {
                        ...prev.active,
                        item: activeItems.filter((_, index) => index !== indexItem)
                    },

                    notActive: {
                        ...prev.notActive,
                        item: [
                            completedItem,
                            ...(prev.notActive?.item ?? [])
                        ]
                    }
                }
            })

        } catch (error) {
            console.log("COMPLETE REMINDER ERROR:", error)
            alert("Ошибка завершения напоминания")
        }
    }

    async function handleActivate(indexItem) {
        const reminder = notifications.notActive?.item?.[indexItem]

        if (!reminder?.id) {
            return
        }

        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
            alert("Нет токена авторизации")
            return
        }

        try {
            const response = await fetch(GRAPHQL_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    query: ACTIVATE_REMINDER_MUTATION,
                    variables: {
                        reminder_id: reminder.id
                    }
                })
            })

            const result = await response.json()

            console.log("ACTIVATE REMINDER RESULT:", result)

            const payload = result.data?.activateReminder

            if (!payload?.success) {
                alert(getReminderErrorMessage(payload, result))
                return
            }

            setNotifications(prev => {
                const notActiveItems = prev.notActive?.item ?? []
                const activeItem = notActiveItems[indexItem]

                return {
                    active: {
                        ...prev.active,
                        item: [
                            activeItem,
                            ...(prev.active?.item ?? [])
                        ]
                    },

                    notActive: {
                        ...prev.notActive,
                        item: notActiveItems.filter((_, index) => index !== indexItem)
                    }
                }
            })

        } catch (error) {
            console.log("ACTIVATE REMINDER ERROR:", error)
            alert("Ошибка возврата напоминания к активным")
        }
    }

    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.body}>
                {
                    notifications[selectCategories]?.item.map((i, idx) => {
                        return (
                            <div key={i.id}>
                                <div className={`${styles.categoryItemWrapper} ${selectCategories === "active" && styles.categoryItemWrapperMarginBottom}`}>
                                    <div 
                                        className={`${styles.categoryContent} `}>
                                        <span className={styles.categoryTitle}>{i.title}</span>
                                        <span className={styles.categorySubTitle}>{i.subTitle}</span>
                                    </div>

                                    {
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
                                    selectCategories === "notActive" && (
                                        <div 
                                            className={styles.bringBackWrapper}
                                            onClick={() => handleActivate(idx)}
                                        >
                                            <Image src={icons.bringBack} className={styles.bringBackIcon}/>
                                            <span className={styles.bringBack}>Вернуть к активным</span>
                                        </div>
                                    )
                                }
                            </div>
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