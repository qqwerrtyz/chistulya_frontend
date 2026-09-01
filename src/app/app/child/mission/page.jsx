

"use client"

import { GRAPHQL_URL } from "@/config/publicEnv"

import Menu from "@/components/app/another/menu/Menu"
import styles from "./Mission.module.css"
import { useEffect, useState } from "react"
import ContentHeader from "@/components/app/another/tasksAndChallenge/contentTask/contentHeader/ContentHeader"
import ContentBody from "@/components/app/another/tasksAndChallenge/contentTask/contentBody/ContentBody"
import iconsTasks from "../../../../../public/iconsTasks/iconsTasks"

const TASKS_AND_CHALLENGES_QUERY = `
  query TasksAndChallengesData {
    availableDailyTasks(page: 1, per_page: 50) {
      data {
        id
        title
        short_description
        description
        reward_xp
        reward_coins
        category {
          id
          slug
          title
          order_column
        }
      }
    }

    selectedDailyTasks(page: 1, per_page: 50) {
      data {
        status
        completed_at
        reward_claimed_at
        daily_task {
          id
          title
          short_description
          description
          reward_xp
          reward_coins
          category {
            id
            slug
            title
            order_column
          }
        }
      }
    }

    availableChallenges(page: 1, per_page: 50) {
      data {
        id
        title
        short_description
        description
        reward_xp
        reward_coins
        duration_days
        category {
          id
          slug
          title
          order_column
        }
      }
    }

    selectedChallenges(page: 1, per_page: 50) {
      data {
        status
        progress_days
        completed_at
        reward_claimed_at
        challenge {
          id
          title
          short_description
          description
          reward_xp
          reward_coins
          duration_days
          category {
            id
            slug
            title
            order_column
          }
        }
      }
    }
  }
`

const MUTATION_ERRORS = `
    errors {
        __typename

        ... on ValidationError {
            message
            fields {
                field
                messages
            }
        }

        ... on RateLimitError {
            message
            retryAfter
        }

        ... on InvalidActionError {
            message
        }
    }
`

const SELECT_DAILY_TASK_MUTATION = `
    mutation SelectDailyTask($daily_task_id: String!) {
        selectDailyTask(daily_task_id: $daily_task_id) {
            success
            ${MUTATION_ERRORS}

            child_daily_task {
                daily_task_id
                status
                completed_at
                reward_claimed_at
            }
        }
    }
`

const COMPLETE_DAILY_TASK_MUTATION = `
    mutation CompleteDailyTask($daily_task_id: String!) {
        completeDailyTask(daily_task_id: $daily_task_id) {
            success
            ${MUTATION_ERRORS}

            child_daily_task {
                daily_task_id
                status
                completed_at
                reward_claimed_at
            }
        }
    }
`

const CLAIM_DAILY_TASK_REWARD_MUTATION = `
    mutation ClaimDailyTaskReward($daily_task_id: String!) {
        claimDailyTaskReward(daily_task_id: $daily_task_id) {
            success
            ${MUTATION_ERRORS}
        }
    }
`

function getIconByCategory(slug) {
    if (slug === "hygiene") {
        return iconsTasks.brushTeeth
    }

    if (slug === "order") {
        return iconsTasks.hand
    }

    if (slug === "food") {
        return iconsTasks.hand
    }

    if (slug === "study") {
        return iconsTasks.hairbrush
    }

    return iconsTasks.brushTeeth
}

function mapServerStatusToClientStatus(status) {
    if (status === "completed") {
        return "take"
    }

    if (status === "reward_claimed") {
        return "done"
    }

    return "fulfill"
}

function createEmptyGroups() {
    return {
        hygiene: {
            name: "Гигиена",
            items: []
        },

        order: {
            name: "Порядок",
            items: []
        },

        food: {
            name: "Еда",
            items: []
        },

        study: {
            name: "Учеба",
            items: []
        }
    }
}

// function addItemToGroup(groups, item, status = "fulfill") {
//     const categorySlug = item?.category?.slug || "hygiene"
//     const categoryName = item?.category?.title || "Без категории"

//     if (!groups[categorySlug]) {
//         groups[categorySlug] = {
//             name: categoryName,
//             items: []
//         }
//     }

//     groups[categorySlug].items.push({
//         id: item.id,
//         img: getIconByCategory(categorySlug),
//         title: item.title,
//         short: item.short_description || "",
//         description: item.description || "",
//         reward: {
//             coins: item.reward_coins || 0,
//             xp: item.reward_xp || 0
//         },
//         status: status
//     })
// }
function addItemToGroup(
    groups,
    item,
    status = "fulfill",
    serverStatus
) {
    const categorySlug =
        item?.category?.slug || "hygiene"

    const categoryName =
        item?.category?.title || "Без категории"

    if (!groups[categorySlug]) {
        groups[categorySlug] = {
            name: categoryName,
            items: []
        }
    }

    groups[categorySlug].items.push({
        id: item.id,
        img: getIconByCategory(categorySlug),
        title: item.title,
        short: item.short_description || "",
        description: item.description || "",

        reward: {
            coins: item.reward_coins || 0,
            xp: item.reward_xp || 0
        },

        status,
        serverStatus
    })
}
// function prepareDailyTasks(data) {
//     const groups = createEmptyGroups()

