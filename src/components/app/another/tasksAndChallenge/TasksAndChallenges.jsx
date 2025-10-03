"use client"
import { useState } from "react"
import styles from "./TasksAndChallenges.module.css"
import Wrapper from "./wrapper/Wrapper"



export default function TasksAndChallenges() {
   

    const [flags, setFlags] = useState({
        tasks: true,
        challenge: false
    })


    return (
        <div className={styles.tasksAndChallengesWrapper}>
            <div className={styles.tasksAndChallenges}>

                <div className={styles.main}>
                    <Wrapper title={"Ежедневные задания"} flags={flags} setFlags={setFlags}/>
                    <Wrapper title={"Челенджи"} flags={flags} setFlags={setFlags}/>




                </div>

            </div>
        </div>
    )
}