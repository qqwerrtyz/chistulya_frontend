import Chellenge from "@/components/app/another/analytics/chellenge/Chellenge"
import styles from "./Analytics.module.css"
import EveryDayTask from "@/components/app/another/analytics/everyDayTasks/EveryDayTask"
export default function Analytics () {
    return (
        <div className={styles.analyticsWrapper}>
            <div className={styles.analytics}>
                <div className={styles.everyDayTaskWrapper}>
                    <EveryDayTask />
                </div>

                <div className={styles.chellengeWrapper}>
                    <Chellenge />
                </div>

                
            </div>
        </div>
    )
}