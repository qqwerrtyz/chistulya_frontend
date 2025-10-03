import HelloChild from "@/components/app/child/hellow/HelloChild"
import styles from "./Child.module.css"
import Metrics from "@/components/app/child/metrics/Metrics"
import Avatar from "@/components/app/child/avatar/Avatar"
import TasksAndChallenges from "@/components/app/another/tasksAndChallenge/TasksAndChallenges"
export default function ChildHome() {
    return (
        <div className={styles.childHome}>
            <div className={styles.helloChildWrapper}>
                <HelloChild />
            </div>

            <div className={styles.metricAndAvatar}>
                <div className={styles.metricWrapper}>
                    <Metrics />
                </div>

                <div className={styles.avatarWrapper}>
                    <Avatar />
                </div>
            </div> 

            <div className={styles.tasksAndChallengesWrapper}>
                <TasksAndChallenges />
            </div>         
        </div>
    )
}