// "use client"

// import { useState } from "react"
// function logState(newState) {
//     console.log("CUSTOM TASK STATE:", newState)
// }
// const styles = {
//     customTaskWrapper: {
//         width: "100%",
//         display: "flex",
//         justifyContent: "center",
//         padding: "20px"
//     },

//     customTask: {
//         width: "420px",
//         display: "flex",
//         flexDirection: "column",
//         gap: "14px",
//         padding: "16px",
//         border: "1px solid #e5e5e5",
//         borderRadius: "12px",
//         backgroundColor: "#fff"
//     },

//     customTaskCategoryWrapper: {
//         display: "flex",
//         gap: "10px"
//     },

//     customTaskCategory: {
//         padding: "6px 10px",
//         border: "1px solid #d0d0d0",
//         borderRadius: "8px",
//         cursor: "pointer",
//         fontSize: "14px",
//         backgroundColor: "#f7f7f7"
//     },

//     customTaskSubCategoryWrapper: {
//         display: "flex",
//         flexWrap: "wrap",
//         gap: "8px"
//     },

//     customTaskSubCategory: {
//         padding: "6px 10px",
//         border: "1px solid #d0d0d0",
//         borderRadius: "8px",
//         cursor: "pointer",
//         fontSize: "13px",
//         backgroundColor: "#fafafa"
//     },

//     textWrapper: {
//         display: "flex",
//         flexDirection: "column",
//         gap: "8px"
//     },

//     input: {
//         padding: "8px 10px",
//         border: "1px solid #d0d0d0",
//         borderRadius: "8px",
//         outline: "none",
//         fontSize: "14px"
//     },

//     coinWrapper: {
//         display: "flex"
//     },

//     coin: {
//         width: "100%",
//         padding: "8px 10px",
//         border: "1px solid #d0d0d0",
//         borderRadius: "8px",
//         fontSize: "14px"
//     },

//     xpWrapper: {
//         display: "flex"
//     },

//     xp: {
//         width: "100%",
//         padding: "8px 10px",
//         border: "1px solid #d0d0d0",
//         borderRadius: "8px",
//         fontSize: "14px"
//     }
// }

// const CREATE_CUSTOM_DAILY_TASK_MUTATION = `
// mutation CreateCustomDailyTaskForChild(
//     $child_id: String!
//     $category_id: Int!
//     $title: String!
//     $short_description: String
//     $description: String
//     $reward_xp: Int
//     $reward_coins: Int
// ) {
//     createCustomDailyTaskForChild(
//         child_id: $child_id
//         category_id: $category_id
//         title: $title
//         short_description: $short_description
//         description: $description
//         reward_xp: $reward_xp
//         reward_coins: $reward_coins
//     ) {
//         success
//         errors {
//             __typename
//             ... on ValidationError {
//                 message
//                 fields {
//                     field
//                     messages
//                 }
//             }
//             ... on RateLimitError {
//                 message
//                 retryAfter
//             }
//             ... on InvalidActionError {
//                 message
//             }
//         }
//     }
// }
// `

// const TASK_TYPES = [
//     { label: "Ежедневные", value: "daily" },
//     { label: "Челленджи", value: "challenge" }
// ]

// const CATEGORIES = [
//     { id: 1, label: "Гигиена", slug: "hygiene" },
//     { id: 2, label: "Порядок", slug: "order" },
//     { id: 3, label: "Еда", slug: "food" },
//     { id: 4, label: "Учеба", slug: "study" }
// ]

// export default function CustomTask({childId}) {
//     const [type, setType] = useState("daily")
//     const [category, setCategory] = useState(CATEGORIES[0])
//     const [title, setTitle] = useState("")
//     const [subtitle, setSubtitle] = useState("")
//     const [description, setDescription] = useState("")
//     const [coin, setCoin] = useState("")
//     const [xp, setXp] = useState("")

//     async function createTask() {
//         // if (type === "challenge") {
//         //     alert("В API нет создания кастомного челленджа родителем")
//         //     return
//         // }

//         const token = localStorage.getItem("access_token")

