
"use client"

import { GRAPHQL_URL } from "@/config/publicEnv"
import { useEffect, useState } from "react"
import AnalyticsHeadline from "../headline/Headline"
import styles from "./Chellenge.module.css"
import MenuChellengeAnalytics from "./menu/Menu"
import DropDown from "./dropdown/DropDown"
import Result from "./showResult/Result"

const CHALLENGE_ANALYTICS_QUERY = `
    query ChallengeAnalytics($category: String, $months: Int!) {
        challengeAnalytics(category: $category, months: $months) {
            month
            selected_count
            completed_count
            failed_count
        }
    }
` 

const MONTHS_RU = {
    "01": "Январь",
    "02": "Февраль",
    "03": "Март",
    "04": "Апрель",
    "05": "Май",
    "06": "Июнь",
    "07": "Июль",
    "08": "Август",
    "09": "Сентябрь",
    "10": "Октябрь",
    "11": "Ноябрь",
    "12": "Декабрь"
}

function getMonthRuName(monthValue) {
    const monthNumber = monthValue?.split("-")?.[1]

    return MONTHS_RU[monthNumber] || monthValue
}

export default function Chellenge () {
    const [selectedMonth, setSelectedMonth] = useState({
        ruName: "Всего",
        enName: null,
        count: 0
    });

    const [showDropDown, setShowDropDown] = useState(false)

    const [dataMonth, setDataMonth] = useState([])

    useEffect(() => {
        async function getChallengeAnalytics() {
            const accessToken = localStorage.getItem("access_token")

            if (!accessToken) {
                return
            }

            try {
                const response = await fetch(GRAPHQL_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        query: CHALLENGE_ANALYTICS_QUERY,
                        variables: {
                            category: null,
                            months: 6
                        }
                    })
                })

                const result = await response.json()

                console.log("CHALLENGE ANALYTICS RESULT:", result)

                if (result.errors?.length) {
                    console.log("CHALLENGE ANALYTICS ERROR:", result.errors[0].message)
                    return
                }

                const analytics = result.data?.challengeAnalytics || []

                const preparedMonths = analytics.map(item => ({
                    enNameMonth: item.month,
                    ruNameMonth: getMonthRuName(item.month),
                    count: item.completed_count || 0
                }))

                const totalCompleted = preparedMonths.reduce((sum, item) => {
                    return sum + item.count
                }, 0)

                setDataMonth(preparedMonths)

                setSelectedMonth({
                    ruName: "Всего",
                    enName: null,
                    count: totalCompleted
                })

            } catch (error) {
                console.log("CHALLENGE ANALYTICS CATCH ERROR:", error)
            }
        }

        getChallengeAnalytics()
    }, [])

    return (
        <div className={styles.chellengeWrapper}>
            <div className={styles.chellenge}>
                <AnalyticsHeadline value={"Выполненные челленджи"}/>

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