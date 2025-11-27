import Image from "next/image"
import styles from "./../Notifications.module.css"
import icons from "../../../../../public/icons/icons"
import GeneralParamsInput from "./generalParamsInput/GeneralParamsInput"
export default function AddNotification({setShowAddNotification}) {
    

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
                            <GeneralParamsInput />

                            
                        </div>

                    </div>
                </div>


            </div>
        </div>
    )
}