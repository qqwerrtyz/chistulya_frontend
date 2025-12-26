import { useContext } from "react";
import styles from "./../../Notifications.module.css"
import { InputContext } from "../AddNotification";

export default function TitleAndSubtitle({placehokder, type}) {
    const {data, setData} = useContext(InputContext);
    function setValue(change) {
        setData(prev => {
            const clone = {
                ...prev,
                [type]: change
            }

            return clone
        })
    }
    if (!data && !setData) return <h1>ИДет загрузка</h1>
    return (
        <div
            className={`${styles.generalParamsFieldWrapper} ${styles.generalParamsFieldWrapperTitleAndSubtitle}`}
        >
            <div
                className={styles.generalParamsFieldHeader}
            >
                <input 
                    type="text"
                    value={data?.[type] || ""}  // Добавлено || "" для безопасности
                    placeholder={placehokder}
                    className={styles.TitleAndSubtitleInput}
                    onChange={(e) => setValue(e.target.value)}  // ← ИСПРАВЛЕНО ЗДЕСЬ
                />

               
            </div>
        </div>
    )
}