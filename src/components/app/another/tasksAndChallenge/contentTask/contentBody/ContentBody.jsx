import { useEffect, useState } from "react"
import styles from "./ContentBody.module.css"
import Image from "next/image"
import SelectTaskComponent from "./selectTaskComponent/SelectTaskComponent"

export default function ContentBody({
    selectValue,
    firstData,
    secondData,
    isActive,
    type,
    onSelectDailyTask,
    onFulfill,
    onTakeReward,
    processingTaskId
}) {
    const [data, setData] = useState("")
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const role = localStorage.getItem("role")

    useEffect(() => {
        if (firstData && secondData) {
            setData(
                isActive === "everyday"
                    ? firstData
                    : secondData
            )
        }
    }, [isActive, firstData, secondData, type])

    if (!data || !data[selectValue]) {
        return <div>Данные загружаются</div>
    }

    const selectedTask = Object.values(data)
        .flatMap(group => group.items)
        .find(item => item.id === selectedTaskId)

    return (
        <div className={styles.contentBodyWrapper}>
            <div className={styles.contentBody}>
                {data[selectValue]?.items.map((item, index) => {
                    return (
                        <div
                            className={styles.item}
                            key={`${item.id}-${index}`}
                        >
                            <div className={styles.imgAndTextWrapper}>
                                <div className={styles.imgItemWrppaer}>
                                    <Image
                                        alt={item.title}
                                        className={styles.imgItem}
                                        src={item.img}
                                    />
                                </div>

                                <div className={styles.titleAndShortDesc}>
                                    <span className={styles.title}>
                                        {item.title}
                                    </span>

                                    {(type === "home" ||
                                        type === "mission") && (
                                        <span className={styles.shortDesc}>
                                            {item.short}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className={styles.buttonWrapper}>
                                {   
                                    
                                    role === "child" ? (
                                        
                                        <span
                                            className={styles.moreDetails}
                                            onClick={() => setSelectedTaskId(item.id)}
                                        >
                                            Подробнее
                                        </span>
                                    ) : (
                                        <span
                                            className={styles.moreDetails}
                                            onClick={() => alert("Только для ребенка")}
                                        >
                                            Подробнее
                                        </span>
                                    )
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
 
            {selectedTask && (
                <SelectTaskComponent
                    item={selectedTask}
                    isActive={isActive}
                    onSelectDailyTask={onSelectDailyTask}
                    onFulfill={onFulfill}
                    onTakeReward={onTakeReward}
                    processingTaskId={processingTaskId}
                    onClose={() => setSelectedTaskId(null)}
                />
            )}
        </div>
    )
}
