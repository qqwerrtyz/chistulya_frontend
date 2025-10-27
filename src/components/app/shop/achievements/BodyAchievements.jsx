import Image from "next/image"
import styles from "./BodyAchievements.module.css"
import icons from "../../../../../public/icons/icons"

export default function BodyAchievements({dataList}) {
    return (
        <div className={styles.achievementsListWrapper}>
            <div className={styles.achievementsList}>
                {
                    dataList.map((item, index) => {
                        return (
                            
                            <div style={{
                                    backgroundColor: item.status === "notAvailable" && "#C7CDDA"
                                }} 
                                key={`${item.enName}-${item.id}`} 
                                className={styles.achivmentItem}
                            >
                                <div className={styles.achivmentImgAndname}>
                                    <div className={styles.achivmentImgWrapper}>
                                        <Image src={item.img} className={styles.achivmentImg} alt="_"/>
                                    </div>

                                    <div className={styles.achivmentTitleWrapper}>
                                        <span className={styles.achivmentTitle}>{item.ruName}</span>
                                    </div>
                                </div>

                                <div className={styles.achivmentButtons}>
                                    {
                                        item.status === "received" && (
                                            <button className={`${styles.achivmentButton} ${styles.received}`}>
                                                Получено
                                            </button>
                                        )
                                    }

                                    {
                                        item.status === "reward" && (
                                            <button className={`${styles.achivmentButton} ${styles.reward}`}>
                                                {item.reward.coin && (
                                                    <span className={styles.rewardText}>{item.reward.coin} <Image className={styles.rewardImg} src={icons.coin} alt="_"/></span>
                                                )}

                                                {item.reward.xp && (
                                                    <span className={styles.rewardText}>{item.reward.coin}xp</span>
                                                )}
                                            </button>
                                        )
                                    }

                                    {
                                        item.status === "notAvailable" && (
                                            <button className={`${styles.achivmentButton} ${styles.notAvailable}`}>
                                                {item.reward.coin && (
                                                    <span className={styles.notAvailable}>{item.reward.coin} <Image className={styles.notAvailableImg} src={icons.coin} alt="_"/></span>
                                                )}

                                                {item.reward.xp && (
                                                    <span className={styles.notAvailable}>{item.reward.coin}xp</span>
                                                )}
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}