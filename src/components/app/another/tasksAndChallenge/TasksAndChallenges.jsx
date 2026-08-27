

// "use client"

// import { GRAPHQL_URL } from "@/config/publicEnv"

// import { useEffect, useState } from "react"
// import styles from "./TasksAndChallenges.module.css"
// import iconsTasks from "../../../../../public/iconsTasks/iconsTasks"
// import Header from "./header/Header"
// import ProgressLine from "./progressLine/ProgressLine"
// import Content from "./contentTask/Content"

// const TASKS_AND_CHALLENGES_QUERY = `
//   query TasksAndChallengesData {
//     availableDailyTasks(page: 1, per_page: 50) {
//       data {
//         id
//         title
//         short_description
//         description
//         reward_xp
//         reward_coins
//         category {
//           id
//           slug
//           title
//           order_column
//         }
//       }
//     }

//     selectedDailyTasks(page: 1, per_page: 50) {
//       data {
//         status
//         completed_at
//         reward_claimed_at
//         daily_task {
//           id
//           title
//           short_description
//           description
//           reward_xp
//           reward_coins
//           category {
//             id
//             slug
//             title
//             order_column
//           }
//         }
//       }
//     }

//     availableChallenges(page: 1, per_page: 50) {
//       data {
//         id
//         title
//         short_description
//         description
//         reward_xp
//         reward_coins
//         duration_days
//         category {
//           id
//           slug
//           title
//           order_column
//         }
//       }
//     }

//     selectedChallenges(page: 1, per_page: 50) {
//       data {
//         status
//         progress_days
//         completed_at
//         reward_claimed_at
//         challenge {
//           id
//           title
//           short_description
//           description
//           reward_xp
//           reward_coins
//           duration_days
//           category {
//             id
//             slug
//             title
//             order_column
//           }
//         }
//       }
//     }
//   }
// `


// const MUTATION_ERRORS = `
//     errors {
//         __typename

//         ... on ValidationError {
//             message
//             fields {
//                 field
//                 messages
//             }
//         }

//         ... on RateLimitError {
//             message
//             retryAfter
//         }

//         ... on InvalidActionError {
//             message
//         }
//     }
// `

// const SELECT_DAILY_TASK_MUTATION = `
//     mutation SelectDailyTask($daily_task_id: String!) {
//         selectDailyTask(daily_task_id: $daily_task_id) {
//             success
//             ${MUTATION_ERRORS}

//             child_daily_task {
//                 daily_task_id
//                 status
//                 completed_at
//                 reward_claimed_at
//             }
//         }
//     }
// `

// const COMPLETE_DAILY_TASK_MUTATION = `
//     mutation CompleteDailyTask($daily_task_id: String!) {
//         completeDailyTask(daily_task_id: $daily_task_id) {
//             success
//             ${MUTATION_ERRORS}

//             child_daily_task {
//                 daily_task_id
//                 status
//                 completed_at
//                 reward_claimed_at
//             }
//         }
//     }
// `

// const SELECT_CHALLENGE_MUTATION = `
//     mutation SelectChallenge($challenge_id: String!) {
//         selectChallenge(challenge_id: $challenge_id) {
//             success
//             ${MUTATION_ERRORS}

//             child_challenge {
//                 challenge_id
//                 status
//                 progress_days
//                 completed_at
//                 reward_claimed_at
//             }
//         }
//     }
// `

// const START_CHALLENGE_MUTATION = `
//     mutation StartChallenge($challenge_id: String!) {
//         startChallenge(challenge_id: $challenge_id) {
//             success
//             ${MUTATION_ERRORS}

//             child_challenge {
//                 challenge_id
//                 status
//                 progress_days
//                 completed_at
//                 reward_claimed_at
//             }
//         }
//     }
// `

// const PROGRESS_CHALLENGE_MUTATION = `
//     mutation ProgressChallenge($challenge_id: String!) {
//         progressChallenge(challenge_id: $challenge_id) {
//             success
//             ${MUTATION_ERRORS}

//             child_challenge {
//                 challenge_id
//                 status
//                 progress_days
//                 completed_at
//                 reward_claimed_at
//             }
//         }
//     }
// `

