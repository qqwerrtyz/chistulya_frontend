"use client"
import Image from "next/image"
import styles from "./Header.module.css"
import icons from "../../../../public/icons/icons"
import { useState } from "react"
import SidebarMenu from "../sidebarMenu/SidebarMenu"
import IconHeader from "../another/IconHeader/IconHeader"

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
                    <IconHeader alt={"bell"} className={styles.headerIcon} src={icons.bell} newNotification={newNotification}/>
                    <IconHeader alt="user" className={styles.headerIcon} src={icons.user}/>
                </div>
                <SidebarMenu showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
            </header>

        </>
        
    )
}