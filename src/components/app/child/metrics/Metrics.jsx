import Image from "next/image"
import styles from "./Metrics.module.css"
import icons from "../../../../icons/icons"


function MetricsXPAndCoin({type, title}) {
    return (
        <div className={styles.metricXPWrapper}>

            {
                type === "XP" ? (
                    <div className={styles.round}>
                        <div className={styles.background}>
                        </div>
                        <span className={styles.roundValue}>3</span>
                    </div>
                ) : (
                    <div className={styles.coinWrapper}>
                        <Image src={icons.coin}/>
                    </div>
                )
            }
            

            <div className={styles.metricTextWrapper}>
                <div className={styles.metricTitleWrapper}>
                    <span className={styles.metricTitle}>{title}</span>
                </div>

                <div className={styles.metricValueWrapper}>
                    {type === "XP" ? (
                        <span className={styles.metricValue}>
                            65 / 100 <strong className={styles.metricTitle}>XP</strong>
                        </span>
                    ): (
                        <span className={styles.metricValue}>150</span>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default function Metrics() {
    return (
        <div className={styles.metricsWrapper}>
            <div className={styles.metrics}>
                
                
                <MetricsXPAndCoin type={"XP"} title={"Мой уровень"} />
                <MetricsXPAndCoin type={"coins"} title={"Коинов"} />
                
                <div className={styles.degreePurityWrapper}>
                    <div className={styles.purieTextWrapper}>
                        <div className={styles.purieTitleWrapper}>
                            <span className={styles.purieTitle}>Чистота</span>
                        </div>
                        <div className={styles.purieRangWrapper}>
                            <span className={styles.purieRang}>Вы чистюля</span>
                        </div>
                    </div>

                    <div className={styles.purieRound}>
                        <div className={styles.purieBackground}>
                        </div>
                        <span className={styles.purieRoundValue}>3%</span>
                    </div>
                </div>
            </div>
        </div>
    )
}