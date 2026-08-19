// import Image from "next/image"
// import styles from "./../Notifications.module.css"
// import icons from "../../../../icons/icons"
// import GeneralParamsInput from "./generalParamsInput/GeneralParamsInput"
// import { createContext, useState } from "react"
// import SelectTimeInpup from "./generalParamsInput/SelectTimeInpup"
// import IntervalInput from "./generalParamsInput/IntervalInput"
// import TitleAndSubtitle from "./generalParamsInput/TitleAndSubtitle"

// export const InputContext = createContext(null)
// export default function AddNotification({setShowAddNotification}) {




//     const [data, setData] = useState({
//         type: null,
//         time: null,
//         interval: null,
//         title: null, 
//         subTitle: null,
//         intervalStatus: false
//     }) 

//     const [loseField, setLoseField] = useState("")

//     function download() {
//         // Проверка на существование data
//         if (!data) {
//             alert("Кажется данные не корректно загрузились :( Перезагрузите страницу или подождите");
//             return;
//         }

//         // Массив для хранения ошибок на русском
//         const errors = [];

//         // Проверяем основные поля
//         if (!data.type || data.type === "" || data.type === null) {
//             errors.push("Тип задания");
//         }
        
//         if (!data.time || data.time === null) {
//             errors.push("Выбрать время");
//         }
        
//         if (!data.title || data.title === "" || data.title === null) {
//             errors.push("Заголовок");
//         }
        
//         if (!data.subTitle || data.subTitle === "" || data.subTitle === null) {
//             errors.push("Подзаголовок");
//         }

//         // Проверяем intervalStatus
//         if (data.intervalStatus === null) {
//             errors.push("Статус интервала (вкл/выкл)");
//         }

//         // Если интервал включен, проверяем его
//         if (data.intervalStatus === true && (!data.interval || data.interval === "" || data.interval === null)) {
//             errors.push("Выбрать интервал");
//         }

//         // Если есть ошибки
//         if (errors.length > 0) {
//             // Если вообще ничего не заполнено
//             const allNull = Object.values(data).every(value => value === null);
//             if (allNull) {
//                 alert("Вы не заполнили ни одного поля!");
//             } else {
//                 alert(`Заполните следующие поля:\n${errors.join('\n')}`);
//             }
//             return;
//         }

//         // Если все проверки пройдены
//         console.log("Напоминание создано:", data);
//         alert("Напоминание создано");
//         setShowAddNotification(prev => !prev);
//     }

//     return (
//         <div className={styles.addNotificationWrapper}>
//             <div className={styles.addNotification}>
//                 <div className={styles.addNotificationBackWrapper}>
//                     <div 
//                         className={styles.addNotificationBackRound}
//                         onClick={() => setShowAddNotification(prev => !prev)}
//                     >
//                         <Image src={icons.backNotificationBlue} className={styles.addNotificationBack}/>
//                     </div>
//                 </div>


//                 <div className={styles.generalParamsWrapper}>
//                     <div className={styles.generalParams}>

//                         <div className={styles.generalParamsHeaderWrapper}>
//                             <span className={styles.generalParamsHeader}>Общие параметры</span>
//                         </div>

//                         <InputContext.Provider value={{data, setData}}>
//                             <div className={styles.generalParamsFieldsWrapper}>
//                                 <GeneralParamsInput dropdown={true}/>
                                
//                                 <SelectTimeInpup />
//                                 <IntervalInput />
                                
//                             </div>

//                             <div className={styles.generalParamsTitleWrapper}>
//                                 <span className={styles.generalParamsTitle}>Текст напоминания</span>
//                             </div>

//                             <div className={styles.generalParamsTextFieldWrapper}>
//                                 <TitleAndSubtitle placehokder={"Заголовок"} type={"title"}/>
//                                 <TitleAndSubtitle placehokder={"Подзаголовок"} type={"subTitle"}/>
//                             </div>
//                         </InputContext.Provider>



//                         <div className={styles.downloadNotificationWrapper} onClick={() => download()}>
//                             <span className={styles.downloadNotification}>Установить</span>
//                         </div>

//                     </div>
//                 </div>


//             </div>
//         </div>
//     )
// }

"use client"
import { GRAPHQL_URL } from "@/config/publicEnv"
import Image from "next/image"
import styles from "./../notifications/Notifications.module.css"
// import icons from "../../../../icons/icons"
// import GeneralParamsInput from "./generalParamsInput/GeneralParamsInput"
import { createContext, useState } from "react"
// import SelectTimeInpup from "./generalParamsInput/SelectTimeInpup"
// import IntervalInput from "./generalParamsInput/IntervalInput"
// import TitleAndSubtitle from "./generalParamsInput/TitleAndSubtitle"
import icons from "@/icons/icons"
import GeneralParamsInput from "../notifications/addNotification/generalParamsInput/GeneralParamsInput"
import SelectTimeInpup from "../notifications/addNotification/generalParamsInput/SelectTimeInpup"
import IntervalInput from "../notifications/addNotification/generalParamsInput/IntervalInput"
import TitleAndSubtitle from "../notifications/addNotification/generalParamsInput/TitleAndSubtitle"
import { InputContext } from "../notifications/addNotification/AddNotification"

function GDB() {
    return (
        <div>
            
        </div>
    )
}



