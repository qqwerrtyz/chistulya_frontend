"use client"

import { GRAPHQL_URL } from "@/config/publicEnv"

import styles from "./../another/analytics/everyDayTasks/EveryDayTask.module.css"
import { useEffect, useState } from "react"
// import Menu from "./menu/Menu"
// import DropDown from "./dropDown/DropDown"
// import BodyDiagram from "./bodyDiagram/BodyDiagram"
// import HeaderDiagram from "./headerDiagram/HeaderDiagram"
// import AnalyticsHeadline from "../headline/Headline"
import Menu from "../another/analytics/everyDayTasks/menu/Menu"
import DropDown from "../another/analytics/everyDayTasks/dropDown/DropDown"
import BodyDiagram from "../another/analytics/everyDayTasks/bodyDiagram/BodyDiagram"
import HeaderDiagram from "../another/analytics/everyDayTasks/headerDiagram/HeaderDiagram"
import AnalyticsHeadline from "../another/analytics/headline/Headline"



const DAILY_TASK_CATEGORIES_QUERY = `
    query DailyTaskCategories {
        dailyTaskCategories {
            id
            slug
            title
            order_column
        }
    }
`

const DAILY_TASK_ANALYTICS_QUERY = `
    query DailyTaskAnalytics(
        $childId: String!
        $categoryId: Int
        $days: Int!
    ) {
        dailyTaskAnalytics(
            child_id: $childId
            category_id: $categoryId
            days: $days
        ) {
            date
            weekday
            selected_count
            completed_count
        }
    }
`

const CATEGORY_TO_API = {
    hygien: "hygiene",
    order: "order",
    food: "food",
    study: "study"
}

const DAY_KEYS = ["one", "two", "three", "four", "five", "six", "seven"]

function createEmptyAnalyticsData() {
    return {
        hygien: {
            enCategory: "hygien",
            one: { date: { count: "", dataDays: createEmptyDays() } },
            two: { date: { count: "", dataDays: createEmptyDays() } },
            three: { date: { count: "", dataDays: createEmptyDays() } },
            four: { date: { count: "", dataDays: createEmptyDays() } }
        },

        order: {
            enCategory: "order",
            one: { date: { count: "", dataDays: createEmptyDays() } },
            two: { date: { count: "", dataDays: createEmptyDays() } },
            three: { date: { count: "", dataDays: createEmptyDays() } },
            four: { date: { count: "", dataDays: createEmptyDays() } }
        },

        food: {
            enCategory: "food",
            one: { date: { count: "", dataDays: createEmptyDays() } },
            two: { date: { count: "", dataDays: createEmptyDays() } },
            three: { date: { count: "", dataDays: createEmptyDays() } },
            four: { date: { count: "", dataDays: createEmptyDays() } }
        },

        study: {
            enCategory: "study",
            one: { date: { count: "", dataDays: createEmptyDays() } },
            two: { date: { count: "", dataDays: createEmptyDays() } },
            three: { date: { count: "", dataDays: createEmptyDays() } },
            four: { date: { count: "", dataDays: createEmptyDays() } }
        }
    }
}

function createEmptyDays() {
    return {
        one: { date: "", data: 0 },
        two: { date: "", data: 0 },
        three: { date: "", data: 0 },
        four: { date: "", data: 0 },
        five: { date: "", data: 0 },
        six: { date: "", data: 0 },
        seven: { date: "", data: 0 }
    }
}

function formatDay(dateString) {
    if (!dateString) return ""

    const date = new Date(dateString)

    return date.getDate()
}

function formatPeriod(startDateString, endDateString) {
    if (!startDateString || !endDateString) return ""

    const startDate = new Date(startDateString)
    const endDate = new Date(endDateString)

    const startDay = startDate.getDate()
    const startMonth = startDate.getMonth() + 1

    const endDay = endDate.getDate()
    const endMonth = endDate.getMonth() + 1

    return `${startDay}.${startMonth} – ${endDay}.${endMonth}`
}

