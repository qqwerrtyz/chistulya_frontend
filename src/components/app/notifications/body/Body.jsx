import styles from "./../Notifications.module.css"
export default function Body({selectCategories}) {
    const notifications = {
        active: {
            name: "active",
            item: [
                {
                    author: "me",
                    title: "Напоминание 1",
                    subTitle: "Тут будет текст про напоминание 1",
                    time: "00:46",
                    interval: "Каждый четверг",
                    type: "everydayTask",
                    ruType: "Ежедневные задания",
                    done: true
                },

                {
                    author: "parent",
                    title: "Напоминание 2",
                    subTitle: "Тут будет текст про напоминание 2",
                    time: "00:46",
                    interval: "Каждый четверг",
                    type: "everydayTask",
                    ruType: "Ежедневные задания",
                    done: true
                }
            ]
        },

        notActive: {
            name: "notActive",
            item: [
                {
                    title: "Напоминание 3",
                    subtitle: "Текст напоминания 3"
                },

                {
                    title: "Напоминание 4",
                    subtitle: "Текст напоминания 4"
                }
            ]
        }
    }
    return (
        <div className={styles.bodyWrapper}>
            <div className={styles.body}>
                {
                    notifications.map
                }
            </div>
        </div>
    )
}