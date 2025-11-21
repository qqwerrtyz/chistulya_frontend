import styles from "../Chellenge.module.css"
export default function DropDown({showDropDown, setShowDropDown, dataMonth, setSelectedMonth, selectedMonth}) {
    function handleSelectedMonth(ru, en, count) {
        setSelectedMonth(prev => {
            prev = {
                ruName: ru,
                enName: en,
                count: count
            }
            return prev
        })

        setShowDropDown(prev => !prev)
    }
    return (
        showDropDown && (
            <div className={styles.dropDownMenu}>
                        {
                            dataMonth.map((item, index) => {
                                return (
                                    <div
                                        className={styles.dropDownMenuItem}
                                        onClick={() => handleSelectedMonth(item.ruNameMonth, item.enNameMonth, item.count)}>
                                        <span className={styles.dropDownMenuItemName}>{item.ruNameMonth}</span>
                                        {
                                            selectedMonth.enName === item.enNameMonth && (

                                                <div className={styles.dropDownMenuItemSelect}></div>
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
            </div>
        )
    )
}