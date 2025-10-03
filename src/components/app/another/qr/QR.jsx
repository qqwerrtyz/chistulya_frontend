import styles from "./QR.module.css"
export default function QR ({isShow, setIsShow}) {
    function handleClose() {
        setIsShow(prev => !prev)
    }

    return (
        isShow && (
            <div className={styles.qrWrapper}>
                <div className={styles.qrBody}>
                    ...Сюда вставть QR



                    <div onClick={handleClose} className={styles.qrCloseWrapper}>
                        <span className={styles.qrClose}>Закрыть</span>
                    </div>
                </div>

                
            </div>
        )
    )
}