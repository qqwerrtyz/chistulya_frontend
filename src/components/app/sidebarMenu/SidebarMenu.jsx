import Link from "next/link"
import icons from "../../../../public/icons/icons"
import IconHeader from "../another/IconHeader/IconHeader"
import styles from "./Sidebar.module.css"
import Image from "next/image"
import another from "../../../../public/imgs/another/another"
import { useState } from "react"
import QR from "../another/qr/QR"

function MenuItem({name, href, handler}) {
    return (
        <Link onClick={handler} href={href} className={styles.item}>
            <span className={styles.itemName}>{name}</span>
            <Image alt="arrowGo" className={styles.arrowGo} src={icons.arrowGo} />
        </Link>
    )
}


export default function SidebarMenu({showSidebar, setShowSidebar}) {
    const [showQR, setShowQR] = useState(false);

    const itemMenuChild = [
        {
            name: "Главная",
            href: "/app/child/"
        },

        {
            name: "Миссии",
            href: "/app/child/missin/"
        },

        {
            name: "Магазин",
            href: "/app/child/shop/"
        },

        {
            name: "Напоминания",
            href: "/app/child/reminders/"
        },

        {
            name: "Аналитика",
            href: "/app/child/analytics/"
        },

        {
            name: "Профиль",
            href: "/app/child/profile/"
        },
    ]

    const itemMenuParent = [
        {
            name: "Главная",
            href: "/app/parent/"
        },
        {
            name: "Аналитика",
            href: "/app/parent/analytics/"
        },
    ]

    const itemChildren = [
        {
            name: "Маша",
            href: "/app/parent/"
        },
        {
            name: "Саша",
            href: "/app/parent/analytics/"
        },
    ]

    const role = "child"

    function handlerQR(event) {
        event.preventDefault();
        setShowQR(prev => !prev)
    }

    function handlerShowSidebar() {
        setShowSidebar(prev => !prev)
    }

    return (

        showSidebar && (
            <div className={styles.sidebarMenu}>
                <div className={styles.header}>
                    <div className={styles.closeWrapper}>
                        <IconHeader 
                            onClick={handlerShowSidebar}
                            alt={"activeBurger"}
                            className={styles.activeBurger}
                            src={icons.activeBurger}
                        />
                    </div>
                </div>

                <div className={styles.body}>
                    <div className={styles.menuWrapper}>
                        {
                            role === "child" && (
                                itemMenuChild.map((item, index) => {
                                    return (
                                            <MenuItem name={item.name} href={item.href} key={`${index}-${item.name}`}/>
                                    )
                                })
                            )
                        }

                        {
                            role === "parent" && (
                                <>
                                    <div >
                                        {
                                            itemMenuParent.map((item, index) => {
                                                return (
                                                        <MenuItem name={item.name} href={item.href} key={`${index}-${item.name}`}/>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className={styles.itemChildren}>
                                        {
                                            itemChildren.map((item, index) => {
                                                return (
                                                        <MenuItem name={item.name} href={item.href} key={`${index}-${item.name}`}/>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.subscribeWrapper}>
                        <span className={styles.subscirbeText}>У вас подключена подписка!</span>
                        <div className={styles.subscirbeManageWrapper}>
                            <Link className={styles.subscirbeManageLink} href={"#"}>
                                <span className={styles.subscirbeManage}>Управлять</span> 
                                <Image className={styles.subscirbeArrow} alt="manage" src={icons.arrowGo}/>
                            </Link>
                        </div>

                        <Image alt="subscribeEllipse" className={styles.subscribeEllipse} src={another.subscribeEllipse}/>
                    </div>

                    <div className={styles.itemQr}>
                        <MenuItem handler={handlerQR} name={"QR-код"} href={"#"}/>
                        <QR isShow={showQR} setIsShow={setShowQR}/>
                    </div>

                    <div className={styles.exitWrapper}>
                        <div className={styles.exit}>
                            <Image alt="exit" className={styles.exitIcon} src={icons.exit}/>
                            <span className={styles.exitText}>Выйти</span>
                        </div>
                    </div>
                </div>
                

            </div>
        )
    )
}