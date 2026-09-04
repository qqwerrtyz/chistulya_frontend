


"use client"

import { GRAPHQL_URL } from "@/config/publicEnv"
import Image from "next/image"
import styles from "./Metrics.module.css"
import icons from "../../../../icons/icons"
import { useEffect, useState } from "react"

const CHILD_DASHBOARD_QUERY = `
  query ChildDashboard {
    childDashboard {
      wallet {
        coins
      }
      exp {
        level
        xp
      }
    }
  }
`

function MetricsXPAndCoin({type, title, level, xp, coins}) {
    return (
        <div className={styles.metricXPWrapper}>

            {
                type === "XP" ? (
                    <div className={styles.round}>
                        <div className={styles.background}>
                        </div>
                        <span className={styles.roundValue}>{level}</span>
                    </div>
                ) : (
                    <div className={styles.coinWrapper}>
                        <Image src={icons.coin}/>
                    </div>
                )
            }
            

            <div className={styles.metricTextWrapper}>
                <div className={styles.metricTitleWrapper}>
                    <span className={styles.metricTitle}>{title}</span>
                </div>

                <div className={styles.metricValueWrapper}>
                    {type === "XP" ? (
                        <span className={styles.metricValue}>
                            {xp} <strong className={styles.metricTitle}>XP</strong>
                        </span>
                    ): (
                        <span className={styles.metricValue}>{coins}</span>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default function Metrics() {
    const [metrics, setMetrics] = useState({
        level: 0,
        xp: 0,
        coins: 0
    })

    useEffect(() => {
        async function getChildDashboard() {
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
                        query: CHILD_DASHBOARD_QUERY
                    })
                })

                const result = await response.json()

                const dashboard = result.data?.childDashboard

                if (!dashboard) {
                    return
                }

                setMetrics({
                    level: dashboard.exp?.level || 0,
                    xp: dashboard.exp?.xp || 0,
                    coins: dashboard.wallet?.coins || 0
                })

            } catch (error) {
                console.log("Ошибка загрузки метрик ребёнка:", error)
            }
        }

        getChildDashboard()
    }, [])

    return (
        <div className={styles.metricsWrapper}>
            <div className={styles.metrics}>
                
                
                <MetricsXPAndCoin 
                    type={"XP"} 
                    title={"Мой уровень"} 
                    level={metrics.level}
                    xp={metrics.xp}
                />

                <MetricsXPAndCoin 
                    type={"coins"} 
                    title={"Коинов"} 
                    coins={metrics.coins}
                />
                
                
            </div>
        </div>
    )
}