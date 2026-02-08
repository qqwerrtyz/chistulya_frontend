import Image from "next/image"
import styles from "./../../Notifications.module.css"
import icons from "../../../../../icons/icons"
import { InputContext } from "../AddNotification";
import { useContext, useEffect, useState } from "react";
export default function IntervalInput() {
    
    const [showDropdown, setShowDropdown] = useState(true);
    const {data, setData} = useContext(InputContext);

    const [isClicked, setIsClicked] = useState(false);
    const [showVariable, setShowVariable] = useState(false)

    const [varibale, setVaribale] = useState([
        {
            ru: "Каждый понедельник",
            en: "monday"
        },

        {
            ru: "Каждый вторник",
            en: "tuesday"
        },

        {
            ru: "Каждую среду",
            en: "wednesday"
        },

        {
            ru: "Каждый четверг",
            en: "thursday"
        },
        
        {
            ru: "Каждую пятницу",
            en: "friday"
        },

        {
            ru: "Каждую субботу",
            en: "saturday"
        },

        {
            ru: "Каждое воскресенье",
            en: "sunday"
        },
    ])

    const [displaySelectItem, setDisplaySelectItem] = useState(null)

    function addDataInterval(item) {
        setData(prev => {
            const clone = {
                ...prev,
                interval: item.en
            }

            console.log(clone)
            return clone
        })

        setShowVariable(prev => !prev);
        setShowDropdown(prev => !prev)

        setDisplaySelectItem(prev => prev = item.ru)
    }

  

    if (!data && !setData) {
        return <h1>Идет загрузка данных</h1>
    }
    return (
        <>
            <div
                className={`${styles.generalParamsFieldWrapper} ${styles.generalParamsFieldWrapperInterval}`}
            >


                <div className={`${styles.generalParamsDropdownWrapper} ${styles.generalParamsDropdownWrapperInterval}`}>
                        <div className={styles.createInterval}>
                            <div 
                                className={styles.createIntervalCountWrapper}
                                onClick={() => {
                                    setShowVariable(prev => !prev);
                                    setShowDropdown(prev => !prev)
                                }
                                }
                            >
                                <span className={styles.createIntervalCount}>{displaySelectItem ? displaySelectItem : "Выбрать интервал"}</span>
                            </div>

                            
                            <div 
                                style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >

                                <div className={styles.intervalToggleWrapper}>
                                    <div 
                                        className={styles.intervalToggle} 
                                        onClick={() => setIsClicked(prev => {

                                            const clone = !prev

                                            setData(dataPrev => {
                                                const clone = {
                                                    ...dataPrev,
                                                    intervalStatus: isClicked
                                                }

                                                return clone
                                            })
                                            


                                            return clone
                                        })}
                                    >
                                        <div 
                                            className={styles.intervalToggleRound} 
                                            style={{
                                                margin: isClicked ? "2.5px 0 0 3px" : "2.5px 0 0 13px", 

                                            }}
                                             
                                        >

                                            <span 
                                                className={`${styles.intervalToggleRoundText} ${!isClicked && styles.intervalToggleRoundTextActive}`}
                                            >
                                                Выкл
                                            </span>

                                            <span className={`${styles.intervalToggleRoundText} ${isClicked && styles.intervalToggleRoundTextActive}`}>
                                                Вкл
                                            </span>
                                        </div>

                                        <div 
                                            className={styles.intervalToggleSecondBg} 
                                            style={{
                                                opacity: isClicked ? 0 : 1,
                                            }}
                                            onClick={() => setIsClicked(prev => !prev)}      
                                        >

                                        </div>
                                    </div>
                                </div>

                                <div className={styles.generalParamsArrowsWrapper} onClick={() => {
                                    setShowDropdown(prev => !prev);
                                    setShowVariable(prev => !prev);
                                }
                                }>
                                    {
                                        showDropdown
                                            ? <Image src={icons.arrowUp} className={styles.generalParamsArrow} />
                                            : <Image src={icons.arrowDown} className={styles.generalParamsArrow} />
                                    }
                                </div>
                            </div>
                        </div>

                        {
                            showVariable && (
                                <div className={styles.createIntervalCountField}>

                                    {
                                        varibale.map((item,index) => {
                                            return (
                                                <div 
                                                    className={styles.createIntervalVariableWrapper}
                                                    onClick={() => addDataInterval(item)}
                                                    style={{
                                                        backgroundColor: displaySelectItem === item.ru ? "#4272ea3a" : ""
                                                    }}
                                                >
                                                    <span className={styles.createIntervalVariable}>{item.ru}</span>
                                                </div>
                            
                                                )
                                        })
                                    }
                                    
                                </div>
                            )
                        }

                        

                        
                </div>

                
                
                
            </div>

           

        </>
    )
}