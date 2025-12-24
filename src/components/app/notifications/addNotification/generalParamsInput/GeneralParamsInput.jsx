import Image from "next/image"
import styles from "./../../Notifications.module.css"
import icons from "../../../../../../public/icons/icons"
import { useState } from "react"


export default function GeneralParamsInput({addNotificationData, setAddNotificationData, typeInput, title}){
    const [showDropdown, setShowDropdown] = useState(true);

    const [typeTask, setTypeTask] = useState({
        task: "Задачи",
        chellenge: "Челлендж"
    })

    function addDataNotification(key,value) {
        setAddNotificationData(prev => {
            let clonePrev = {
                ...prev,
                [key]: value 
            }

            return clonePrev
            
        })
    }

    return (

        <>
            <div
                className={styles.generalParamsFieldWrapper}
                
            >
                <div 
                    className={styles.generalParamsFieldHeader}
                    onClick={() => setShowDropdown(prev => !prev)}
                >
                    <span className={styles.generalParamsField} onClick={() => console.log(addNotificationData)}>{title}</span>

                    <div className={styles.generalParamsArrowsWrapper}>
                        {
                            showDropdown ? (
                                <Image src={icons.arrowUp} className={styles.generalParamsArrow}/>
                            ) : (
                                <Image src={icons.arrowDown} className={styles.generalParamsArrow}/>
                            )
                        }
                        
                    </div>
                </div>
                

                {
                    showDropdown && (
                        typeInput === "typeTask" ? (
                            <div className={styles.generalParamsDropdownWrapper}>
                                <div className={styles.generalParamsDropdown}>
                                    {
                                        Object.keys(typeTask).map((item, index) => {
                                            return (
                                                <span 
                                                    onClick={() => addDataNotification("type", item)} 
                                                    className={styles.generalParamValue}>
                                                    {typeTask[item]}
                                                </span>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        ) : typeInput === "timeTask" ? (
                            <div>ывмывм</div>
                        ) : <div>dvdvdv</div>

                      
                    )
                }
                
            </div>

            
        </>
    )
}