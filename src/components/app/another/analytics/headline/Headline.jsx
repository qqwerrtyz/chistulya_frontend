import styles from "./Headline.module.css"

export default function AnalyticsHeadline({value}) {
    return (
        <div className={styles.analyticsCategoryHeadlineWrapper}>
            <span className={styles.analyticsCategoryHeadline}>{value}</span>
        </div>
    )
}