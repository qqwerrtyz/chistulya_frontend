import Image from "next/image"
import styles from "./FooterLanding.module.css"
import Link from "next/link"
import icons from "@/icons/icons"

export default function FooterLanding() {
    return (
        <footer className={styles.footerWrapper}>
            <div className={styles.footer}>

                <div className={styles.col1}>
                    <div className={styles.logoWrapper}>
                        <Image
                            src="/imgs/logo.svg"
                            width={100}
                            height={100}
                            alt="Logo"
                            className={styles.logoImg}
                            priority                   // опционально
                        />
                        <span className={styles.logoText}>лого</span>
                    </div>
                </div>

                <div className={styles.col2}>
                    <div className={`${styles.footerItem} ${styles.footerItem1}`}>
                        <span className={styles.footerItemTitle}>Меню</span>
                        <div className={styles.footerSubitems}>
                            <Link href={"#"} className={styles.footerSubitem}>Главная</Link>
                            <Link href={"#"} className={styles.footerSubitem}>О приложении</Link>
                            <Link href={"#"} className={styles.footerSubitem}>Преимущества</Link>
                            <Link href={"#"} className={styles.footerSubitem}>Для кого  </Link>
                            <Link href={"#"} className={styles.footerSubitem}>Начать</Link>
                        </div>
                    </div>

                    <div className={`${styles.footerItem} ${styles.footerItem2}`}>
                        <span className={styles.footerItemTitle}>Контакты</span>
                        <div className={styles.footerSubitems}>
                            <a href={"https://t.me/Qqwerrtyz"} className={styles.footerSubitemImgWrapper}>
                                <Image width={100} height={100} src={icons.telegram} className={styles.footerSubitemImg}/>
                            </a>
                            
                        </div>
                    </div>

                    <div className={`${styles.footerItem} ${styles.footerItem3}`}>
                        <div className={styles.footerDocuments}>
                            <Link href={"#"} className={styles.footerDocument}>Пользовательское соглашение</Link>
                            <Link href={"#"} className={styles.footerDocument}>Все права защищены. Copyright © {new Date().getFullYear()}</Link>
                        </div>
                    </div>
                </div>


                <div className={styles.col3}>
                    <div className={styles.fasie}>
                        <p className={styles.fasieText}>Проект сделан при поддержке Фонда содействия инновации</p>
                        <Image width={100} height={100} className={styles.fasieImg} src={"/imgs/landing/fasie.png"}/>
                    </div>
                </div>

            </div>
        </footer>
    )
}