// const CLAIM_DAILY_TASK_REWARD_MUTATION = `
//     mutation ClaimDailyTaskReward($daily_task_id: String!) {
//         claimDailyTaskReward(daily_task_id: $daily_task_id) {
//             success
//             ${MUTATION_ERRORS}
//         }
//     }
// `

// const CLAIM_CHALLENGE_REWARD_MUTATION = `
//     mutation ClaimChallengeReward($challenge_id: String!) {
//         claimChallengeReward(challenge_id: $challenge_id) {
//             success
//             ${MUTATION_ERRORS}
//         }
//     }
// `

// function getIconByCategory(slug) {
//     if (slug === "hygiene") {
//         return iconsTasks.brushTeeth
//     }

//     if (slug === "order") {
//         return iconsTasks.hand
//     }

//     if (slug === "food") {
//         return iconsTasks.hand
//     }

//     if (slug === "study") {
//         return iconsTasks.hairbrush
//     }

//     return iconsTasks.brushTeeth
// }

// function mapServerStatusToClientStatus(status) {
//     if (status === "completed") {
//         return "take"
//     }

//     if (status === "reward_claimed") {
//         return "done"
//     }

//     return "fulfill"
// }

// function createEmptyGroups() {
//     return {
//         hygiene: {
//             name: "Гигиена",
//             items: []
//         },

//         order: {
//             name: "Порядок",
//             items: []
//         },

//         food: {
//             name: "Еда",
//             items: []
//         },

//         study: {
//             name: "Учеба",
//             items: []
//         }
//     }
// }



// function addItemToGroup(
//     groups,
//     task,
//     status = "fulfill",
//     serverStatus = "available"
// ) {
//     const categorySlug = task?.category?.slug || "hygiene"
//     const categoryName = task?.category?.title || "Без категории"

//     if (!groups[categorySlug]) {
//         groups[categorySlug] = {
//             name: categoryName,
//             items: []
//         }
//     }

//     const taskData = {
//         id: task.id,
//         img: getIconByCategory(categorySlug),
//         title: task.title,
//         short: task.short_description || "",
//         description: task.description || "",
//         reward: {
//             coins: task.reward_coins || 0,
//             xp: task.reward_xp || 0
//         },
//         status,
//         serverStatus
//     }

//     const existingTaskIndex =
//         groups[categorySlug].items.findIndex(
//             item => item.id === task.id
//         )

//     if (existingTaskIndex !== -1) {
//         groups[categorySlug].items[existingTaskIndex] = {
//             ...groups[categorySlug].items[existingTaskIndex],
//             ...taskData
//         }

//         return
//     }

//     groups[categorySlug].items.push(taskData)
// }

// function prepareDailyTasks(data) {
//     const groups = createEmptyGroups()

//     const availableDailyTasks =
//         data?.availableDailyTasks?.data || []

//     const selectedDailyTasks =
//         data?.selectedDailyTasks?.data || []

//     const selectedTaskIds = new Set(
//         selectedDailyTasks
//             .map(item => item.daily_task?.id)
//             .filter(Boolean)
//     )

//     // availableDailyTasks.forEach((task) => {
//     //     if (selectedTaskIds.has(task.id)) {
//     //         return
//     //     }

//     //     addItemToGroup(
//     //         groups,
//     //         task,
//     //         "fulfill",
//     //         "available"
//     //     )
//     // })

//     // selectedDailyTasks.forEach((item) => {
//     //     if (!item.daily_task) {
//     //         return
//     //     }

//     //     addItemToGroup(
//     //         groups,
//     //         item.daily_task,
//     //         mapServerStatusToClientStatus(item.status),
//     //         item.status
//     //     )
//     // })

//     availableDailyTasks.forEach((task) => {
//     addItemToGroup(
//         groups,
//         task,
//         "fulfill",
//         "available"
//     )
// })

// selectedDailyTasks.forEach((item) => {
//     if (!item.daily_task) {
//         return
//     }

//     addItemToGroup(
//         groups,
//         item.daily_task,
//         mapServerStatusToClientStatus(item.status),
//         item.status
//     )
// })

//     return groups
// }



// function prepareChallengeTasks(data) {
//     const groups = createEmptyGroups()

//     const availableChallenges =
//         data?.availableChallenges?.data || []

