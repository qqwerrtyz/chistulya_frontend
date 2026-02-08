import Image from "next/image";
import styles from "./../EveryDayTask.module.css"
import icons from "../../../../../../icons/icons";


export default function DropDown({dataDayTasks, setDataDayTasks, setSelectCategory, setIsOpen}) {
    function handleCheked (keys, item) {
        // key -- Это ключ от объекта dataDayTasks

        // item имеет следующую структуру:
        // cheked: true
        // enName: "hygien"
        // name: "Гигиена"


        setSelectCategory(keys)

        setDataDayTasks(prev => {
            
            const newData = {...prev}

            Object.keys(newData).forEach(itemPrev => {
                newData[itemPrev].cheked = false
            })

            newData[keys].cheked = !newData[keys].cheked

            return newData
        })

        setIsOpen(prev => !prev)
    }
    return (
        <div className={styles.dropDownWrapper}>
            <div className={styles.dropDown}>
                <div className={styles.dropDownHeader}>

                    {
                        // Берем ключи объекта dataDayTasks, превращаем в массив
                        // Проходимся по ним циклом map, чтобы протись по объекту dataDayTasks
                        Object.keys(dataDayTasks).map((item, index) => {
                            const name = dataDayTasks[item].name;
                            const cheked = dataDayTasks[item].cheked;
                            
                            return (
                                <div className={styles.dropDownDateWrapper}
                                    onClick={() => handleCheked(item ,dataDayTasks[item])}
                                >
                                    <div className={styles.dropDownDateChekedWrapper}>
                                        {
                                            cheked && <Image src={icons.cheked} className={styles.dropDownDateCheked}/>
                                        }
                                    </div>

                                    <span className={styles.dropDownDate}>{name}</span>
                                    
                                </div>
                            )
                        })
                        
                    }
                    

                </div>


                <div>

                </div>
            </div>
        </div>
    )
}