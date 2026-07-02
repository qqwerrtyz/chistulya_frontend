"use client"

import { useEffect, useState } from "react"
import styles from "./../another/tasksAndChallenge/TasksAndChallenges.module.css"
// import iconsTasks from "../../../../../public/iconsTasks/iconsTasks"
// import Header from "./header/Header"
// import ProgressLine from "./progressLine/ProgressLine"
// import Content from "./contentTask/Content"
import iconsTasks from "../../../../public/iconsTasks/iconsTasks"
import Header from "../another/tasksAndChallenge/header/Header"
import ProgressLine from "../another/tasksAndChallenge/progressLine/ProgressLine"
import Content from "../another/tasksAndChallenge/contentTask/Content"

const TASKS_AND_CHALLENGES_QUERY = `
  query TasksAndChallengesData($child_id: String) {
    availableDailyTasks(child_id: $child_id, page: 1, per_page: 50) {
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

    selectedDailyTasks(child_id: $child_id, page: 1, per_page: 50) {
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

    availableChallenges(child_id: $child_id, page: 1, per_page: 50) {
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

    selectedChallenges(child_id: $child_id, page: 1, per_page: 50) {
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

function addItemToGroup(groups, task, status = "fulfill") {
    const categorySlug = task?.category?.slug || "hygiene"
    const categoryName = task?.category?.title || "Без категории"

    if (!groups[categorySlug]) {
        groups[categorySlug] = {
            name: categoryName,
            items: []
        }
    }

    groups[categorySlug].items.push({
        id: task.id,
        img: getIconByCategory(categorySlug),
        title: task.title,
        short: task.short_description || "",
        description: task.description || "",
        reward: {
            coins: task.reward_coins || 0,
            xp: task.reward_xp || 0
        },
        status: status
    })
}

function prepareDailyTasks(data) {
    const groups = createEmptyGroups()

    const availableDailyTasks = data?.availableDailyTasks?.data || []
    const selectedDailyTasks = data?.selectedDailyTasks?.data || []

    availableDailyTasks.forEach((task) => {
        addItemToGroup(groups, task, "fulfill")
    })

    selectedDailyTasks.forEach((item) => {
        if (!item.daily_task) {
            return
        }

        addItemToGroup(
            groups,
            item.daily_task,
            mapServerStatusToClientStatus(item.status)
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

function ShowContent ({title, flags, dailyTasks, challengeTasks}) {
    if (!dailyTasks) return

    if (title === "Ежедневные задания") {
        return flags.tasks && (
            <div className={styles.body}>
                
                <ProgressLine />

                <div className={styles.contentWrapper}>

                    <Content 
                        firstData={dailyTasks} 
                        secondData={challengeTasks}
                        isActive={"everyday"}
                    />
                </div>
            </div>
        )
    } else if (title === "Челенджи") {
        return flags.challenge && (
            <div className={styles.body}>
                
                <ProgressLine />

                <div className={styles.contentWrapper}>
                    <Content 
                        firstData={dailyTasks} 
                        secondData={challengeTasks}
                        isActive={"challenge"}
                    />
                </div>
            </div>
        )
    }
}


function Wrapper({title, flags, setFlags, dailyTasks, challengeTasks}) {
    return (
        <>
        
            <Header
                title={title} 
                flags={flags} 
                setFlags={setFlags}
            />

            {ShowContent({title, flags, dailyTasks, challengeTasks})}
            
        </>
    )
}


export default function TaskAndChallengesParent({childId, requestDelay = 0}) {
    const [flags, setFlags] = useState({
        tasks: true,
        challenge: false
    })

    const [dailyTasks, setDailyTasks] = useState(null)
    const [challengeTasks, setChallengeTasks] = useState(null)
    const [err, setErr] = useState(null)
    useEffect(() => {
    async function getTasksAndChallenges() {
        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
            setErr("Нет токена авторизации")
            return
        }

        try {
            const response = await fetch("/api/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    query: TASKS_AND_CHALLENGES_QUERY,
                    variables: {
                        child_id: childId
                    }
                })
            })

            const result = await response.json()

            if (result.errors?.length && !result.data) {
                setErr(result.errors[0].message)
                return
            }

            setDailyTasks(prepareDailyTasks(result.data))
            setChallengeTasks(prepareChallengeTasks(result.data))

        } catch (error) {
            setErr("Ошибка загрузки заданий и челленджей")
        }
    }

    const timerId = setTimeout(() => {
        getTasksAndChallenges()
    }, requestDelay)

    return () => clearTimeout(timerId)
}, [childId, requestDelay])
    // useEffect(() => {
    //     async function getTasksAndChallenges() {
    //         const accessToken = localStorage.getItem("access_token")

    //         if (!accessToken) {
    //             setErr("Нет токена авторизации")
    //             return
    //         }

    //         try {
    //             const response = await fetch("/api/graphql", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${accessToken}`
    //                 },
    //                 body: JSON.stringify({
    //                     query: TASKS_AND_CHALLENGES_QUERY,
    //                     variables: {
    //                         child_id: childId
    //                     }
    //                 })
    //             })

    //             const result = await response.json()

    //             if (result.errors?.length && !result.data) {
    //                 setErr(result.errors[0].message)
    //                 return
    //             }

    //             setDailyTasks(prepareDailyTasks(result.data))
    //             setChallengeTasks(prepareChallengeTasks(result.data))

    //         } catch (error) {
    //             setErr("Ошибка загрузки заданий и челленджей")
    //         }
    //     }

    //     getTasksAndChallenges()
    // }, [childId])

    return (
        <div className={styles.tasksAndChallengesWrapper}>
            <div className={styles.tasksAndChallenges}>

                {err && (
                    <div>
                        {err}
                    </div>
                )}

                <div className={styles.main}>
                    <Wrapper 
                        title={"Ежедневные задания"} 
                        flags={flags} 
                        setFlags={setFlags}
                        dailyTasks={dailyTasks}
                        challengeTasks={challengeTasks}
                    />

                    <Wrapper 
                        title={"Челенджи"} 
                        flags={flags} 
                        setFlags={setFlags}
                        dailyTasks={dailyTasks}
                        challengeTasks={challengeTasks}
                    />
                </div>

            </div>
        </div>
    )
}