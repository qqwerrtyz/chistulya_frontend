import Image from "next/image"
import styles from "./ForWhom.module.css"
import images from "@/images/images"

export default function ForWhom() {
    return (
        <div className={styles.forWhomWrapper}>
            <div className={styles.forWhom}>
                <div className={styles.forWhomImgWrapper}>
                    <Image className={styles.forWhomImg} src={images.mokap2}/>
                </div>

                <div className={styles.forWhomTextContent}>
                    <div className={styles.forWhomTitleWrapper}>
                        <h5 className={styles.forWhomTitle}>Для кого подходит</h5>
                    </div>

                    <div className={styles.forWhomDescriptionWrapper}>
                        <p className={styles.forWhomDescription}>Приложение создано для семей с детьми 4–12 лет, но будет полезно и школам, детским садам и стоматологическим клиникам</p>
                        <p className={styles.forWhomDescription}>В семье «Чистюля» превращает ежедневную рутину в удовольствие. В образовательных учреждениях учителя могут предлагать задания целым классам и получать отчёты о формировании полезных привычек</p>
                    </div>
                </div>
            </div>
        </div>
    )
}