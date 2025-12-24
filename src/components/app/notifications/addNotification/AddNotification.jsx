import Image from "next/image"
import styles from "./../Notifications.module.css"
import icons from "../../../../../public/icons/icons"
import GeneralParamsInput from "./generalParamsInput/GeneralParamsInput"
import { useState } from "react"
export default function AddNotification({setShowAddNotification}) {
<<<<<<< HEAD

    const [addNotificationData, setAddNotificationData] = useState({
        type: null,
        time: null,
        interval: null,
        body: {
            title: null,
            subTitle: null
        }
    })
    
=======
    const [dataNotification, setDataNotification] = useState({
        type: null,
        time: null,
        interval: null,
        title: null,
        subTitle: null
    })
>>>>>>> 99f1dbeba78e161df86c0b5535b3cfdd025a72a7

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

                        <div className={styles.generalParamsFieldsWrapper}>
<<<<<<< HEAD
                            <GeneralParamsInput 
                                addNotificationData={addNotificationData}
                                setAddNotificationData={setAddNotificationData}
                                typeInput={"typeTask"}
                                title={"Тип задания"}
                            />

                            <GeneralParamsInput 
                                addNotificationData={addNotificationData}
                                setAddNotificationData={setAddNotificationData}
                                typeInput={"timeTask"}
                                title={"Выбрать время"}
                            />
=======
                            <GeneralParamsInput dropdown={true}/>
>>>>>>> 99f1dbeba78e161df86c0b5535b3cfdd025a72a7

                            
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}