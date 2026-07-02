// const styles = {
    
// }

// export default function CustomTask() {
//     return (
//         <div style={styles.customTaskWrapper}>
//             <div style={styles.customTask}>
//                 <div style={styles.customTaskCategoryWrapper}>
//                     <span style={styles.customTaskCategory}>Ежедневные</span>
//                     <span style={styles.customTaskCategory}>Челленджи</span>
//                 </div>

//                 <div style={styles.customTaskSubCategoryWrapper}>
//                     <span style={styles.customTaskSubCategory}>Гигиена</span>
//                     <span style={styles.customTaskSubCategory}>Порядок</span>
//                     <span style={styles.customTaskSubCategory}>Еда</span>
//                     <span style={styles.customTaskSubCategory}>Учеба</span>
//                 </div>

//                 <div style={styles.textWrapper}>
//                     <h3>Текст</h3>
//                     <input style={styles.input} value={"Текст"}/>
//                     <input style={styles.input} value={"Подзаголовок"}/>
//                     <input style={styles.input} value={"Описание"}/>
                    
//                 </div>

//                 <div style={styles.coinWrapper}>
//                     <input style={styles.coin} value={"coin"}/>
//                 </div>

//                 <div style={styles.xpWrapper}>
//                     <input style={styles.xp} value={"xp"}/>
//                 </div>
//             </div>
//         </div>
//     )
// }



"use client"

import { useState } from "react"

const styles = {
    
}

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

            daily_task {
                id
                title
                short_description
                description
                reward_xp
                reward_coins
            }
        }
    }
`

const CUSTOM_TASK_CATEGORIES = [
    {
        ruName: "Ежедневные",
        value: "daily"
    },
    {
        ruName: "Челленджи",
        value: "challenge"
    }
]

const CUSTOM_TASK_SUB_CATEGORIES = [
    {
        ruName: "Гигиена",
        categoryId: 1
    },
    {
        ruName: "Порядок",
        categoryId: 2
    },
    {
        ruName: "Еда",
        categoryId: 3
    },
    {
        ruName: "Учеба",
        categoryId: 4
    }
]

function getGraphqlErrorMessage(payload, result) {
    if (result?.errors?.length) {
        return result.errors[0].message
    }

    const firstError = payload?.errors?.[0]

    if (!firstError) {
        return "Не удалось создать задание"
    }

    if (firstError.__typename === "ValidationError") {
        return firstError.fields?.[0]?.messages?.[0] || firstError.message
    }

    if (firstError.__typename === "RateLimitError") {
        return `${firstError.message} Повторите через ${firstError.retryAfter} сек.`
    }

    return firstError.message || "Не удалось создать задание"
}

export default function CustomTask({ childId }) {
    const [selectedTaskType, setSelectedTaskType] = useState("daily")
    const [selectedSubCategory, setSelectedSubCategory] = useState(CUSTOM_TASK_SUB_CATEGORIES[0])

    const [formData, setFormData] = useState({
        title: "",
        short_description: "",
        description: "",
        reward_coins: "",
        reward_xp: ""
    })

    function changeFormData(field, value) {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }))
    }

    async function createCustomTask() {
        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
            console.log("Нет токена авторизации")
            return
        }

        if (!childId) {
            console.log("Не найден id ребенка")
            return
        }

        if (selectedTaskType === "challenge") {
            console.log("В документации нет мутации для создания кастомного челленджа родителем")
            return
        }

        if (!formData.title) {
            console.log("Заполните текст задания")
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
                    query: CREATE_CUSTOM_DAILY_TASK_MUTATION,
                    variables: {
                        child_id: childId,
                        category_id: selectedSubCategory.categoryId,
                        title: formData.title,
                        short_description: formData.short_description || null,
                        description: formData.description || null,
                        reward_xp: Number(formData.reward_xp) || 0,
                        reward_coins: Number(formData.reward_coins) || 0
                    }
                })
            })

            const result = await response.json()

            console.log("CREATE CUSTOM DAILY TASK RESULT:", result)

            const payload = result.data?.createCustomDailyTaskForChild

            if (!payload?.success) {
                console.log(getGraphqlErrorMessage(payload, result))
                return
            }

            console.log("Задание создано")

        } catch (error) {
            console.log("CREATE CUSTOM DAILY TASK ERROR:", error)
            console.log("Ошибка соединения с сервером")
        }
    }

    return (
        <div style={styles.customTaskWrapper}>
            <div style={styles.customTask}>
                <div style={styles.customTaskCategoryWrapper}>
                    {CUSTOM_TASK_CATEGORIES.map((item) => {
                        return (
                            <span
                                key={item.value}
                                style={styles.customTaskCategory}
                                onClick={() => setSelectedTaskType(item.value)}
                            >
                                {item.ruName}
                            </span>
                        )
                    })}
                </div>

                <div style={styles.customTaskSubCategoryWrapper}>
                    {CUSTOM_TASK_SUB_CATEGORIES.map((item) => {
                        return (
                            <span
                                key={item.ruName}
                                style={styles.customTaskSubCategory}
                                onClick={() => setSelectedSubCategory(item)}
                            >
                                {item.ruName}
                            </span>
                        )
                    })}
                </div>

                <div style={styles.textWrapper}>
                    <h3>Текст</h3>

                    <input
                        style={styles.input}
                        value={formData.title}
                        placeholder="Текст"
                        onChange={(event) => changeFormData("title", event.target.value)}
                    />

                    <input
                        style={styles.input}
                        value={formData.short_description}
                        placeholder="Подзаголовок"
                        onChange={(event) => changeFormData("short_description", event.target.value)}
                    />

                    <input
                        style={styles.input}
                        value={formData.description}
                        placeholder="Описание"
                        onChange={(event) => changeFormData("description", event.target.value)}
                    />
                </div>

                <div style={styles.coinWrapper}>
                    <input
                        style={styles.coin}
                        type="number"
                        value={formData.reward_coins}
                        placeholder="coin"
                        onChange={(event) => changeFormData("reward_coins", event.target.value)}
                    />
                </div>

                <div style={styles.xpWrapper}>
                    <input
                        style={styles.xp}
                        type="number"
                        value={formData.reward_xp}
                        placeholder="xp"
                        onChange={(event) => changeFormData("reward_xp", event.target.value)}
                    />
                </div>

                <button onClick={createCustomTask}>
                    Создать
                </button>
            </div>
        </div>
    )
}