//     const selectedChallenges =
//         data?.selectedChallenges?.data || []

//     const selectedChallengeIds = new Set(
//         selectedChallenges
//             .map(item => item.challenge?.id)
//             .filter(Boolean)
//     )

//     // availableChallenges.forEach((challenge) => {
//     //     if (selectedChallengeIds.has(challenge.id)) {
//     //         return
//     //     }

//     //     addItemToGroup(
//     //         groups,
//     //         challenge,
//     //         "fulfill",
//     //         "available"
//     //     )
//     // })

//     // selectedChallenges.forEach((item) => {
//     //     if (!item.challenge) {
//     //         return
//     //     }

//     //     addItemToGroup(
//     //         groups,
//     //         item.challenge,
//     //         mapServerStatusToClientStatus(item.status),
//     //         item.status
//     //     )
//     // })

//     availableChallenges.forEach((challenge) => {
//     addItemToGroup(
//         groups,
//         challenge,
//         "fulfill",
//         "available"
//     )
// })

// selectedChallenges.forEach((item) => {
//     if (!item.challenge) {
//         return
//     }

//     addItemToGroup(
//         groups,
//         item.challenge,
//         mapServerStatusToClientStatus(item.status),
//         item.status
//     )
// })

//     return groups
// }

// function ShowContent({
//     title,
//     flags,
//     dailyTasks,
//     challengeTasks,
//     onFulfill,
//     onTakeReward,
//     processingTaskId
// }) {
//     if (!dailyTasks) return

//     if (title === "Ежедневные задания") {
//         return flags.tasks && (
//             <div className={styles.body}>
//                 <ProgressLine />

//                 <div className={styles.contentWrapper}>
//                     <Content
//                         firstData={dailyTasks}
//                         secondData={challengeTasks}
//                         isActive={"everyday"}
//                         onFulfill={onFulfill}
//                         onTakeReward={onTakeReward}
//                         processingTaskId={processingTaskId}

//                     />
//                 </div>
//             </div>
//         )
//     } else if (title === "Челенджи") {
//         return flags.challenge && (
//             <div className={styles.body}>
//                 <ProgressLine />

//                 <div className={styles.contentWrapper}>
//                     <Content
//                         firstData={dailyTasks}
//                         secondData={challengeTasks}
//                         isActive={"challenge"}
//                         onFulfill={onFulfill}
//                         onTakeReward={onTakeReward}
//                         processingTaskId={processingTaskId}

//                     />
//                 </div>
//             </div>
//         )
//     }
// }

// function Wrapper({
//     title,
//     flags,
//     setFlags,
//     dailyTasks,
//     challengeTasks,
//     onFulfill,
//     onTakeReward,
//     processingTaskId
// }) {
//     return (
//         <>
//             <Header
//                 title={title}
//                 flags={flags}
//                 setFlags={setFlags}
//             />

//             {ShowContent({
//                 title,
//     flags,
//     dailyTasks,
//     challengeTasks,
//     onFulfill,
//     onTakeReward,
//     processingTaskId

//             })}
//         </>
//     )
// }

// export default function TasksAndChallenges() {
//     const [flags, setFlags] = useState({
//         tasks: true,
//         challenge: false
//     })

//     const [dailyTasks, setDailyTasks] = useState(null)
//     const [challengeTasks, setChallengeTasks] = useState(null)
//     const [err, setErr] = useState(null)


//     const [serverTasksData, setServerTasksData] = useState(null)

//     const [processingTaskId, setProcessingTaskId] =
//         useState(null)

//     useEffect(() => {
//         async function getTasksAndChallenges() {
//             const accessToken =
//                 localStorage.getItem("access_token")

//             if (!accessToken) {
//                 setErr("Нет токена авторизации")
//                 return
//             }

//             try {
//                 const response = await fetch(GRAPHQL_URL, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Bearer ${accessToken}`
//                     },
//                     body: JSON.stringify({
//                         query: TASKS_AND_CHALLENGES_QUERY
//                     })
//                 })

//                 const result = await response.json()
//                 setServerTasksData(result.data || null)
//                 if (result.errors?.length && !result.data) {
//                     setErr(result.errors[0].message)
//                     return
//                 }

//                 setDailyTasks(
//                     prepareDailyTasks(result.data)
//                 )

