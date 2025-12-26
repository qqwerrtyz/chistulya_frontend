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

    function download() {

        if (!data) {
            alert("Кажется данные не корректно загрузились :( Перезагрузите страницу или подождите");
            return
        }

         // Проверяем есть ли пустые поля
        let hasEmptyFields = false;
        
        for (const [key, value] of Object.entries(data)) {
                

            if (value == null || value == undefined || value == "") {
                if (key !== "intervalStatus") {
                    alert ("Заполните все поля или заполните без ошибок");
                    return
                }
            }
        }

        
 
        console.log("Объект data установлен", data);
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