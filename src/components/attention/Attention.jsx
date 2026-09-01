import styles from "./Attention.module.css"
import Image from "next/image"
import icons from "@/icons/icons"
export default function AttentionModal() {
    return (
                <div className={styles.atentionWrapper}>
            <div className={styles.atention}>
                <div className={styles.atentionHeaderWrapper}>
                    <span className={styles.atentionHeaderText}>ПРОЧТИТЕ ПЕРЕД ТЕМ КАК ЗАКРЫТЬ</span>
                    <Image className={styles.closeCross} src={icons.cross}/>
                </div>
                <div className={styles.atentionContent}>
                    <span className={styles.atentionTitle}>
                        Данное веб-приложение находится на стадии прототипа, поэтому если вы видите пустой список, либо не прогруженные детали, пожалуйста, <span className={styles.atentionTitleHilight}>не переживайте и просто обновите страницу c:</span>
                    </span>
                </div>
            </div>
        </div>
    )
} 