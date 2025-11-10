import Image from "next/image"
import styles from "../Chellenge.module.css"
import icons from "../../../../../../../public/icons/icons"
export default function MenuChellengeAnalytics({selectedMonth, showDropDown, setShowDropDown}) {
    return (
        <div className={styles.menu} onClick={() => setShowDropDown(prev => !prev)}>
            <span className={styles.selectedMonth}>{selectedMonth.ruName}</span>

            {
                showDropDown ? (
                    <Image src={icons.arrowUpBlue} className={styles.menuArrow}/>
                ) : (
                    <Image src={icons.arrowDownBlue} className={styles.menuArrow}/>
                )
            }
        </div>
    )
}