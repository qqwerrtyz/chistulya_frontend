
import { Suspense } from "react"
import ConfirmRegClient from "./ConfirmRegClient"
import styles from "./ConfirmReg.module.css"

export default function ConfirmReg() {
    return (
        <Suspense 
            fallback={
                <div className={styles.confirmRegWrapper}>
                    <div className={styles.confirmReg}>
                        <div className={styles.confirmRegCard}>
                            <div className={styles.confirmRegIconWrapper}>
                                <span className={styles.confirmRegIcon}>...</span>
                            </div>

                            <h1 className={styles.confirmRegTitle}>
                                Подтверждаем почту
                            </h1>

                            <p className={styles.confirmRegText}>
                                Подождите, идёт проверка ссылки подтверждения.
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <ConfirmRegClient />
        </Suspense>
    )
}