<<<<<<< HEAD
import styles from "./Analytics.module.css"
export default function Analytics () {
    return (
        <div className={styles}>
            
=======
import Chellenge from "@/components/app/another/analytics/chellenge/Chellenge"
import styles from "./Analytics.module.css"
export default function Analytics () {
    return (
        <div className={styles.analyticsWrapper}>
            <div className={styles.analytics}>
                <div className={styles.chellengeWrapper}>
                    <Chellenge />
                </div>
            </div>
>>>>>>> dd09bae0581a15aa18b162e492eb6f02e431725f
        </div>
    )
}