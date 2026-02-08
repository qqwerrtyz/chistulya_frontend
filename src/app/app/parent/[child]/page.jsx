"use client"

import Image from "next/image"
import styles from "./Child.module.css"
import { useParams } from "next/navigation"
import icons from "../../../../icons/icons"
import TasksAndChallenges from "@/components/app/another/tasksAndChallenge/TasksAndChallenges"
import EveryDayTask from "@/components/app/another/analytics/everyDayTasks/EveryDayTask"
import Chellenge from "@/components/app/another/analytics/chellenge/Chellenge"

export default function MyChild() {
    const { child } = useParams()
    return (
        <div className={styles.myChildWrapper}>
            <div className={styles.myChild}>
                <div className={styles.myChildHeader}>
                    <div className={styles.nameChildWrapper}>
                        <h1 className={styles.nameChild}>Ребенок Саша</h1>
                    </div>

                    <div className={styles.backWrapper}>
                        <Image src={icons.backNotificationBlue} className={styles.back}/>
                    </div>

                    <div className={styles.customTaskWrapper}>
                        <span className={styles.customTask}>Кастомное задание</span>
                         <Image src={icons.plusBlue} className={styles.customTaskPlus}/>
                    </div>

                    <div className={styles.addNotificationWrapper}>
                        <span className={styles.addNotification}>Напоминание</span>
                        <Image src={icons.plusBlue} className={styles.customTaskPlus}/>
                    </div>
                </div>

                <div className={styles.myChildBody}>
                    <TasksAndChallenges />
                </div>

                <div>
                    <div>
                        <EveryDayTask />
                    </div>
                    <div>
                        <Chellenge />
                    </div>
                </div>
            </div>
        </div>
        
    )
}