//         const res = await fetch("/api/graphql", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": `Bearer ${token}`
//             },
//             body: JSON.stringify({
//                 query: CREATE_CUSTOM_DAILY_TASK_MUTATION,
//                 variables: {
//                     child_id: String(childId),
//                     category_id: Number(category.id),
//                     title,
//                     short_description: subtitle,
//                     description,
//                     reward_coins: Number(coin),
//                     reward_xp: Number(xp)
//                 }
//             })
//         })

//         const data = await res.json()

// console.log("CREATE TASK RESULT:", data)

// if (data?.errors?.length || !data?.data) {
//     console.error("CREATE TASK ERROR:", data)
//     return
// }

// alert("Задание успешно создано")
//     }

//     return (
//         <div style={styles.customTaskWrapper}>
//             <div style={styles.customTask}>

//                 {/* TYPE */}
//                 <div style={styles.customTaskCategoryWrapper}>
//                     {TASK_TYPES.map(t => (
//                         <span
//                             key={t.value}
//                             onClick={() => {
//                                 setType(t.value)
//                                 logState({ type: t.value })
//                             }}
//                             style={{
//                                 ...styles.customTaskCategory,
//                                 backgroundColor: type === t.value ? "#4F46E5" : "#f7f7f7",
//                                 color: type === t.value ? "#fff" : "#000",
//                                 borderColor: type === t.value ? "#4F46E5" : "#d0d0d0"
//                             }}
//                         >
//                             {t.label}
//                         </span>
//                     ))}
//                 </div>

//                 {/* CATEGORY */}
//                 <div style={styles.customTaskSubCategoryWrapper}>
//                     {CATEGORIES.map(c => (
//                         <span
//                             key={c.id}
//                             onClick={() => {
//                                 setCategory(c)
//                                 logState({ category: c })
//                             }}
//                             style={{
//                                 ...styles.customTaskSubCategory,
//                                 backgroundColor: category.id === c.id ? "#10B981" : "#fafafa",
//                                 color: category.id === c.id ? "#fff" : "#000",
//                                 borderColor: category.id === c.id ? "#10B981" : "#d0d0d0"
//                             }}
//                         >
//                             {c.label}
//                         </span>
//                     ))}
//                 </div>

//                 {/* INPUTS */}
//                 <div style={styles.textWrapper}>
//                     <h3>Текст</h3>

//                     <input
//                         style={styles.input}
//                         value={title}
//                         onChange={(e) => {
//                             setTitle(e.target.value)
//                             logState({ title: e.target.value })
//                         }}
//                         placeholder="Заголвок"
//                     />

//                     <input
//                         style={styles.input}
//                         value={subtitle}
//                         onChange={(e) => {
//                             setSubtitle(e.target.value)
//                             logState({ subtitle: e.target.value })
//                         }}
//                         placeholder="Подзаголовок"
//                     />

//                     <input
//                         style={styles.input}
//                         value={description}
//                         onChange={(e) => {
//                             setDescription(e.target.value)
//                             logState({ description: e.target.value })
//                         }}
//                         placeholder="Описание"
//                     />
//                 </div>

//                 {/* COIN */}
//                 <div style={styles.coinWrapper}>
//                     <input
//                         style={styles.coin}
//                         value={coin}
//                         onChange={(e) => {
//                             setCoin(e.target.value)
//                             logState({ coin: e.target.value })
//                         }}
//                         placeholder="coin"
//                     />
//                 </div>

//                 {/* XP */}
//                 <div style={styles.xpWrapper}>
//                     <input
//                         style={styles.xp}
//                         value={xp}
//                         onChange={(e) => {
//                             setXp(e.target.value)
//                             logState({ xp: e.target.value })
//                         }}
//                         placeholder="xp"
//                     />
//                 </div>

//                 <button onClick={createTask}>
//                     Создать
//                 </button>

//             </div>
//         </div>
//     )
// }


"use client"

import { useState } from "react"

function logState(newState) {
    console.log("CUSTOM TASK STATE:", newState)
}

