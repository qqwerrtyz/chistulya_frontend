import { useContext, useState } from "react"
import styles from "./content.module.css"

import ContentHeader from "./contentHeader/ContentHeader";
import ContentBody from "./contentBody/ContentBody";


export default function Content ({firstData, secondData, isActive}) {


    const [selectValue, setSelectValue] = useState("hygiene")
    


    if (!firstData && !secondData) {
        return (
            <div>Загрузка данных...</div>
        )
    }

    return (
        <div className={styles.contentWrapper}>
            <div className={styles.contentHeaderWrapper}>
                <ContentHeader 
                    firstData={firstData}
                    secondData={secondData}
                    selectValue={selectValue} 
                    setSelectValue={setSelectValue}
                />
            </div>

            <div className={styles.contentBodyWrapper}>
                <ContentBody 
                    firstData={firstData} 
                    selectValue={selectValue}
                    secondData={secondData} 
                    isActive={isActive}
                    type={"home"}
                />
            </div>

        </div>
    )
}