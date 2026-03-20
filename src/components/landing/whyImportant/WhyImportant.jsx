import Image from "next/image"
import styles from "./WhyImportant.module.css"

export default function WhyImportant() {
    return (
        <div className={styles.whyImportantWrapper}>
            <div className={styles.whyImportant}>
                <div className={styles.titleAndSubtitleWrapper}>
                    <h4 className={styles.title}>Почему это важно?</h4>
                    <p className={styles.subTitle}>Это не просто приложение, это современный инструмент воспитания, который делает заботу о себе веселой, осознанной и без давления</p>
                </div>

                <div className={styles.contentWrapper}>
                    <div className={styles.content}>
                        <div className={styles.col1}>
                            <div className={styles.row}>
                                <div className={styles.reason}>
                                    <span className={styles.reasonNumber}>01</span>
                                    <p className={styles.reasonText}>Ребёнок может выбрать и кастомизировать своего персонажа, что делает процесс более увлекательным</p>
                                </div>

                                <div className={styles.reason}>
                                    <span className={styles.reasonNumber}>02</span>
                                    <p className={styles.reasonText}>Родители получают отчёты и могут отслеживать прогресс ребёнка, поддерживая контроль без стресса.</p>
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.reason}>
                                    <span className={styles.reasonNumber}>03</span>
                                    <p className={styles.reasonText}>Приложение предлагает задания для школьников, помогая формировать коллективные гигиенические привычки</p>
                                </div>

                                <div className={styles.reason}>
                                    <span className={styles.reasonNumber}>04</span>
                                    <p className={styles.reasonText}>Приложение доступно в виде Web-версии, обеспечивая удобство для всех пользователей.</p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.col2}>
                            <div className={styles.screenWrapper}>
                                <Image className={styles.screen} width={100} height={100} src={"/imgs/landing/screen.png"}/>
                            </div>
                        </div>           
                    </div>
                </div>
            </div>
        </div>
    )
}