const styles = {
    customTaskWrapper: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: "20px"
    },

    customTask: {
        width: "420px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        padding: "16px",
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
        backgroundColor: "#fff"
    },

    customTaskCategoryWrapper: {
        display: "flex",
        gap: "10px"
    },

    customTaskCategory: {
        padding: "6px 10px",
        border: "1px solid #d0d0d0",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "14px",
        backgroundColor: "#f7f7f7"
    },

    customTaskSubCategoryWrapper: {
        display: "flex",
        flexWrap: "wrap",
        gap: "8px"
    },

    customTaskSubCategory: {
        padding: "6px 10px",
        border: "1px solid #d0d0d0",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "13px",
        backgroundColor: "#fafafa"
    },

    textWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: "8px"
    },

    input: {
        padding: "8px 10px",
        border: "1px solid #d0d0d0",
        borderRadius: "8px",
        outline: "none",
        fontSize: "14px"
    },

    coinWrapper: {
        display: "flex"
    },

    coin: {
        width: "100%",
        padding: "8px 10px",
        border: "1px solid #d0d0d0",
        borderRadius: "8px",
        fontSize: "14px"
    },

    xpWrapper: {
        display: "flex"
    },

    xp: {
        width: "100%",
        padding: "8px 10px",
        border: "1px solid #d0d0d0",
        borderRadius: "8px",
        fontSize: "14px"
    }
}

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

const CREATE_CUSTOM_DAILY_TASK_MUTATION = `
    mutation CreateCustomDailyTaskForChild(
        $child_id: String!
        $category_id: Int!
        $title: String!
        $short_description: String
        $description: String
        $reward_xp: Int
        $reward_coins: Int
    ) {
        createCustomDailyTaskForChild(
            child_id: $child_id
            category_id: $category_id
            title: $title
            short_description: $short_description
            description: $description
            reward_xp: $reward_xp
            reward_coins: $reward_coins
        ) {
            success
            ${MUTATION_ERRORS}
        }
    }
`

const CREATE_CUSTOM_CHALLENGE_MUTATION = `
    mutation CreateCustomChallengeForChild(
        $child_id: String!
        $category_id: Int!
        $title: String!
        $short_description: String
        $description: String
        $reward_xp: Int
        $reward_coins: Int
        $duration_days: Int!
    ) {
        createCustomChallengeForChild(
            child_id: $child_id
            category_id: $category_id
            title: $title
            short_description: $short_description
            description: $description
            reward_xp: $reward_xp
            reward_coins: $reward_coins
            duration_days: $duration_days
        ) {
            success
            ${MUTATION_ERRORS}
        }
    }
`

const TASK_TYPES = [
    { label: "Ежедневные", value: "daily" },
    { label: "Челленджи", value: "challenge" }
]

const CATEGORIES = [
    { id: 1, label: "Гигиена", slug: "hygiene" },
    { id: 2, label: "Порядок", slug: "order" },
    { id: 3, label: "Еда", slug: "food" },
    { id: 4, label: "Учеба", slug: "study" }
]