//                 setChallengeTasks(
//                     prepareChallengeTasks(result.data)
//                 )

//             } catch (error) {
//                 setErr(
//                     "Ошибка загрузки заданий и челленджей"
//                 )
//             }
//         }

//         getTasksAndChallenges()
//     }, [])

//     function getPayloadErrorMessage(payload) {
//         const firstError = payload?.errors?.[0]

//         if (!firstError) {
//             return "Не удалось выполнить действие"
//         }

//         if (firstError.fields?.length) {
//             return firstError.fields
//                 .flatMap(field => field.messages || [])
//                 .join(", ")
//         }

//         return firstError.message ||
//             "Не удалось выполнить действие"
//     }

//     async function executeTaskMutation(
//         query,
//         variables,
//         operationName
//     ) {
//         const accessToken =
//             localStorage.getItem("access_token")

//         if (!accessToken) {
//             throw new Error("Нет токена авторизации")
//         }

//         const response = await fetch(GRAPHQL_URL, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${accessToken}`
//             },
//             body: JSON.stringify({
//                 query,
//                 variables
//             })
//         })

//         const result = await response.json()

//         console.log(`${operationName} RESULT:`, result)

//         if (!response.ok) {
//             throw new Error(
//                 result?.message ||
//                 `Ошибка запроса: ${response.status}`
//             )
//         }

//         if (result.errors?.length) {
//             throw new Error(result.errors[0].message)
//         }

//         const payload = result.data?.[operationName]

//         if (!payload) {
//             throw new Error(
//                 `Сервер не вернул ${operationName}`
//             )
//         }

//         if (!payload.success) {
//             throw new Error(
//                 getPayloadErrorMessage(payload)
//             )
//         }

//         return payload
//     }

//     function updateTaskStatus(
//         setTasks,
//         taskId,
//         clientStatus,
//         serverStatus
//     ) {
//         setTasks(previousTasks => {
//             if (!previousTasks) {
//                 return previousTasks
//             }

//             const updatedTasks = {}

//             Object.entries(previousTasks).forEach(
//                 ([categorySlug, group]) => {
//                     updatedTasks[categorySlug] = {
//                         ...group,

//                         items: group.items.map(item => {
//                             if (item.id !== taskId) {
//                                 return item
//                             }

//                             return {
//                                 ...item,
//                                 status: clientStatus,
//                                 serverStatus
//                             }
//                         })
//                     }
//                 }
//             )

//             return updatedTasks
//         })
//     }

//     async function fulfillDailyTask(item) {
//         let currentStatus = item.serverStatus

//         if (currentStatus === "available") {
//             const selectPayload =
//                 await executeTaskMutation(
//                     SELECT_DAILY_TASK_MUTATION,
//                     {
//                         daily_task_id: item.id
//                     },
//                     "selectDailyTask"
//                 )

//             currentStatus =
//                 selectPayload
//                     .child_daily_task
//                     ?.status || "selected"
//         }

//         if (
//             currentStatus !== "completed" &&
//             currentStatus !== "reward_claimed"
//         ) {
//             const completePayload =
//                 await executeTaskMutation(
//                     COMPLETE_DAILY_TASK_MUTATION,
//                     {
//                         daily_task_id: item.id
//                     },
//                     "completeDailyTask"
//                 )

//             currentStatus =
//                 completePayload
//                     .child_daily_task
//                     ?.status || "completed"
//         }

//         updateTaskStatus(
//             setDailyTasks,
//             item.id,
//             mapServerStatusToClientStatus(currentStatus),
//             currentStatus
//         )
//     }

//     async function fulfillChallenge(item) {
//         let currentStatus = item.serverStatus

//         if (currentStatus === "available") {
//             const selectPayload =
//                 await executeTaskMutation(
//                     SELECT_CHALLENGE_MUTATION,
//                     {
//                         challenge_id: item.id
//                     },
//                     "selectChallenge"
//                 )

//             currentStatus =
//                 selectPayload
//                     .child_challenge
//                     ?.status || "selected"
//         }

//         if (currentStatus === "selected") {
//             const startPayload =
//                 await executeTaskMutation(
//                     START_CHALLENGE_MUTATION,
//                     {
//                         challenge_id: item.id
//                     },
//                     "startChallenge"
//                 )

