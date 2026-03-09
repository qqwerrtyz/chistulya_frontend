"use client"
import Link from "next/link";
import styles from "./header.module.css"
import Image from "next/image";
import icons from "@/icons/icons";
import { useState } from "react";
export default function HeaderLanding() {
    const menuItems = [
        {
        ru: "Главная",
        href: "#"
        },

        {
        ru: "О приложении",
        href: "#"
        },

        {
        ru: "Преимущества",
        href: "#"
        },

        {
        ru: "Для кого",
        href: "#"
        },

        {
        ru: "Начать",
        href: "#"
        },
    ]

    const [isSidebar, setIsSidebar] = useState (false);




    return (
        <>
            <header className={styles.headerWrapper}>
                <div className={styles.header}>

                <div className={styles.logoWrapper}>
                    <div className={styles.logoImgWrapper}>
                    <Image
                        src="/imgs/logo.svg"
                        alt="Logo"
                        fill                       // <- важно
                        className={styles.logoImg}
                        priority                   // опционально
                    />
                    </div>

                    <span style={{color: "#ED985B"}} className={styles.logoHeadline}>Чистюля</span>
                </div>

                <div className={styles.menuWrapper}>
                    
                    <div className={styles.menuItemsWrapper}>
                    {
                        menuItems.map((item, index) => {
                        return (
                            <div className={styles.menuItemWrapper}>
                            <Link href={item.href} className={styles.menuItem}>{item.ru}</Link>
                            </div>
                        )
                        })
                    }
                    </div>
                </div>
                

                <div className={styles.burgerLandingWrapper}>
                    <Image 
                        src={icons.burgerLanding}
                        className={styles.burgerLanding}
                        onClick={() => setIsSidebar(prev => !prev)}    
                    />
                </div>
                <div className={styles.goAppWrapper}>
                    <Link href={"#"} className={styles.goApp}>Перейти</Link>
                </div>
                
                </div>
                


                {
                    isSidebar && (
                        <aside className={styles.sidebarWrapper}>
                            <div className={styles.sidebar}>
                                
                                <div className={styles.crossCloseWrapper}>
                                    <Image
                                        src={icons.cross}
                                        className={styles.cross}
                                        onClick={() => setIsSidebar(prev => !prev)}    
                                    />
                                </div>

                                <div className={styles.menu}>
                                    <div className={styles.menuTitleWrapper}>
                                        <span className={styles.menuTitle}>Меню</span>
                                    </div>

                                    <div className={styles.menuItems}>
                                        {
                                            menuItems.map((item, index) => {
                                                return (
                                                    <div className={styles.menuItemWrapper}>
                                                        <span className={styles.menuItem}>{item.ru}</span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>

                                <div className={styles.telegramWrapper}>
                                    <a href={"https://t.me/Qqwerrtyz"} className={styles.telegramLink}>
                                        <Image src={icons.telegram} className={styles.telegram}/>
                                    </a>
                                </div>

                                <div className={styles.goAppSidebarWrapper}>
                                    <Link className={styles.goAppSidebar} href={"#"}>Перейти</Link>
                                </div>
                            </div>

                            
                        </aside>
                    )
                }
                


                
            </header>

            
        </>
    )
}