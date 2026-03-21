import Link from "next/link"
import styles from "./HowGetStart.module.css"


export default function HowGetStart() {
    return (
        <div className={styles.howGetStartWrapper}>
            <div className={styles.howGetStart}>
                <div className={styles.titleWrapper}>
                    <h6 className={styles.title}>Как начать?</h6>
                </div>

                <div className={styles.paragraphWrapper}>
                    <p className={styles.paragraph}>Зарегистрируйтесь, создайте профиль ребёнка и выберите подходящие задания. Мы уверены, что веселая геймификация поможет вашему ребёнку привыкнуть к чистоте без давления</p>
                    <p className={styles.paragraph}> Присоединяйтесь к нашему сообществу, делитесь успехами и получайте поддержку от других родителей — давайте вместе учить детей заботиться о себе весело и осознанно!</p>
                </div>

                <div className={styles.regWrapper}>
                    <Link href={"/reg"} className={styles.reg}>Регистрация</Link>
                </div>
            </div>
        </div>
    )
}