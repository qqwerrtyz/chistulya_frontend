"use client";

import { useEffect, useState } from "react";
import styles from "./NoPhoto.module.css";
import Image from "next/image";
import icons from "@/icons/icons";
import { useRouter } from "next/navigation";

export default function NoPhoto() {
    const [isMobile, setIsMobile] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth <= 576);
        };

        checkScreen();
        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMobile ? "" : "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobile]);

    if (isMobile) return null;

    return (
        <div className={styles.noPhotoWrapper}>
            <div className={styles.backWrapper} onClick={() => router.back()}>
                <Image className={styles.back} src={icons.backWhite}/>
            </div>

            <div className={styles.noPhoto}>
                <div className={styles.company}>
                    <Image width={100} height={100} className={styles.logo} src={"/imgs/logo.svg"}/> <span className={styles.logoTitle}>Лого</span>
                </div>

                <div className={styles.paragraphWrapper}>
                    <p className={styles.paragraph}>Ой... Видимо вы зашли не с телефона :(</p>
                    <p className={styles.paragraph}>Перейдите на мобильный девайс и все заработает!</p>
                    <p className={styles.paragraph}>Отсканируйте QR на мобильном утройстве и откроется нужная страница :)</p>
                </div>

                <div className={styles.noPhotoQRWapper}>
                    <Image width={100} height={100} className={styles.noPhotoQR} src={"/imgs/qr.svg"}/>
                </div>
            </div>
        </div>
    );
}