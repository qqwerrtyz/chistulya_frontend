"use client"
import styles from "./OnlyPhone.module.css"
import Image from "next/image";
import icons from "@/icons/icons";
import { useEffect, useState } from "react"

export default function OnlyPhone() {
  const [showOnlyPhone, setShowOnlyPhone] =
        useState(false)

    useEffect(() => {
        function checkScreenWidth() {
            setShowOnlyPhone(window.innerWidth > 576)
        }

        checkScreenWidth()

        window.addEventListener(
            "resize",
            checkScreenWidth
        )

        return () => {
            window.removeEventListener(
                "resize",
                checkScreenWidth
            )
        }
    }, [])

    useEffect(() => {
        if (!showOnlyPhone) {
            return
        }

        const previousOverflow =
            document.body.style.overflow

        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow =
                previousOverflow
        }
    }, [showOnlyPhone])

    if (!showOnlyPhone) {
        return null
    }
    return (
    <div className={styles.onlyPhoneWrapper}>
      <div className={styles.onlyPhone}>
        <div className={styles.content}>
          <div className={styles.titleWrapper}>
            <span className={styles.title}>Упс... Видимо вы открыли сайт не с телефона :c</span>
            <span className={styles.title}>перезайдите с телефна</span>
          </div>

          <div className={styles.subtitleWrapper}>
            <span className={styles.subtitle}>Для удобства отсканируйте QR с телефона</span>
            <span className={styles.subtitle}>Вы попадете  </span>
          </div>

          <div className={styles.QRWrapper}>
            <Image src={icons.qr}/>
          </div>
        </div>
      </div>
    </div>
  )
}