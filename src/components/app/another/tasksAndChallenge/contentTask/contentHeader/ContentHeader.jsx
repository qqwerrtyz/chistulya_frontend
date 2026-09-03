import { useContext, useState } from "react";
import styles from "./ContentHeader.module.css"


export default function ContentHeader({
    firstData,
    selectValue,
    setSelectValue
}) {
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                <div className={styles.headerItemWrapper}>
                    {Object.keys(firstData || {}).map(item => {
                        const name = firstData[item].name
                        const isActive = selectValue === item

                        return (
                            <span
                                key={item}
                                onClick={() => setSelectValue(item)}
                                className={
                                    `${styles.headerItem} ${
                                        isActive
                                            ? styles.higlight
                                            : ""
                                    }`.trim()
                                }
                            >
                                {name}
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}