//             currentStatus =
//                 startPayload
//                     .child_challenge
//                     ?.status || "active"
//         }

//         if (currentStatus === "active") {
//             const progressPayload =
//                 await executeTaskMutation(
//                     PROGRESS_CHALLENGE_MUTATION,
//                     {
//                         challenge_id: item.id
//                     },
//                     "progressChallenge"
//                 )

//             currentStatus =
//                 progressPayload
//                     .child_challenge
//                     ?.status || "active"
//         }

//         updateTaskStatus(
//             setChallengeTasks,
//             item.id,
//             mapServerStatusToClientStatus(currentStatus),
//             currentStatus
//         )
//     }

//     async function fulfillTask(item, activeType) {
//         if (processingTaskId) {
//             return
//         }

//         const requestId = `${activeType}-${item.id}`

//         console.log("FULFILL TASK REQUEST ID:", item.id)

//         setProcessingTaskId(requestId)
//         setErr(null)

//         try {
//             if (activeType === "everyday") {
//                 await fulfillDailyTask(item)
//             } else {
//                 await fulfillChallenge(item)
//             }
//         } catch (error) {
//             console.error("FULFILL TASK ERROR:", error)

//             setErr(
//                 error.message ||
//                 "Не удалось выполнить задание"
//             )
//         } finally {
//             setProcessingTaskId(null)
//         }
//     }

//     async function takeReward(item, activeType) {
//     if (processingTaskId) {
//         return
//     }

//     const requestId = `${activeType}-${item.id}`

//     setProcessingTaskId(requestId)
//     setErr(null)

//     try {
//         if (activeType === "everyday") {
//             await executeTaskMutation(
//                 CLAIM_DAILY_TASK_REWARD_MUTATION,
//                 {
//                     daily_task_id: item.id
//                 },
//                 "claimDailyTaskReward"
//             )

//             updateTaskStatus(
//                 setDailyTasks,
//                 item.id,
//                 "done",
//                 "reward_claimed"
//             )
//         } else {
//             await executeTaskMutation(
//                 CLAIM_CHALLENGE_REWARD_MUTATION,
//                 {
//                     challenge_id: item.id
//                 },
//                 "claimChallengeReward"
//             )

//             updateTaskStatus(
//                 setChallengeTasks,
//                 item.id,
//                 "done",
//                 "reward_claimed"
//             )
//         }
//     } catch (error) {
//         console.error("CLAIM REWARD ERROR:", error)

//         setErr(
//             error.message ||
//             "Не удалось получить награду"
//         )
//     } finally {
//         setProcessingTaskId(null)
//     }


// }

//     return (
//         <div className={styles.tasksAndChallengesWrapper}>
//             <div className={styles.tasksAndChallenges}>
                

//                 {err && (
//                     <div>
//                         {err}
//                     </div>
//                 )}

//                 <div className={styles.main}>
//                     <Wrapper
//                         title={"Ежедневные задания"}
//                         flags={flags}
//                         setFlags={setFlags}
//                         dailyTasks={dailyTasks}
//                         challengeTasks={challengeTasks}
//                         onFulfill={fulfillTask}
//                         onTakeReward={takeReward}
//                         processingTaskId={processingTaskId}

//                     />

//                     {/* <Wrapper
//                         title={"Челенджи"}
//     flags={flags}
//     setFlags={setFlags}
//     dailyTasks={dailyTasks}
//     challengeTasks={challengeTasks}
//     onFulfill={fulfillTask}
//     onTakeReward={takeReward}
//     processingTaskId={processingTaskId}

//                     /> */}
//                 </div>

//             </div>
//         </div>
//     )
// }




"use client"
import { GRAPHQL_URL } from "@/config/publicEnv"
import { useEffect, useState } from "react"
import styles from "./TasksAndChallenges.module.css"
import iconsTasks from "../../../../../public/iconsTasks/iconsTasks"
import Header from "./header/Header"
import ProgressLine from "./progressLine/ProgressLine"
import Content from "./contentTask/Content"

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

// const MUTATION_ERRORS = `
//     errors {
//         __typename

//         ... on ValidationError {
//             message
//             fields {
//                 field
//                 messages
//             }
//         }

