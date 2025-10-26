import styles from "./BodyPetRoom.module.css"
export default function BodyPetRoom ({dataList}) {
    return (
        <div className={styles.bodyPetRoomWrapper}>
            <div className={styles.bodyPetRoom}>

                {
                    dataList.map((item, index) => {
                        return (
                            <div className={styles}>

                            </div>
                        )
                    })
                }

            </div>
        </div>
    )
}