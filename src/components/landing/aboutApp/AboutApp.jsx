import Image from "next/image"
import styles from "./AboutApp.module.css"
import icons from "@/icons/icons"
export default function AboutApp() {
    return (
        <div className={styles.aboutAppWrapper}>
            <div className={styles.aboutApp}>
                
                <div className={styles.titleWrapper}>
                    <h3 className={styles.title}>О приложении</h3>
                </div>


                <div className={styles.descriptionWrapper}>
                    <p className={styles.description}>Чистюля — мобильное приложение для формирования гигиенических привычек у детей через игру</p>
                    <p className={styles.description}>Мы превращаем повседневные гигиенические задачи в увлекательные квесты с наградами, чтобы процесс заботы о себе стал интересным</p>
                </div>
                
                <div className={styles.offersWrapper}>
                    <div className={styles.offers}>

                        <div className={styles.offerWrapper}>
                            <Image className={styles.offerIcon} src={icons.joystick}/>
                            <span className={styles.offerText}>Игровой подход</span>
                        </div>

                        <div className={styles.offerWrapper}>
                            <Image className={styles.offerIcon} src={icons.files}/>
                            <span className={styles.offerText}>Контроль и отчеты для родителей</span>
                        </div>

                        <div className={styles.offerWrapper}>
                            <Image className={styles.offerIcon} src={icons.motivation}/>
                            <span className={styles.offerText}>Мотиваци через игру</span>
                        </div>

                        <div className={styles.offerWrapper}>
                            <Image className={styles.offerIcon} src={icons.home}/>
                            <span className={styles.offerText}>Интеграция с учебными заведениями</span>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}