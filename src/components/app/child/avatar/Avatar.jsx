
import Image from "next/image"
import avatarImage from "../../../../../public/avatar/avatar"
import styles from "./Avatar.module.css"

export default function Avatar() {
    
    return (
        <div className={styles.avatarWrapper}>
            <Image src={avatarImage.avatar}/>
        </div>
    )
}