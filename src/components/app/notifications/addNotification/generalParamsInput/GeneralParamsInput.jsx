import Image from "next/image"
import styles from "./../../Notifications.module.css"
import icons from "../../../../../../public/icons/icons"
import { useState } from "react"


export default function GeneralParamsInput(){
    const [showDropdown, setShowDropdown] = useState(false)

    return (

        <>
            <div
                className={styles.generalParamsFieldWrapper}
                
            >
                <div 
                    className={styles.generalParamsFieldHeader}
                    onClick={() => setShowDropdown(prev => !prev)}
                >
                    <span className={styles.generalParamsField}>Тип задания</span>

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
                        <div className={styles.generalParamsDropdownWrapper}>
                            <div className={styles.generalParamsDropdown}>
                                dcdccd
                            </div>
                        </div>
                    )
                }
                
            </div>

            
        </>
    )
}