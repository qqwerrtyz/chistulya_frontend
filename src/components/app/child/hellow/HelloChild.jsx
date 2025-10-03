import styles from "./HelloChild.module.css"

export default function HelloChild() {

    const currentDate = new Date();

    const formateDate = date => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth()).padStart(2, "0");

        const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

        let dayIndex = date.getDay() - 1;

        if (dayIndex === -1) dayIndex = 6;

        const dayOfWeek = daysOfWeek[dayIndex]

        return `${day}.${month}, ${dayOfWeek}`
    }


    return (
        <div className={styles.helloChildWrapper}>
            <div className={styles.helloTitleWrapper}>
                <span className={styles.helloTitle}>Добро пожаловать</span>
            </div>

            <div className={styles.dateWrapper}>
                <span className={styles.date}>{formateDate(currentDate)}</span>
            </div>
        </div>
    )
}