"use client"
import Image from "next/image"
import styles from "./Header.module.css"
import icons from "../../../../public/icons/icons"
import { useState } from "react"
import SidebarMenu from "../sidebarMenu/SidebarMenu"
import IconHeader from "../another/IconHeader/IconHeader"
import Link from "next/link"

export default function Header() {

    const [showSidebar, setShowSidebar] = useState(false)
    const [newNotification, setNewNotification] = useState(true);

    function showSidebarHandler() {
        setShowSidebar(prev => !prev)
    }

    return (
        <>
            <header className={styles.headerWrapper}>
            
                <IconHeader 
                    onClick={showSidebarHandler}
                    alt={"burger"} 
                    className={styles.burger}
                    src={icons.burger}
                />
                <div className={styles.iconsBellAndUser}>
                    <Link href={"/app/notifications"}>
                        <IconHeader alt={"bell"} className={styles.headerIcon} src={icons.bell} newNotification={newNotification}/>
                    </Link>
                    <Link href={"/app/profile"}>
                        <IconHeader alt="user" className={styles.headerIcon} src={icons.user}/>
                    </Link>
                </div>
                <SidebarMenu showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
            </header>

        </>
        
    )
}