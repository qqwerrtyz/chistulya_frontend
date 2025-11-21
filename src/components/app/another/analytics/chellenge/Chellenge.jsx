"use client"
import { useEffect, useState } from "react"
import AnalyticsHeadline from "../headline/Headline"
import styles from "./Chellenge.module.css"
import MenuChellengeAnalytics from "./menu/Menu"
import DropDown from "./dropdown/DropDown"
import Result from "./showResult/Result"

export default function Chellenge () {
    const [selectedMonth, setSelectedMonth] = useState({
        ruName: "Всего",
        enName: null,
        count: 100
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
            count: 25
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




    return (
        <div className={styles.chellengeWrapper}>
            <div className={styles.chellenge}>
                <AnalyticsHeadline value={"Челленджи"}/>

                <div className={styles.bodyWrapper}>
                    <div className={styles.body}>

                        <div className={styles.menuWrapper}>
                            <MenuChellengeAnalytics
                                selectedMonth={selectedMonth}
                                showDropDown={showDropDown} 
                                setShowDropDown={setShowDropDown}
                            />
                            <DropDown 
                                showDropDown={showDropDown}
                                setShowDropDown={setShowDropDown}
                                dataMonth={dataMonth}
                                setSelectedMonth={setSelectedMonth}
                                selectedMonth={selectedMonth}
                            />
                            
                        </div>

                        

                        <Result selectedMonth={selectedMonth}/>

                    </div>
                </div>
            </div>
        </div>
    )
}