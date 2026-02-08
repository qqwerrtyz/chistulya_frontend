import icons from "../../../../icons/icons"
import styles from "./../Profile.module.css"
import Image from "next/image"




export default function Avatar() {
    return (
        <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>
                <div className={styles.avatarImgWrapper}>
                    <span className={styles.avatarAddImgText}>
                        Добавить фото
                    </span>

                    <div className={styles.avatarAddImgIconWrapper}>
                        <Image src={icons.plusWhite} className={styles.avatarAddImgIcon}/>
                    </div>
                </div>
            </div>
        </div>
    )
}