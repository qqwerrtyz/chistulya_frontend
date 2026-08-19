
"use client"

import { GRAPHQL_URL } from "@/config/publicEnv"

import { useState } from "react"
import styles from "./AddCostomTask.module.css"
import Image from "next/image"
import icons from "@/icons/icons"

function logState(newState) {
    console.log("CUSTOM TASK STATE:", newState)
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

export default function CustomTask({ childId, setShowCustomTask }) {
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
            const res = await fetch(GRAPHQL_URL, {
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
        <div className={styles.customTaskWrapper}>
            <div className={styles.customTask}>
                <Image onClick={() => setShowCustomTask(false)} className={styles.closeCross} src={icons.cross}/>


                {/* TYPE */}
                <div className={styles.customTaskCategoryWrapper}>
                    {TASK_TYPES.map(t => (
                        <span
                            key={t.value}
                            onClick={() => {
                                setType(t.value)
                                logState({ type: t.value })
                            }}
                            className={styles.customTaskCategory}
                        >
                            {t.label}
                        </span>
                    ))}
                </div>

                {/* CATEGORY */}
                <div className={styles.customTaskSubCategoryWrapper}>
                    {CATEGORIES.map(c => (
                        <span
                            key={c.id}
                            onClick={() => {
                                setCategory(c)
                                logState({ category: c })
                            }}
                            className={styles.customTaskSubCategory}
                        >
                            {c.label}
                        </span>
                    ))}
                </div>

                {/* INPUTS */}
                <div className={styles.textWrapper}>
                    <h3>Текст</h3>

                    <input
                        className={styles.input}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                            logState({ title: e.target.value })
                        }}
                        placeholder="Заголовок"
                    />

                    <input
                        className={styles.input}
                        value={subtitle}
                        onChange={(e) => {
                            setSubtitle(e.target.value)
                            logState({ subtitle: e.target.value })
                        }}
                        placeholder="Подзаголовок"
                    />

                    <input
                        className={styles.input}
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

                <div className={styles.coinXpWrapper}>
                    {/* COIN */}
                    <div className={styles.coinWrapper}>
                        <input
                            className={styles.coin}
                            value={coin}
                            onChange={(e) => {
                                setCoin(e.target.value)
                                logState({ coin: e.target.value })
                            }}
                            placeholder="Монетки"
                            type="number"
                        />

                
                    </div>

                    {/* XP */}
                    <div className={styles.xpWrapper}>
                        <input
                            className={styles.xp}
                            value={xp}
                            onChange={(e) => {
                                setXp(e.target.value)
                                logState({ xp: e.target.value })
                            }}
                            placeholder="Опыт"
                            type="number"
                        />

                    
                    </div>
                </div>

                

                <button 
                    onClick={async () => {
                        await createTask()
                        setShowCustomTask(false)
                    }}

                    className={styles.createButton} 
                >
                    Создать
                </button>

            </div>
        </div>
    )
}