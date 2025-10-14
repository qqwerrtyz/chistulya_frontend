import { useContext, useState } from "react"
import styles from "./content.module.css"

import ContentHeader from "./contentHeader/ContentHeader";
import ContentBody from "./contentBody/ContentBody";


export default function Content ({dailyTasks, challengeTasks, isActive}) {


    const [selectValue, setSelectValue] = useState(null)
    


    if (!dailyTasks) {
        return (
            <div>Загрузка данных...</div>
        )
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.contentHeaderWrapper}>
                <ContentHeader 
                    dailyTasks={dailyTasks}
                    challengeTasks={challengeTasks}
                    selectValue={selectValue} 
                    setSelectValue={setSelectValue}
                />
            </div>

            <div className={styles.contentBodyWrapper}>
                <ContentBody 
                    dailyTasks={dailyTasks} 
                    selectValue={selectValue}
                    challengeTasks={challengeTasks} 
                    isActive={isActive}
                />
            </div>

        </div>
    )
}