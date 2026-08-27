import { useEffect, useRef } from "react"
import Image from "next/image"
import icons from "../../../../../../../icons/icons"
import styles from "../ContentBody.module.css"

export default function SelectTaskComponent({
    item,
    isActive,
    onSelectDailyTask,
    onFulfill,
    onTakeReward,
    processingTaskId,
    onClose
}) {
    const requestedTaskId = useRef(null)

    useEffect(() => {
        if (
            isActive !== "everyday" ||
            item.serverStatus !== "available" ||
            requestedTaskId.current === item.id
        ) {
            return
        }

        if (typeof onSelectDailyTask !== "function") {
            console.error(
                "onSelectDailyTask не передан в SelectTaskComponent"
            )
            return
        }

        requestedTaskId.current = item.id
        onSelectDailyTask(item)
    }, [item, isActive, onSelectDailyTask])

    const requestId = `${isActive}-${item.id}`
    const isProcessing = processingTaskId === requestId
    const serverStatus = item.serverStatus

    const canFulfill =
        serverStatus === "available" ||
        serverStatus === "selected" ||
        serverStatus === "active" ||
        (!serverStatus && item.status === "fulfill")

    const canTakeReward =
        serverStatus === "completed" ||
        (!serverStatus && item.status === "take")

    const rewardReceived =
        serverStatus === "reward_claimed" ||
        (!serverStatus && item.status === "done")

    return (
        <div
            className={styles.selectTaskOverlay}
            onClick={onClose}
        >
            <div
                className={styles.selectTaskModal}
                onClick={event => event.stopPropagation()}
            >
                <button
                    type="button"
                    className={styles.selectTaskClose}
                    onClick={onClose}
                >
                    ×
                </button>

                <div className={styles.selectTaskInfo}>
                    <span className={styles.title}>
                        {item.title}
                    </span>

                    <span className={styles.shortDesc}>
                        {item.description || item.short}
                    </span>
                </div>

                <div className={styles.buttonWrapper}>
                    {canFulfill && (
                        <button
                            className={styles.buttonFullfill}
                            onClick={() => {
                                if (typeof onFulfill !== "function") {
                                    console.error(
                                        "onFulfill не передан в SelectTaskComponent"
                                    )
                                    return
                                }

                                onFulfill(item, isActive)
                            }}
                            disabled={isProcessing}
                        >
                            {isProcessing ? "..." : "Выполнить"}
                        </button>
                    )}

                    {canTakeReward && (
                        <button
                            className={styles.buttonTake}
                            onClick={() => {
                                if (typeof onTakeReward !== "function") {
                                    console.error(
                                        "onTakeReward не передан в SelectTaskComponent"
                                    )
                                    return
                                }

                                onTakeReward(item, isActive)
                            }}
                            disabled={isProcessing}
                        >
                            {isProcessing ? (
                                "..."
                            ) : (
                                <>
                                    <span>
                                        {item.reward.coins}

                                        <Image
                                            src={icons.coin}
                                            alt="Коины"
                                        />
                                    </span>

                                    <span>
                                        {item.reward.xp} XP
                                    </span>
                                </>
                            )}
                        </button>
                    )}

                    {rewardReceived && (
                        <button
                            className={styles.buttonDone}
                            disabled
                        >
                            Получено
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
