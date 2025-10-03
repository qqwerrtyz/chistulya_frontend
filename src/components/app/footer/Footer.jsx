import Image from "next/image"
import styles from "./Footer.module.css"
import icons from "../../../../public/icons/icons"
import Link from "next/link"

function FooterIcon({src, name}) {
    return (
        <div className={styles.footerIconWrapper}>
            <Link className={styles.footerLink} href={"#"}>
                <Image  src={src} className={styles.footerIcon}/>
                <span className={styles.footerIconName}>{name}</span>
            </Link>
        </div>
    )
}

export default function Footer() {
    return (
        <footer className={styles.footerWrapper}>
            <div className={styles.footer}>

                <div className={styles.footerHalf}>
                    <FooterIcon src={icons.footerMain} name={"Главная"}/>
                    <FooterIcon src={icons.footerMissions} name={"Миссии"}/>
                </div>
                

                <div className={styles.footerPlusWrapper}>
                    <Link className={styles.footerPlusLink} href={"#"}>
                        <Image className={styles.footerPlus} src={icons.footerPlus}/>
                    </Link>
                </div>

                <div className={styles.footerHalf}>
                    <FooterIcon src={icons.footerShop} name={"Магазин"}/>
                    <FooterIcon src={icons.footerAnalitycs} name={"Аналитика"}/>
                </div>

            </div>
        </footer>
    )
}