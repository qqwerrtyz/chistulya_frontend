

// import { useEffect, useState } from "react"
// import styles from "./ContentBody.module.css"
// import Image from "next/image"
// import icons from "../../../../../../icons/icons"

// export default function ContentBody({
//     selectValue,
//     firstData,
//     secondData,
//     isActive,
//     type,
//     onFulfill,
//     onTakeReward,
//     processingTaskId
// }) {
//     const [data, setData] = useState("")

//     useEffect(() => {
//         if (firstData && secondData) {
//             setData(
//                 isActive === "everyday"
//                     ? firstData
//                     : secondData
//             )
//         }
//     }, [isActive, firstData, secondData, type])

//     if (!data || !data[selectValue]) {
//         return <div>Данные загружаются</div>
//     }

//     return (
//         <div className={styles.contentBodyWrapper}>
//             <div className={styles.contentBody}>
//                 {data[selectValue]?.items.map((item, index) => {
//                     const requestId = `${isActive}-${item.id}`

//                     const isProcessing =
//                         processingTaskId === requestId

//                     const serverStatus = item.serverStatus

//                     const canFulfill =
//                         serverStatus === "available" ||
//                         serverStatus === "selected" ||
//                         serverStatus === "active" ||
//                         (!serverStatus && item.status === "fulfill")

//                     const canTakeReward =
//                         serverStatus === "completed" ||
//                         (!serverStatus && item.status === "take")

//                     const rewardReceived =
//                         serverStatus === "reward_claimed" ||
//                         (!serverStatus && item.status === "done")

//                     return (
//                         <div
//                             className={styles.item}
//                             key={`${item.id}-${index}`}
//                         >
//                             <div className={styles.imgAndTextWrapper}>
//                                 <div className={styles.imgItemWrppaer}>
//                                     <Image
//                                         alt={item.title}
//                                         className={styles.imgItem}
//                                         src={item.img}
//                                     />
//                                 </div>

//                                 <div className={styles.titleAndShortDesc}>
//                                     <span className={styles.title}>
//                                         {item.title}
//                                     </span>

//                                     {(type === "home" ||
//                                         type === "mission") && (
//                                         <span className={styles.shortDesc}>
//                                             {item.short}
//                                         </span>
//                                     )}
//                                 </div>
//                             </div>

//                             <div className={styles.buttonWrapper}>
//                                 {canFulfill && (
//                                     <button
//                                         className={styles.buttonFullfill}
//                                         onClick={() => {
//                                             if (typeof onFulfill !== "function") {
//                                                 console.error(
//                                                     "onFulfill не передан в ContentBody"
//                                                 )
//                                                 return
//                                             }

//                                             onFulfill(item, isActive)
//                                         }}
//                                         disabled={isProcessing}
//                                     >
//                                         {isProcessing
//                                             ? "..."
//                                             : "Выполнить"}
//                                     </button>
//                                 )}

//                                 {canTakeReward && (
//                                     <button
//                                         className={styles.buttonTake}
//                                         onClick={() => {
//                                             if (
//                                                 typeof onTakeReward !==
//                                                 "function"
//                                             ) {
//                                                 console.error(
//                                                     "onTakeReward не передан в ContentBody"
//                                                 )
//                                                 return
//                                             }

//                                             onTakeReward(item, isActive)
//                                         }}
//                                         disabled={isProcessing}
//                                     >
//                                         {isProcessing ? (
//                                             "..."
//                                         ) : (
//                                             <>
//                                                 <span>
//                                                     {item.reward.coins}

//                                                     <Image
//                                                         src={icons.coin}
//                                                         alt="Коины"
//                                                     />
//                                                 </span>

//                                                 <span>
//                                                     {item.reward.xp} XP
//                                                 </span>
//                                             </>
//                                         )}
//                                     </button>
//                                 )}

//                                 {rewardReceived && (
//                                     <button
//                                         className={styles.buttonDone}
//                                         disabled
//                                     >
//                                         Получено
//                                     </button>
//                                 )}
//                             </div>
//                         </div>
//                     )
//                 })}
//             </div>
//         </div>
//     )
// }















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
    const [selectedTaskId, setSelectedTaskId] = useState(null)

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
                                <span
                                    className={styles.moreDetails}
                                    onClick={() => setSelectedTaskId(item.id)}
                                >
                                    Подробнее
                                </span>
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
