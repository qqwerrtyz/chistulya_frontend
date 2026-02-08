import Image from "next/image"
import icons from "../../../../../../icons/icons"
import styles from "./../EveryDayTask.module.css"
export default function Menu({setIsOpen, isOpen, dataDayTasks, setSelectCategory }) {
    function findCheked(obj) {
        const result = Object.values(obj).find((item, index) => {
            return item.cheked === true
        })



        return result.name
    }


    function openDropDown() {
        setIsOpen(prev => !prev)
    }


    return (
        <div onClick={() => openDropDown()} className={styles.menuWrapper}>
            <div className={styles.menu}>
                
                <span className={styles.menuNameCategory} onClick={() => console.log(dataDayTasks)}>{findCheked(dataDayTasks)}</span>
                
                {
                    isOpen ? (
                        <Image src={icons.arrowUp} className={styles.menuArrow}/>
                    ) : (
                        <Image src={icons.arrowDown} className={styles.menuArrow}/>
                    )
                }
                
            </div>
        </div>
    )
}