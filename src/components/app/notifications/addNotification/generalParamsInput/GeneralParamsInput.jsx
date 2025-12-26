import Image from "next/image"
import styles from "./../../Notifications.module.css"
import icons from "../../../../../../public/icons/icons"
import { useContext, useState } from "react"
import { InputContext } from "../AddNotification"


export default function GeneralParamsInput({dropdown}){
    const [showDropdown, setShowDropdown] = useState(false)

    const {data, setData} = useContext(InputContext);

    function saveData (value) {
        setData(prev => {
            const clone = {
                ...prev,
                type: value
            }
            return clone
            
        })

        setShowDropdown(prev => !prev)
    }

    function showTitle() {
        let value = ""
        if  (data?.type === "chellenge") {
            value = "Челлендж"
        } else if (data?.type === "everydayTask") {
            value = "Ежедневные задания"
        } else {
            value = "Тип задания"
        }

        return value
    }

    if (!data && !setData) {
        return <div>ЗАГРУЗКААААА</div>
    }
    return (

        <>
            <div
                className={`${styles.generalParamsFieldWrapper} ${styles.generalParamsFieldWrapperType}`}
                
            >
                <div 
                    className={styles.generalParamsFieldHeader}
                    onClick={() => setShowDropdown(prev => !prev)}
                >
                    <span className={styles.generalParamsField}>{showTitle()}</span>
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
                        <div className={`${styles.generalParamsDropdownWrapper} ${styles.generalParamsDropdownWrapperType}`}>
                            <div className={styles.generalParamsDropdown}>
                                <span 
                                    className={`${styles.generalParamsDropdownValue} ${data.type === "chellenge" && styles.generalParamsDropdownValueActive}`}
                                    onClick={()=> saveData("chellenge")}    
                                >Челлендж</span>
                                <span 
                                    className={`${styles.generalParamsDropdownValue} ${data.type === "everydayTask" && styles.generalParamsDropdownValueActive}`}
                                    onClick={()=> saveData("everydayTask")} 
                                >Ежедневное задание</span>
                            </div>
                        </div>
                    )
                }
                
            </div>

            
        </>
    )
}