function prepareDailyAnalyticsData(category, analytics) {
    const namesTimeInterval = ["one", "two", "three", "four"]

    const result = {
        enCategory: category
    }

    namesTimeInterval.forEach((intervalName, intervalIndex) => {
        const startIndex = intervalIndex * 7
        const endIndex = startIndex + 7
        const chunk = analytics.slice(startIndex, endIndex)

        const dataDays = createEmptyDays()

        DAY_KEYS.forEach((dayKey, dayIndex) => {
            const item = chunk[dayIndex]

            dataDays[dayKey] = {
                date: formatDay(item?.date),
                data: item?.completed_count || 0
            }
        })

        result[intervalName] = {
            date: {
                count: formatPeriod(chunk[0]?.date, chunk[chunk.length - 1]?.date),
                dataDays: dataDays
            }
        }
    })

    return result
}

export default function EveryDayTaskParent({childId, requestDelay = 0 }) {
    const [isOpen, setIsOpen] = useState(false);

    const [dataDayTasks, setDataDayTasks] = useState({
        "hygien": {
            name: "Гигиена",
            cheked: true,
        },

        "order": {
            name: "Порядок",
            cheked: false,
        },

        "food": {
            name: "Еда",
            cheked: false,
        },

        "study": {
            name: "Учеба",
            cheked: false,
        }
    })

    const [selectCategory, setSelectCategory] = useState("hygien")
    const [apiCategories, setApiCategories] = useState([])

    const [data7Days, setData7Days] = useState(createEmptyAnalyticsData());

    const namesTimeInterval = ["one", "two", "three", "four"];

    const [selectIndexNameTimeInterval, setSelectIndexNameTimeInterval] = useState(
        namesTimeInterval.length - 1
    )

    const [selectTimesInterval, setSelectTimesInterval] = useState(
        namesTimeInterval[namesTimeInterval.length - 1]
    )

    useEffect(() => {
    async function getDailyTaskCategories() {
        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
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
                    query: DAILY_TASK_CATEGORIES_QUERY
                })
            })

            const result = await response.json()

            console.log(
                "DAILY TASK CATEGORIES RESULT:",
                result
            )

            if (result.errors?.length) {
                console.log(
                    "DAILY TASK CATEGORIES ERROR:",
                    result.errors[0].message
                )

                return
            }

            const categories = result.data?.dailyTaskCategories || []

            console.log("ID КАТЕГОРИЙ ЕЖЕДНЕВНЫХ ЗАДАНИЙ:", result)

            categories.forEach(category => {
                console.log(
                    `${category.title} | slug: ${category.slug} | id: ${category.id}`
                )
            })

            setApiCategories(categories)

        } catch (error) {
            console.log(
                "DAILY TASK CATEGORIES CATCH ERROR:",
                error
            )
        }
    }

    const timerId = setTimeout(() => {
        getDailyTaskCategories()
    }, requestDelay)

    return () => clearTimeout(timerId)

}, [requestDelay])

    useEffect(() => {
    if (!childId || !apiCategories.length) {
        return
    }

    async function getDailyTaskAnalytics() {
        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
            return
        }

        const categorySlug =
            CATEGORY_TO_API[selectCategory]

        const category =
            apiCategories.find(
                item => item.slug === categorySlug
            )

        if (!category) {
            console.log(
                "DAILY TASK ANALYTICS: категория не найдена",
                categorySlug
            )

            return
        }

        const categoryId = Number(category.id)

        if (!Number.isInteger(categoryId)) {
            console.log(
                "DAILY TASK ANALYTICS: неверный category_id",
                category.id
            )

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
                    query: DAILY_TASK_ANALYTICS_QUERY,
                    variables: {
                        childId: childId,
                        categoryId: categoryId,
                        days: 28
                    }
                })
            })

            const result = await response.json()

            console.log(
                "DAILY TASK ANALYTICS RESULT:",
                result
            )

            if (result.errors?.length) {
                console.log(
                    "DAILY TASK ANALYTICS ERROR:",
                    result.errors[0].message
                )

                return
            }

            const analytics =
                result.data?.dailyTaskAnalytics || []

            const preparedData =
                prepareDailyAnalyticsData(
                    selectCategory,
                    analytics
                )

            setData7Days(prev => ({
                ...prev,
                [selectCategory]: preparedData
            }))

            setSelectIndexNameTimeInterval(
                namesTimeInterval.length - 1
            )

            setSelectTimesInterval(
                namesTimeInterval[namesTimeInterval.length - 1]
            )

        } catch (error) {
            console.log(
                "DAILY TASK ANALYTICS CATCH ERROR:",
                error
            )
        }
    }

    getDailyTaskAnalytics()

}, [selectCategory, childId, apiCategories])



    function renderEveryDayTaskResult(arr, selectCategory, selectTimesInterval) {
        const resultObj = {
            date: null,
            one: {date: null, data: null},
            two: {date: null, data: null},
            three: {date: null, data: null},
            four: {date: null, data: null},
            five: {date: null, data: null},
            six: {date: null, data: null},
            seven: {date: null, data: null}
        }

        resultObj.date = arr[selectCategory]?.[selectTimesInterval]?.date?.count
        
        resultObj.one.date = arr[selectCategory]?.[selectTimesInterval]?.date?.dataDays?.one?.date
        resultObj.one.data = arr[selectCategory]?.[selectTimesInterval]?.date?.dataDays?.one?.data

        resultObj.two.date = arr[selectCategory]?.[selectTimesInterval]?.date?.dataDays?.two?.date
        resultObj.two.data = arr[selectCategory]?.[selectTimesInterval]?.date?.dataDays?.two?.data

        resultObj.three.date = arr[selectCategory]?.[selectTimesInterval]?.date?.dataDays?.three?.date
        resultObj.three.data = arr[selectCategory]?.[selectTimesInterval]?.date?.dataDays?.three?.data

        resultObj.four.date = arr[selectCategory]?.[selectTimesInterval]?.date?.dataDays?.four?.date
        resultObj.four.data = arr[selectCategory]?.[selectTimesInterval]?.date?.dataDays?.four?.data

        resultObj.five.date = arr[selectCategory]?.[selectTimesInterval]?.date?.dataDays?.five?.date
        resultObj.five.data = arr[selectCategory]?.[selectTimesInterval]?.date?.dataDays?.five?.data

        resultObj.six.date = arr[selectCategory]?.[selectTimesInterval]?.date?.dataDays?.six?.date
        resultObj.six.data = arr[selectCategory]?.[selectTimesInterval]?.date?.dataDays?.six?.data

        resultObj.seven.date = arr[selectCategory]?.[selectTimesInterval]?.date?.dataDays?.seven?.date
        resultObj.seven.data = arr[selectCategory]?.[selectTimesInterval]?.date?.dataDays?.seven?.data

        return resultObj
    }

    return (
        <div className={styles.everyDayTaskWrapper}>
            <div className={styles.everyDayTask}>
                <AnalyticsHeadline value={"Выполненные ежедневные задания"}/>

                <div className={styles.menuAndDropdownWrapper}>
                    <Menu 
                        setIsOpen={setIsOpen}
                        isOpen={isOpen}
                        dataDayTasks={dataDayTasks}
                    />
                    {
                        isOpen && (
                            <DropDown
                                setIsOpen={setIsOpen}
                                dataDayTasks={dataDayTasks}
                                setDataDayTasks={setDataDayTasks}
                                setSelectCategory={setSelectCategory}
                            />
                        )
                    }
                </div>
                
                <div className={styles.everyDayTaskBodyWrapper}>
                    <div className={styles.everyDayTaskBody}>
                        

                        <HeaderDiagram
                            renderEveryDayTaskResult={renderEveryDayTaskResult}
                            data7Days={data7Days}
                            selectCategory={selectCategory}
                            namesTimeInterval={namesTimeInterval}
                            selectIndexNameTimeInterval={selectIndexNameTimeInterval}
                            setSelectIndexNameTimeInterval={setSelectIndexNameTimeInterval}
                            setSelectTimesInterval={setSelectTimesInterval}
                            selectTimesInterval={selectTimesInterval}
                        />
                        
                        
                        <BodyDiagram
                            renderEveryDayTaskResult={renderEveryDayTaskResult}
                            data7Days={data7Days}
                            selectCategory={selectCategory}
                            selectTimesInterval={selectTimesInterval}
                        />

                    </div>
                </div>
            </div>
        </div>
    )
}