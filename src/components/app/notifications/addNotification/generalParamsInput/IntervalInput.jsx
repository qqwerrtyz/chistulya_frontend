import Image from "next/image"
import styles from "./../../Notifications.module.css"
import icons from "../../../../../../public/icons/icons"
import { InputContext } from "../AddNotification";
import { useContext, useState } from "react";
export default function IntervalInput() {
    
    const [showDropdown, setShowDropdown] = useState(true);
    const {data, setData} = useContext(InputContext)
    return (
        
        <div
            className={`${styles.generalParamsFieldWrapper} ${styles.generalParamsFieldWrapperInterval}`}
        >
            <div
                className={styles.generalParamsFieldHeader}
                onClick={() => setShowDropdown(prev => !prev)}
            >
                <span className={styles.generalParamsField}>
                    {
                        data?.interval ? ` Повторять: ${data?.interval}` : "Выбрать интервал"
                    }
                </span>

                <div className={styles.generalParamsArrowsWrapper}>
                    {
                        showDropdown
                            ? <Image src={icons.arrowUp} className={styles.generalParamsArrow} />
                            : <Image src={icons.arrowDown} className={styles.generalParamsArrow} />
                    }
                </div>
            </div>

            <div className={`${styles.generalParamsDropdownWrapper} ${styles.generalParamsDropdownWrapperInterval}`}>
                <div className={styles.createInterval}>
                    <div className={styles.createInterval}>

                    </div>
                </div>
            </div>
        </div>
    )
}