//     const availableDailyTasks = data?.availableDailyTasks?.data || []
//     const selectedDailyTasks = data?.selectedDailyTasks?.data || []

//     availableDailyTasks.forEach((task) => {
//         addItemToGroup(groups, task, "fulfill")
//     })

//     selectedDailyTasks.forEach((item) => {
//         if (!item.daily_task) {
//             return
//         }

//         addItemToGroup(
//             groups,
//             item.daily_task,
//             mapServerStatusToClientStatus(item.status)
//         )
//     })

//     return groups
// }

function prepareDailyTasks(data) {
    const groups = createEmptyGroups()

    const availableDailyTasks =
        data?.availableDailyTasks?.data || []

    const selectedDailyTasks =
        data?.selectedDailyTasks?.data || []

    availableDailyTasks.forEach(task => {
        addItemToGroup(
            groups,
            task,
            "fulfill",
            "available"
        )
    })

    selectedDailyTasks.forEach(item => {
        if (!item.daily_task) {
            return
        }

        addItemToGroup(
            groups,
            item.daily_task,
            mapServerStatusToClientStatus(item.status),
            item.status
        )
    })

    return groups
}

function prepareChallengeTasks(data) {
    const groups = createEmptyGroups()

    const availableChallenges = data?.availableChallenges?.data || []
    const selectedChallenges = data?.selectedChallenges?.data || []

    availableChallenges.forEach((challenge) => {
        addItemToGroup(groups, challenge, "fulfill")
    })

    selectedChallenges.forEach((item) => {
        if (!item.challenge) {
            return
        }

        addItemToGroup(
            groups,
            item.challenge,
            mapServerStatusToClientStatus(item.status)
        )
    })

    return groups
}

export default function Mission() {
    const menuItem = {
        itemOne: {
            ru: "Ежедневные",
            en: "everyday"
        },
        itemTwo: {
            ru: "Челленджи",
            en: "challenge"
        },
    }

    const [isActive, setIsActive] = useState(menuItem.itemOne.en)
    const [selectValue, setSelectValue] = useState("hygiene")

    const [dailyTasks, setDailyTasks] = useState(null)
    const [challengeTasks, setChallengeTasks] = useState(null)
    const [err, setErr] = useState(null)

    const [processingTaskId, setProcessingTaskId] = useState(null)

    useEffect(() => {
        async function getTasksAndChallenges() {
            const accessToken = localStorage.getItem("access_token")

            if (!accessToken) {
                setErr("Нет токена авторизации")
                return
            }

            try {
                const response = await fetch(GRAPHQL_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        query: TASKS_AND_CHALLENGES_QUERY
                    })
                })

                const result = await response.json()

                console.group("MISSION BACKEND DATA")
                console.log("HTTP STATUS:", response.status)
                console.log("FULL RESULT:", result)
                console.log("FULL RESULT JSON:", JSON.stringify(result, null, 2))
                console.log("DATA:", result.data)
                console.log("ERRORS:", result.errors)

                console.log("AVAILABLE DAILY TASKS:", result.data?.availableDailyTasks)
                console.log("SELECTED DAILY TASKS:", result.data?.selectedDailyTasks)
                console.log("AVAILABLE CHALLENGES:", result.data?.availableChallenges)
                console.log("SELECTED CHALLENGES:", result.data?.selectedChallenges)
                console.groupEnd()


                if (result.errors?.length && !result.data) {
                    setErr(result.errors[0].message)
                    return
                }

                setDailyTasks(prepareDailyTasks(result.data))
                setChallengeTasks(prepareChallengeTasks(result.data))

            } catch (error) {
                setErr("Ошибка загрузки миссий")
            }
        }

        getTasksAndChallenges()
    }, [])

    function getPayloadErrorMessage(payload) {
    const firstError = payload?.errors?.[0]

    if (!firstError) {
        return "Не удалось выполнить действие"
    }

    if (firstError.fields?.length) {
        return firstError.fields
            .flatMap(field => field.messages || [])
            .join(", ")
    }

    return firstError.message ||
        "Не удалось выполнить действие"
}

async function executeTaskMutation(
    query,
    variables,
    operationName
) {
    const accessToken =
        localStorage.getItem("access_token")

    if (!accessToken) {
        throw new Error("Нет токена авторизации")
    }

    const response = await fetch(GRAPHQL_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        },

        body: JSON.stringify({
            query,
            variables
        })
    })

    const result = await response.json()

    if (!response.ok) {
        throw new Error(
            result?.message ||
            `Ошибка запроса: ${response.status}`
        )
    }

    if (result.errors?.length) {
        throw new Error(result.errors[0].message)
    }

    const payload = result.data?.[operationName]

    if (!payload) {
        throw new Error(
            `Сервер не вернул ${operationName}`
        )
    }

    if (!payload.success) {
        throw new Error(
            getPayloadErrorMessage(payload)
        )
    }

    return payload
}