export default function CustomTask({ childId }) {
    const [type, setType] = useState("daily")
    const [category, setCategory] = useState(CATEGORIES[0])
    const [title, setTitle] = useState("")
    const [subtitle, setSubtitle] = useState("")
    const [description, setDescription] = useState("")
    const [coin, setCoin] = useState("")
    const [xp, setXp] = useState("")

    async function createTask() {
        const token = localStorage.getItem("access_token")

        if (!token) {
            console.error("CREATE CUSTOM TASK ERROR: нет access_token")
            return
        }

        if (!childId) {
            console.error("CREATE CUSTOM TASK ERROR: нет childId")
            return
        }

        const isChallenge = type === "challenge"

        const query = isChallenge
            ? CREATE_CUSTOM_CHALLENGE_MUTATION
            : CREATE_CUSTOM_DAILY_TASK_MUTATION

        const operationName = isChallenge
            ? "createCustomChallengeForChild"
            : "createCustomDailyTaskForChild"

        const variables = {
            child_id: String(childId),
            category_id: Number(category.id),
            title,
            short_description: subtitle,
            description,
            reward_coins: Number(coin),
            reward_xp: Number(xp),

            ...(isChallenge && {
                duration_days: 28
            })
        }

        console.log("CREATE CUSTOM TASK TYPE:", type)
        console.log("CREATE CUSTOM TASK VARIABLES:", variables)

        try {
            const res = await fetch("/api/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    query,
                    variables
                })
            })

            const data = await res.json()

            console.log("CREATE CUSTOM TASK RESULT:", data)

            if (!res.ok) {
                console.error("CREATE CUSTOM TASK HTTP ERROR:", {
                    status: res.status,
                    data
                })
                return
            }

            if (data?.errors?.length) {
                console.error(
                    "CREATE CUSTOM TASK GRAPHQL ERROR:",
                    data.errors
                )
                return
            }

            const payload = data?.data?.[operationName]

            if (!payload) {
                console.error(
                    "CREATE CUSTOM TASK ERROR: payload отсутствует",
                    data
                )
                return
            }

            if (!payload.success) {
                console.error(
                    "CREATE CUSTOM TASK PAYLOAD ERROR:",
                    payload.errors
                )
                return
            }

            alert(
                isChallenge
                    ? "Челлендж успешно создан"
                    : "Ежедневное задание успешно создано"
            )
        } catch (error) {
            console.error("CREATE CUSTOM TASK ERROR:", error)
        }
    }

    return (
        <div style={styles.customTaskWrapper}>
            <div style={styles.customTask}>

                {/* TYPE */}
                <div style={styles.customTaskCategoryWrapper}>
                    {TASK_TYPES.map(t => (
                        <span
                            key={t.value}
                            onClick={() => {
                                setType(t.value)
                                logState({ type: t.value })
                            }}
                            style={{
                                ...styles.customTaskCategory,
                                backgroundColor:
                                    type === t.value
                                        ? "#4F46E5"
                                        : "#f7f7f7",
                                color:
                                    type === t.value
                                        ? "#fff"
                                        : "#000",
                                borderColor:
                                    type === t.value
                                        ? "#4F46E5"
                                        : "#d0d0d0"
                            }}
                        >
                            {t.label}
                        </span>
                    ))}
                </div>

                {/* CATEGORY */}
                <div style={styles.customTaskSubCategoryWrapper}>
                    {CATEGORIES.map(c => (
                        <span
                            key={c.id}
                            onClick={() => {
                                setCategory(c)
                                logState({ category: c })
                            }}
                            style={{
                                ...styles.customTaskSubCategory,
                                backgroundColor:
                                    category.id === c.id
                                        ? "#10B981"
                                        : "#fafafa",
                                color:
                                    category.id === c.id
                                        ? "#fff"
                                        : "#000",
                                borderColor:
                                    category.id === c.id
                                        ? "#10B981"
                                        : "#d0d0d0"
                            }}
                        >
                            {c.label}
                        </span>
                    ))}
                </div>

                {/* INPUTS */}
                <div style={styles.textWrapper}>
                    <h3>Текст</h3>

                    <input
                        style={styles.input}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                            logState({ title: e.target.value })
                        }}
                        placeholder="Заголовок"
                    />

                    <input
                        style={styles.input}
                        value={subtitle}
                        onChange={(e) => {
                            setSubtitle(e.target.value)
                            logState({ subtitle: e.target.value })
                        }}
                        placeholder="Подзаголовок"
                    />

                    <input
                        style={styles.input}
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                            logState({
                                description: e.target.value
                            })
                        }}
                        placeholder="Описание"
                    />
                </div>

                {/* COIN */}
                <div style={styles.coinWrapper}>
                    <input
                        style={styles.coin}
                        value={coin}
                        onChange={(e) => {
                            setCoin(e.target.value)
                            logState({ coin: e.target.value })
                        }}
                        placeholder="coin"
                    />
                </div>

                {/* XP */}
                <div style={styles.xpWrapper}>
                    <input
                        style={styles.xp}
                        value={xp}
                        onChange={(e) => {
                            setXp(e.target.value)
                            logState({ xp: e.target.value })
                        }}
                        placeholder="xp"
                    />
                </div>

                <button onClick={createTask}>
                    Создать
                </button>

            </div>
        </div>
    )
}