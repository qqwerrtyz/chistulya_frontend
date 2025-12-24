import Image from "next/image"
import styles from "./../Notifications.module.css"
import icons from "../../../../../public/icons/icons"
import GeneralParamsInput from "./generalParamsInput/GeneralParamsInput"
import { createContext, useState } from "react"
import SelectTimeInpup from "./generalParamsInput/SelectTimeInpup"
import IntervalInput from "./generalParamsInput/IntervalInput"

export const InputContext = createContext(null)
export default function AddNotification({setShowAddNotification}) {




    const [data, setData] = useState({
        type: null,
        time: null,
        interval: null,
        title: null, 
        subTitle: null
    }) 

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
                        </InputContext.Provider>

                    </div>
                </div>


            </div>
        </div>
    )
}