const CREATE_REMINDER_MUTATION = `
    mutation CreateReminder(
        $child_id: String
        $title: String!
        $short_description: String
        $description: String
        $time: String!
        $repeating_pattern: String!
        $date: String
        $repeating_days: [String]
    ) {
        createReminder(
            child_id: $child_id
            title: $title
            short_description: $short_description
            description: $description
            time: $time
            repeating_pattern: $repeating_pattern
            date: $date
            repeating_days: $repeating_days
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
        }
    }
`

export default function AddNotificationParent({setShowAddNotification, childId}) {
    const [data, setData] = useState({
        type: null,
        time: null,
        interval: null,
        title: null, 
        subTitle: null,
        intervalStatus: false
    }) 

    const [loseField, setLoseField] = useState("")

    function getTodayDate() {
        return new Date().toISOString().slice(0, 10)
    }

    function getGraphqlErrorMessage(payload, result) {
        if (result?.errors?.length) {
            return result.errors[0].message
        }

        const firstError = payload?.errors?.[0]

        if (!firstError) {
            return "Не удалось создать напоминание"
        }

        if (firstError.__typename === "ValidationError") {
            return firstError.fields?.[0]?.messages?.[0] || firstError.message
        }

        if (firstError.__typename === "RateLimitError") {
            return `${firstError.message} Повторите через ${firstError.retryAfter} сек.`
        }

        return firstError.message || "Не удалось создать напоминание"
    }

    async function download() {
        // Проверка на существование data
        if (!data) {
            alert("Кажется данные не корректно загрузились :( Перезагрузите страницу или подождите");
            return;
            
        }

        // Массив для хранения ошибок на русском
        const errors = [];

        // Проверяем основные поля
        if (!data.type || data.type === "" || data.type === null) {
            errors.push("Тип задания");
        }
        
        if (!data.time || data.time === null) {
            errors.push("Выбрать время");
        }
        
        if (!data.title || data.title === "" || data.title === null) {
            errors.push("Заголовок");
        }
        
        if (!data.subTitle || data.subTitle === "" || data.subTitle === null) {
            errors.push("Подзаголовок");
        }

        // Проверяем intervalStatus
        if (data.intervalStatus === null) {
            errors.push("Статус интервала (вкл/выкл)");
        }

        // Если интервал включен, проверяем его
        if (data.intervalStatus === true && (!data.interval || data.interval === "" || data.interval === null)) {
            errors.push("Выбрать интервал");
        }

        // Если есть ошибки
        if (errors.length > 0) {
            // Если вообще ничего не заполнено
            const allNull = Object.values(data).every(value => value === null);
            if (allNull) {
                alert("Вы не заполнили ни одного поля!");
            } else {
                alert(`Заполните следующие поля:\n${errors.join('\n')}`);
            }
            return;
        }

        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
            alert("Нет токена авторизации")
            return
        }

        if (!childId) {
            alert("Не найден id ребенка")
            return
        }

        try {
            const repeatingPattern = data.intervalStatus ? "weekly" : "once"

            const response = await fetch(GRAPHQL_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    query: CREATE_REMINDER_MUTATION,
                    variables: {
                        child_id: childId,
                        title: data.title,
                        short_description: data.subTitle,
                        description: null,
                        time: data.time,
                        repeating_pattern: repeatingPattern,
                        date: repeatingPattern === "once" ? getTodayDate() : null,
                        repeating_days: repeatingPattern === "weekly" ? [data.interval] : null
                    }
                })
            })

            const result = await response.json()

            console.log("CREATE REMINDER RESULT:", result)

            const payload = result.data?.createReminder

            if (!payload?.success) {
                alert(getGraphqlErrorMessage(payload, result))
                return
            }

            console.log("Напоминание создано:", data);
            alert("Напоминание создано");
            setShowAddNotification(prev => !prev);

        } catch (error) {
            console.log("CREATE REMINDER ERROR:", error)
            alert("Ошибка соединения с сервером")
        }
    }

    return (
        <div className={styles.addNotificationWrapper}>
            <div className={styles.addNotification}>
                <div className={styles.addNotificationBackWrapper}>
                    <div 
                        className={styles.addNotificationBackRound}
                        onClick={() => setShowAddNotification(prev => !prev)}
                    >
                        <Image src={icons.backNotificationBlue} className={styles.addNotificationBack}/>
                    </div>
                </div>


                <div className={styles.generalParamsWrapper}>
                    <div className={styles.generalParams}>

                        <div className={styles.generalParamsHeaderWrapper}>
                            <span className={styles.generalParamsHeader}>Общие параметры</span>
                        </div>

                        <InputContext.Provider value={{data, setData}}>
                            <div className={styles.generalParamsFieldsWrapper}>
                                <GeneralParamsInput dropdown={true}/>
                                
                                <SelectTimeInpup />
                                <IntervalInput />
                                
                            </div>

                            <div className={styles.generalParamsTitleWrapper}>
                                <span className={styles.generalParamsTitle}>Текст напоминания</span>
                            </div>

                            <div className={styles.generalParamsTextFieldWrapper}>
                                <TitleAndSubtitle placehokder={"Заголовок"} type={"title"}/>
                                <TitleAndSubtitle placehokder={"Подзаголовок"} type={"subTitle"}/>
                            </div>
                        </InputContext.Provider>



                        <div className={styles.downloadNotificationWrapper} onClick={() => download()}>
                            <span className={styles.downloadNotification}>Установить</span>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}