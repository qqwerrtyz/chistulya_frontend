"use client"
import { useEffect, useRef, useState } from "react";
import styles from "./progressLine.module.css"

export default function ProgressLine() {

    const [value, setValue] = useState(3); // число 4 -- пример
    const [allTask, setAllTask] = useState(5); // число 5 -- пример
    
    const progressRef = useRef(null);


    useEffect(() => {
        // вычисляем процент безопасно (защита от деления на 0 и некорректных значений)
        const total = Number(allTask) || 0;
        const done = Number(value) || 0;

        let percent = 0;
        if (total > 0) {
            percent = (done / total) * 100;
        } else {
            percent = 0;
        }

        // ограничим 0..100
        percent = Math.max(0, Math.min(100, percent));

        if (progressRef.current) {
            // применим ширину (проценты)
            progressRef.current.style.width = `${percent}%`;
            // для доступности можно обновлять атрибут aria-valuenow
            progressRef.current.setAttribute("aria-valuenow", String(Math.round(percent)));
        }
    }, [value, allTask]);


    return (
        <div className={styles.progressLineWrapper}>
            <div className={styles.progressLineHeadlineWrapper}>
                <span className={styles.progressLineHeadline}>Прогресс дня</span>
            </div>

            <div className={styles.progressLine}>
                <div
                    ref={progressRef}
                    className={styles.progressLineBg}
                    role="progressbar"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow="0"
                />
            </div>

            <div className={styles.countTaskWrapper}>
                <span className={styles.countTask}>{value} / {allTask}</span>
            </div>
        </div>
    )
}