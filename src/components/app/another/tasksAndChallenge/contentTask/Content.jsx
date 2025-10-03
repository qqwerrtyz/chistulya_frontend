import { useContext, useState } from "react"
import styles from "./content.module.css"

import ContentHeader from "./contentHeader/ContentHeader";
import ContentBody from "./contentBody/ContentBody";


export default function Content ({dailyTasks}) {


    const [selectValue, setSelectValue] = useState(null)
    


    if (!dailyTasks) {
        return (
            <div>Загрузка данных...</div>
        )
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.contentHeaderWrapper}>
                <ContentHeader dailyTasks={dailyTasks} selectValue={selectValue} setSelectValue={setSelectValue}/>
            </div>

            <div className={styles.contentBodyWrapper}>
                <ContentBody dailyTasks={dailyTasks} selectValue={selectValue} />
            </div>

        </div>
    )
}