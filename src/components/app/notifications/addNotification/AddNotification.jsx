import Image from "next/image"
import styles from "./../Notifications.module.css"
import icons from "../../../../../public/icons/icons"
import GeneralParamsInput from "./generalParamsInput/GeneralParamsInput"
import { createContext, useState } from "react"
import SelectTimeInpup from "./generalParamsInput/SelectTimeInpup"
import IntervalInput from "./generalParamsInput/IntervalInput"
import TitleAndSubtitle from "./generalParamsInput/TitleAndSubtitle"

export const InputContext = createContext(null)
export default function AddNotification({setShowAddNotification}) {




    const [data, setData] = useState({
        type: null,
        time: null,
        interval: null,
        title: null, 
        subTitle: null,
        intervalStatus: false
    }) 

    const [loseField, setLoseField] = useState("")

    function download() {
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

        // Если все проверки пройдены
        console.log("Напоминание создано:", data);
        alert("Напоминание создано");
        setShowAddNotification(prev => !prev);
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