//         ... on UserError {
//             field
//             message
//         }

//         ... on RateLimitError {
//             message
//             retryAfter
//         }

//         ... on InvalidActionError {
//             message
//         }
//     }
// `

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

const SELECT_CHALLENGE_MUTATION = `
    mutation SelectChallenge($challenge_id: String!) {
        selectChallenge(challenge_id: $challenge_id) {
            success
            ${MUTATION_ERRORS}

            child_challenge {
                challenge_id
                status
                progress_days
                completed_at
                reward_claimed_at
            }
        }
    }
`

const START_CHALLENGE_MUTATION = `
    mutation StartChallenge($challenge_id: String!) {
        startChallenge(challenge_id: $challenge_id) {
            success
            ${MUTATION_ERRORS}

            child_challenge {
                challenge_id
                status
                progress_days
                completed_at
                reward_claimed_at
            }
        }
    }
`

const PROGRESS_CHALLENGE_MUTATION = `
    mutation ProgressChallenge($challenge_id: String!) {
        progressChallenge(challenge_id: $challenge_id) {
            success
            ${MUTATION_ERRORS}

            child_challenge {
                challenge_id
                status
                progress_days
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

const CLAIM_CHALLENGE_REWARD_MUTATION = `
    mutation ClaimChallengeReward($challenge_id: String!) {
        claimChallengeReward(challenge_id: $challenge_id) {
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

// function addItemToGroup(
//     groups,
//     task,
//     status = "fulfill",
//     serverStatus = "available"
// ) {
//     const categorySlug = task?.category?.slug || "hygiene"
//     const categoryName = task?.category?.title || "Без категории"

//     if (!groups[categorySlug]) {
//         groups[categorySlug] = {
//             name: categoryName,
//             items: []
//         }
//     }

//     groups[categorySlug].items.push({
//         id: task.id,
//         img: getIconByCategory(categorySlug),
//         title: task.title,
//         short: task.short_description || "",
//         description: task.description || "",
//         reward: {
//             coins: task.reward_coins || 0,
//             xp: task.reward_xp || 0
//         },
//         status,
//         serverStatus
//     })
// }

// function prepareDailyTasks(data) {
//     const groups = createEmptyGroups()

//     const availableDailyTasks =
//         data?.availableDailyTasks?.data || []

//     const selectedDailyTasks =
//         data?.selectedDailyTasks?.data || []

//     availableDailyTasks.forEach((task) => {
//         addItemToGroup(
//             groups,
//             task,
//             "fulfill",
//             "available"
//         )
//     })

//     selectedDailyTasks.forEach((item) => {
//         if (!item.daily_task) {
//             return
//         }

//         addItemToGroup(
//             groups,
//             item.daily_task,
//             mapServerStatusToClientStatus(item.status),
//             item.status
//         )
//     })

//     return groups
// }


function addItemToGroup(
    groups,
    task,
    status = "fulfill",
    serverStatus = "available"
) {
    const categorySlug = task?.category?.slug || "hygiene"
    const categoryName = task?.category?.title || "Без категории"

    if (!groups[categorySlug]) {
        groups[categorySlug] = {
            name: categoryName,
            items: []
        }
    }

    const taskData = {
        id: task.id,
        img: getIconByCategory(categorySlug),
        title: task.title,
        short: task.short_description || "",
        description: task.description || "",
        reward: {
            coins: task.reward_coins || 0,
            xp: task.reward_xp || 0
        },
        status,
        serverStatus
    }

    const existingTaskIndex =
        groups[categorySlug].items.findIndex(
            item => item.id === task.id
        )

    if (existingTaskIndex !== -1) {
        groups[categorySlug].items[existingTaskIndex] = {
            ...groups[categorySlug].items[existingTaskIndex],
            ...taskData
        }

        return
    }

    groups[categorySlug].items.push(taskData)
}

function prepareDailyTasks(data) {
    const groups = createEmptyGroups()

    const availableDailyTasks =
        data?.availableDailyTasks?.data || []

    const selectedDailyTasks =
        data?.selectedDailyTasks?.data || []

    const selectedTaskIds = new Set(
        selectedDailyTasks
            .map(item => item.daily_task?.id)
            .filter(Boolean)
    )

    // availableDailyTasks.forEach((task) => {
    //     if (selectedTaskIds.has(task.id)) {
    //         return
    //     }

    //     addItemToGroup(
    //         groups,
    //         task,
    //         "fulfill",
    //         "available"
    //     )
    // })

    // selectedDailyTasks.forEach((item) => {
    //     if (!item.daily_task) {
    //         return
    //     }

    //     addItemToGroup(
    //         groups,
    //         item.daily_task,
    //         mapServerStatusToClientStatus(item.status),
    //         item.status
    //     )
    // })

    availableDailyTasks.forEach((task) => {
    addItemToGroup(
        groups,
        task,
        "fulfill",
        "available"
    )
})

selectedDailyTasks.forEach((item) => {
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

    const availableChallenges =
        data?.availableChallenges?.data || []

    const selectedChallenges =
        data?.selectedChallenges?.data || []

    const selectedChallengeIds = new Set(
        selectedChallenges
            .map(item => item.challenge?.id)
            .filter(Boolean)
    )

    // availableChallenges.forEach((challenge) => {
    //     if (selectedChallengeIds.has(challenge.id)) {
    //         return
    //     }

    //     addItemToGroup(
    //         groups,
    //         challenge,
    //         "fulfill",
    //         "available"
    //     )
    // })

    // selectedChallenges.forEach((item) => {
    //     if (!item.challenge) {
    //         return
    //     }

    //     addItemToGroup(
    //         groups,
    //         item.challenge,
    //         mapServerStatusToClientStatus(item.status),
    //         item.status
    //     )
    // })

    availableChallenges.forEach((challenge) => {
    addItemToGroup(
        groups,
        challenge,
        "fulfill",
        "available"
    )
})

selectedChallenges.forEach((item) => {
    if (!item.challenge) {
        return
    }

    addItemToGroup(
        groups,
        item.challenge,
        mapServerStatusToClientStatus(item.status),
        item.status
    )
})

    return groups
}

function ShowContent({
    title,
    flags,
    dailyTasks,
    challengeTasks,
    onSelectDailyTask,
    onFulfill,
    onTakeReward,
    processingTaskId
}) {
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
                        onSelectDailyTask={onSelectDailyTask}
                        onFulfill={onFulfill}
                        onTakeReward={onTakeReward}
                        processingTaskId={processingTaskId}

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
                        onSelectDailyTask={onSelectDailyTask}
                        onFulfill={onFulfill}
                        onTakeReward={onTakeReward}
                        processingTaskId={processingTaskId}

                    />
                </div>
            </div>
        )
    }
}

function Wrapper({
    title,
    flags,
    setFlags,
    dailyTasks,
    challengeTasks,
    onSelectDailyTask,
    onFulfill,
    onTakeReward,
    processingTaskId
}) {
    return (
        <>
            <Header
                title={title}
                flags={flags}
                setFlags={setFlags}
            />

            {ShowContent({
                title,
    flags,
    dailyTasks,
    challengeTasks,
    onSelectDailyTask,
    onFulfill,
    onTakeReward,
    processingTaskId

            })}
        </>
    )
}

export default function TasksAndChallenges() {
    const [flags, setFlags] = useState({
        tasks: true,
        challenge: false
    })

    const [dailyTasks, setDailyTasks] = useState(null)
    const [challengeTasks, setChallengeTasks] = useState(null)
    const [err, setErr] = useState(null)


    const [serverTasksData, setServerTasksData] = useState(null)

    const [processingTaskId, setProcessingTaskId] =
        useState(null)

    useEffect(() => {
        async function getTasksAndChallenges() {
            const accessToken =
                localStorage.getItem("access_token")

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
                setServerTasksData(result.data || null)
                if (result.errors?.length && !result.data) {
                    setErr(result.errors[0].message)
                    return
                }

                setDailyTasks(
                    prepareDailyTasks(result.data)
                )

                setChallengeTasks(
                    prepareChallengeTasks(result.data)
                )

            } catch (error) {
                setErr(
                    "Ошибка загрузки заданий и челленджей"
                )
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

        console.log(`${operationName} RESULT:`, result)

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

    function updateTaskStatus(
        setTasks,
        taskId,
        clientStatus,
        serverStatus
    ) {
        setTasks(previousTasks => {
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

            updateTaskStatus(
                setDailyTasks,
                item.id,
                mapServerStatusToClientStatus(currentStatus),
                currentStatus
            )
        } catch (error) {
            console.error("SELECT DAILY TASK ERROR:", error)

            setErr(
                error.message ||
                "Не удалось загрузить задание"
            )
        } finally {
            setProcessingTaskId(null)
        }
    }

    async function fulfillDailyTask(item) {
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
                selectPayload
                    .child_daily_task
                    ?.status || "selected"
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
                completePayload
                    .child_daily_task
                    ?.status || "completed"
        }

        updateTaskStatus(
            setDailyTasks,
            item.id,
            mapServerStatusToClientStatus(currentStatus),
            currentStatus
        )
    }

    async function fulfillChallenge(item) {
        let currentStatus = item.serverStatus

        if (currentStatus === "available") {
            const selectPayload =
                await executeTaskMutation(
                    SELECT_CHALLENGE_MUTATION,
                    {
                        challenge_id: item.id
                    },
                    "selectChallenge"
                )

            currentStatus =
                selectPayload
                    .child_challenge
                    ?.status || "selected"
        }

        if (currentStatus === "selected") {
            const startPayload =
                await executeTaskMutation(
                    START_CHALLENGE_MUTATION,
                    {
                        challenge_id: item.id
                    },
                    "startChallenge"
                )

            currentStatus =
                startPayload
                    .child_challenge
                    ?.status || "active"
        }

        if (currentStatus === "active") {
            const progressPayload =
                await executeTaskMutation(
                    PROGRESS_CHALLENGE_MUTATION,
                    {
                        challenge_id: item.id
                    },
                    "progressChallenge"
                )

            currentStatus =
                progressPayload
                    .child_challenge
                    ?.status || "active"
        }

        updateTaskStatus(
            setChallengeTasks,
            item.id,
            mapServerStatusToClientStatus(currentStatus),
            currentStatus
        )
    }

    async function fulfillTask(item, activeType) {
        if (processingTaskId) {
            return
        }

        const requestId = `${activeType}-${item.id}`

        console.log("FULFILL TASK REQUEST ID:", item.id)

        setProcessingTaskId(requestId)
        setErr(null)

        try {
            if (activeType === "everyday") {
                await fulfillDailyTask(item)
            } else {
                await fulfillChallenge(item)
            }
        } catch (error) {
            console.error("FULFILL TASK ERROR:", error)

            setErr(
                error.message ||
                "Не удалось выполнить задание"
            )
        } finally {
            setProcessingTaskId(null)
        }
    }

    async function takeReward(item, activeType) {
    if (processingTaskId) {
        return
    }

    const requestId = `${activeType}-${item.id}`

    setProcessingTaskId(requestId)
    setErr(null)

    try {
        if (activeType === "everyday") {
            await executeTaskMutation(
                CLAIM_DAILY_TASK_REWARD_MUTATION,
                {
                    daily_task_id: item.id
                },
                "claimDailyTaskReward"
            )

            updateTaskStatus(
                setDailyTasks,
                item.id,
                "done",
                "reward_claimed"
            )
        } else {
            await executeTaskMutation(
                CLAIM_CHALLENGE_REWARD_MUTATION,
                {
                    challenge_id: item.id
                },
                "claimChallengeReward"
            )

            updateTaskStatus(
                setChallengeTasks,
                item.id,
                "done",
                "reward_claimed"
            )
        }
    } catch (error) {
        console.error("CLAIM REWARD ERROR:", error)

        setErr(
            error.message ||
            "Не удалось получить награду"
        )
    } finally {
        setProcessingTaskId(null)
    }


}

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
                        onSelectDailyTask={selectDailyTask}
                        onFulfill={fulfillTask}
                        onTakeReward={takeReward}
                        processingTaskId={processingTaskId}

                    />

                    {/* <Wrapper
                        title={"Челенджи"}
    flags={flags}
    setFlags={setFlags}
    dailyTasks={dailyTasks}
    challengeTasks={challengeTasks}
    onFulfill={fulfillTask}
    onTakeReward={takeReward}
    processingTaskId={processingTaskId}

                    /> */}
                </div>

            </div>
        </div>
    )
}
