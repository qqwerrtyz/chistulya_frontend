import styles from './../Profile.module.css';


export default function NameAndAge() {
    return (
        <div className={styles.nameAndAgeWrapper}>
            <div className={styles.nameAndAge}>
                <span className={styles.userName}>Леша</span>
                <span className={styles.userAge}>29 лет</span>
            </div>
        </div>
    )
}