import Avatar from "@/components/app/profile/avatar/Avatar"
import styles from "./Profile.module.css"
import NameAndAge from "@/components/app/profile/nameAndAge/NameAndAge"
import UserData from "@/components/app/profile/userData/UserData"
export default function Profile() {
    return (
        <div className={styles.profileWrapper}>
            <div className={styles.profile}>

                <Avatar />

                <NameAndAge />

                <div className={styles.userData}>
                    <UserData />
                </div>

            </div>
        </div>
    )
}