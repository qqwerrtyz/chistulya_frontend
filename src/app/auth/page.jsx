import Image from "next/image"
import styles from "./Auth.module.css"
import avatarImage from "../../../public/avatar/avatar"
import Link from "next/link"

export default function Auth() {
    return (
        <div className={styles.authWrapper}>
            <div className={styles.auth}>

                <div className={styles.authHeadlineWrapper}>
                    <h1 className={styles.authHeadline}>ИГРАЙ И УЧИСЬ БЫТЬ ЧИСТЮЛЕЙ</h1>
                </div>

                <div className={styles.authAvatarWrapper}>
                    <Image src={avatarImage.avatar}/>
                </div>

                <div className={styles.authRegWrapper}>
                    <Link href={"/reg"} className={styles.authReg}>Зарегистрироваться</Link>
                </div>

                <div className={styles.authLoginWrapper}>
                    <span className={styles.authLogin}>У вас уже есть аккаунт? <Link href={"/log"} className={styles.authLoginLink}>Войти</Link></span>
                </div>

            </div>
        </div>
    )
}