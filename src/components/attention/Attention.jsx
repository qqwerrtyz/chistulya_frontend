

"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import icons from "@/icons/icons"
import styles from "./Attention.module.css"

export default function AttentionModal() {
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        const attentionModalValue =
            sessionStorage.getItem("attentionmodal")

        if (attentionModalValue !== "true") {
            sessionStorage.setItem(
                "attentionmodal",
                "false"
            )

            setIsShow(true)
        }
    }, [])

    useEffect(() => {
        if (!isShow) {
            return
        }

        const previousBodyOverflow =
            document.body.style.overflow

        const previousHtmlOverflow =
            document.documentElement.style.overflow

        document.body.style.overflow = "hidden"
        document.documentElement.style.overflow = "hidden"

        return () => {
            document.body.style.overflow =
                previousBodyOverflow

            document.documentElement.style.overflow =
                previousHtmlOverflow
        }
    }, [isShow])

    function handleClose() {
        sessionStorage.setItem(
            "attentionmodal",
            "true"
        )

        setIsShow(false)
    }

    if (!isShow) {
        return null
    }

    return (
        <div
            className={styles.atentionWrapper}
            role="dialog"
            aria-modal="true"
            aria-labelledby="attention-modal-title"
        >
            <div className={styles.atention}>
                <div
                    className={
                        styles.atentionHeaderWrapper
                    }
                >
                    <span
                        id="attention-modal-title"
                        className={
                            styles.atentionHeaderText
                        }
                    >
                        ПРОЧТИТЕ ПЕРЕД ТЕМ КАК ЗАКРЫТЬ
                    </span>

                    <Image
                        className={styles.closeCross}
                        src={icons.cross}
                        alt="Закрыть предупреждение"
                        onClick={handleClose}
                    />
                </div>

                <div
                    className={styles.atentionContent}
                >
                    <span
                        className={styles.atentionTitle}
                    >
                        Данное веб-приложение находится
                        на стадии прототипа, поэтому если
                        вы видите пустой список либо
                        непрогруженные детали, пожалуйста,{" "}
                        <span
                            className={
                                styles.atentionTitleHilight
                            }
                        >
                            не переживайте и просто
                            обновите страницу c:
                        </span>
                    </span>
                </div>
            </div>
        </div>
    )
}