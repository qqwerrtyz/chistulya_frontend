import Image from "next/image"
import styles from "./Footer.module.css"
import icons from "../../../../public/icons/icons"
import Link from "next/link"

function FooterIcon({src, name, href, alt}) {
    return (
        <div className={styles.footerIconWrapper}>
            <Link className={styles.footerLink} href={href}>
                <Image alt={alt} src={src} className={styles.footerIcon}/>
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
                    <FooterIcon src={icons.footerMain} name={"Главная"} alt={"mainIcon"} href={"/app/child"}/>
                    <FooterIcon src={icons.footerMissions} name={"Миссии"} alt={"missionIcon"} href={"/app/child/mission"}/>
                </div>
                

                <div className={styles.footerPlusWrapper}>
                    <Link className={styles.footerPlusLink} href={"#"}>
                        <Image alt="addIcon" className={styles.footerPlus} src={icons.footerPlus}/>
                    </Link>
                </div>

                <div className={styles.footerHalf}>
                    <FooterIcon src={icons.footerShop} name={"Магазин"} alt={"shopIcon"} href={"/app/child/shop"}/>
                    <FooterIcon src={icons.footerAnalitycs} name={"Аналитика"} alt={"analutycsIcon"} href={"/app/child/analytics"}/>
                </div>

            </div>
        </footer>
    )
}