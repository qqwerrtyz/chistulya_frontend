"use client"
import { useState } from "react"
import AnalyticsHeadline from "../headline/Headline"
import styles from "./Chellenge.module.css"
import icons from "../../../../../../public/icons/icons"
import Image from "next/image"

export default function Chellenge () {
    const [selectedMonth, setSelectedMonth] = useState({
        ruName: "Месяц",
        enName: null
    });

    const [showDropDown, setShowDropDown] = useState(false)

    const dataMonth = [


        {
            enNameMonth: "january",
            ruNameMonth: "Январь",
            count: 23
        },

        {
            enNameMonth: "february",
            ruNameMonth: "Февраль",
            count: 23
        },

        {
            enNameMonth: "march",
            ruNameMonth: "Март",
            count: 23
        },

        {
            enNameMonth: "april",
            ruNameMonth: "Апрель",
            count: 23
        },

        {
            enNameMonth: "may",
            ruNameMonth: "Май",
            count: 23
        },
        {
            enNameMonth: "june",
            ruNameMonth: "Июнь",
            count: 23
        }
    ]

    function handleSelectedMonth(ru, en) {
        setSelectedMonth(prev => {
            prev = {
                ruName: ru,
                enName: en
            }
            return prev
        })
    }

    return (
        <div className={styles.chellengeWrapper}>
            <div className={styles.chellenge}>
                <AnalyticsHeadline value={"Челленджи"}/>

                <div className={styles.bodyWrapper}>
                    <div className={styles.body}>

                        <div className={styles.menuWrapper}>
                            <div className={styles.menu} onClick={() => setShowDropDown(prev => !prev)}>
                                <span className={styles.selectedMonth}>{selectedMonth.ruName}</span>

                                {
                                    showDropDown ? (
                                        <Image src={icons.arrowUpBlue} className={styles.menuArrow}/>
                                    ) : (
                                        <Image src={icons.arrowDownBlue} className={styles.menuArrow}/>
                                    )
                                }
                            </div>

                            {
                                showDropDown && (
                                    <div className={styles.dropDownMenu}>
                                        {
                                            dataMonth.map((item, index) => {
                                                return (
                                                    <div
                                                        className={styles.dropDownMenuItem}
                                                        onClick={() => handleSelectedMonth(item.ruNameMonth, item.enNameMonth)}>
                                                        <span className={styles.dropDownMenuItemName}>{item.ruNameMonth}</span>
                                                        {
                                                            selectedMonth.enName === item.enNameMonth && (

                                                                <div className={styles.dropDownMenuItemSelect}></div>
                                                            )
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                            </div>
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}