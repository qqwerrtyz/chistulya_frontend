import styles from "./BodyPetRoom.module.css"
export default function BodyPetRoom ({dataList}) {
    return (
        <div className={styles.bodyPetRoomWrapper}>
            <div className={styles.bodyPetRoom}>
                <button onClick={() => console.log(dataList)}>dataList</button>
                {
                    dataList.map((item, index) => {
                        return (
                            <div className={styles.bodyPetRoomCategory}>
                                <div className={styles.bodyPetRoomCategoryHeadlineWrapper}>
                                    <span className={styles.bodyPetRoomCategoryHeadline}>
                                        {item.ruNameCategory}
                                    </span>
                                </div>

                                <div></div>
                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}