function updateDailyTaskStatus(
    taskId,
    clientStatus,
    serverStatus
) {
    setDailyTasks(previousTasks => {
        if (!previousTasks) {
            return previousTasks
        }

        const updatedTasks = {}

        Object.entries(previousTasks).forEach(
            ([categorySlug, group]) => {
                updatedTasks[categorySlug] = {
                    ...group,

                    items: group.items.map(item => {
                        if (item.id !== taskId) {
                            return item
                        }

                        return {
                            ...item,
                            status: clientStatus,
                            serverStatus
                        }
                    })
                }
            }
        )

        return updatedTasks
    })
}

async function selectDailyTask(item) {
    if (
        processingTaskId ||
        item.serverStatus !== "available"
    ) {
        return
    }

    const requestId = `everyday-${item.id}`

    setProcessingTaskId(requestId)
    setErr(null)

    try {
        const payload = await executeTaskMutation(
            SELECT_DAILY_TASK_MUTATION,
            {
                daily_task_id: item.id
            },
            "selectDailyTask"
        )

        const currentStatus =
            payload.child_daily_task?.status ||
            "selected"

        updateDailyTaskStatus(
            item.id,
            mapServerStatusToClientStatus(currentStatus),
            currentStatus
        )
    } catch (error) {
        console.error(
            "SELECT DAILY TASK ERROR:",
            error
        )

        setErr(
            error.message ||
            "Не удалось выбрать задание"
        )
    } finally {
        setProcessingTaskId(null)
    }
}

async function fulfillTask(item, activeType) {
    if (
        processingTaskId ||
        activeType !== "everyday"
    ) {
        return
    }

    const requestId = `${activeType}-${item.id}`

    setProcessingTaskId(requestId)
    setErr(null)

    try {
        let currentStatus = item.serverStatus

        if (currentStatus === "available") {
            const selectPayload =
                await executeTaskMutation(
                    SELECT_DAILY_TASK_MUTATION,
                    {
                        daily_task_id: item.id
                    },
                    "selectDailyTask"
                )

            currentStatus =
                selectPayload.child_daily_task?.status ||
                "selected"
        }

        if (
            currentStatus !== "completed" &&
            currentStatus !== "reward_claimed"
        ) {
            const completePayload =
                await executeTaskMutation(
                    COMPLETE_DAILY_TASK_MUTATION,
                    {
                        daily_task_id: item.id
                    },
                    "completeDailyTask"
                )

            currentStatus =
                completePayload.child_daily_task?.status ||
                "completed"
        }

        updateDailyTaskStatus(
            item.id,
            mapServerStatusToClientStatus(currentStatus),
            currentStatus
        )
    } catch (error) {
        console.error(
            "COMPLETE DAILY TASK ERROR:",
            error
        )

        setErr(
            error.message ||
            "Не удалось выполнить задание"
        )
    } finally {
        setProcessingTaskId(null)
    }
}

async function takeReward(item, activeType) {
    if (
        processingTaskId ||
        activeType !== "everyday"
    ) {
        return
    }

    const requestId = `${activeType}-${item.id}`

    setProcessingTaskId(requestId)
    setErr(null)

    try {
        await executeTaskMutation(
            CLAIM_DAILY_TASK_REWARD_MUTATION,
            {
                daily_task_id: item.id
            },
            "claimDailyTaskReward"
        )

        updateDailyTaskStatus(
            item.id,
            "done",
            "reward_claimed"
        )
    } catch (error) {
        console.error(
            "CLAIM DAILY TASK REWARD ERROR:",
            error
        )

        setErr(
            error.message ||
            "Не удалось получить награду"
        )
    } finally {
        setProcessingTaskId(null)
    }
}

    return (
        <div className={styles.missionPageWrapper}>
            <div className={styles.missionPage}>
                <div className={styles.menuWrapprt}>
                    {/* <Menu 
                        itemOne={menuItem.itemOne} 
                        itemTwo={menuItem.itemTwo}
                        isActive={isActive}
                        setIsActive={setIsActive}
                    /> */}
                </div>

                {err && (
                    <div>
                        {err}
                    </div>
                )}

                <div className={styles.contentWrapper}>
                    <div className={styles.content}>
                        <div className={styles.headerWrapper}>
                            <ContentHeader 
                                selectValue={selectValue}
                                setSelectValue={setSelectValue}
                                firstData={isActive === "everyday" ? dailyTasks : challengeTasks}
                                challengeTasks={challengeTasks}
                            />
                        </div>

                        <div className={styles.bodyWrapper}>
                            <div className={styles.body}>
                                <ContentBody
                                    type="mission"
                                    selectValue={selectValue}
                                    firstData={dailyTasks}
                                    secondData={challengeTasks}
                                    isActive={isActive}
                                    onSelectDailyTask={selectDailyTask}
                                    onFulfill={fulfillTask}
                                    onTakeReward={takeReward}
                                    processingTaskId={processingTaskId}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}