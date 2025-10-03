import { useContext, useState } from "react"
import styles from "./content.module.css"

import { DataContent } from "../wrapper/Wrapper";
import ContentHeader from "./contentHeader/ContentHeader";
import ContentBody from "./contentBody/ContentBody";


export default function Content () {

    const dailyTasks = useContext(DataContent);

    const [selectValue, setSelectValue] = useState(null)
    


    if (!dailyTasks) {
        return (
            <div>Загрузка данных...</div>
        )
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.contentHeaderWrapper}>
                <ContentHeader selectValue={selectValue} setSelectValue={setSelectValue}/>
            </div>

            <div className={styles.contentBodyWrapper}>
                <ContentBody selectValue={selectValue} />
            </div>

        </div>
    )
}