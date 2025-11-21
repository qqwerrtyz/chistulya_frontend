import styles from "../Chellenge.module.css"

export default function Result({selectedMonth}) {
    return (
        <div className={styles.contentWrapper}>
            <span className={styles.contentCount}>{selectedMonth.count}</span>
            <span className={styles.contentName}>Челелнджа</span>
        </div>
    )
}