import { useContext, useState } from "react";
import styles from "./ContentHeader.module.css"
import { DataContent } from "../../wrapper/Wrapper";

export default function ContentHeader({selectValue, setSelectValue}) {
    const dailyTasks = useContext(DataContent);
    const [higlight, setHiglight] = useState(null)

    

    function handleHighLight(name, item) {    
        setSelectValue(item);
        setHiglight(name)
    }
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                <div className={styles.headerItemWrapper}>
                    {
                        Object.keys(dailyTasks).map((item, index) => {
                            const name = dailyTasks[item].name
                            const isActive = higlight === name;

                            return (
                                <span 
                                    onClick={() => handleHighLight(name, item)} 
                                    className={`${styles.headerItem} ${isActive && styles.higlight}`.trim()}>
                                    {name}
                                </span>
                            )
                        })
                    }
                    
                </div>
            </div>
        </div>
    )
}