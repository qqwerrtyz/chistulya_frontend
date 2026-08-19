


"use client"

import { GRAPHQL_URL } from "@/config/publicEnv"

import styles from "./EveryDayTask.module.css"
import { useEffect, useState, useRef } from "react"
import Menu from "./menu/Menu"
import DropDown from "./dropDown/DropDown"
import BodyDiagram from "./bodyDiagram/BodyDiagram"
import HeaderDiagram from "./headerDiagram/HeaderDiagram"
import AnalyticsHeadline from "../headline/Headline"

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

const DAILY_TASK_ANALYTICS_META_QUERY = `
    query DailyTaskAnalyticsMeta {
        me {
            id
        }

        dailyTaskCategories {
            id
            slug
            title
            order_column
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

    const sortedAnalytics = [...analytics].sort(
        (a, b) => a.date.localeCompare(b.date)
    )

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

export default function EveryDayTask() {
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
    const [analyticsMeta, setAnalyticsMeta] = useState(null)

const metaRequestStarted = useRef(false)

    const [data7Days, setData7Days] = useState(createEmptyAnalyticsData());

    const namesTimeInterval = ["one", "two", "three", "four"];

    const [selectIndexNameTimeInterval, setSelectIndexNameTimeInterval] = useState(0)

    const [selectTimesInterval, setSelectTimesInterval] = useState(namesTimeInterval[selectIndexNameTimeInterval]);

   useEffect(() => {
    if (metaRequestStarted.current) {
        return
    }

    metaRequestStarted.current = true

    async function getDailyTaskAnalyticsMeta() {
        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
            console.log("DAILY TASK ANALYTICS: не найден access_token")
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
                    query: DAILY_TASK_ANALYTICS_META_QUERY
                })
            })

            const result = await response.json()

            console.log(
                "DAILY TASK ANALYTICS META:",
                result
            )

            if (result.errors?.length) {
                console.log(
                    "DAILY TASK ANALYTICS META ERROR:",
                    result.errors[0].message
                )

                return
            }

            const childId = result.data?.me?.id

            const categories =
                result.data?.dailyTaskCategories || []

            if (!childId) {
                console.log(
                    "DAILY TASK ANALYTICS: не найден child_id"
                )

                return
            }

            setAnalyticsMeta({
                childId,
                categories
            })

        } catch (error) {
            metaRequestStarted.current = false

            console.log(
                "DAILY TASK ANALYTICS META CATCH ERROR:",
                error
            )
        }
    }

    getDailyTaskAnalyticsMeta()
}, [])

useEffect(() => {
    if (!analyticsMeta) {
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
            analyticsMeta.categories.find(
                item => item.slug === categorySlug
            )

        if (!category?.id) {
            console.log(
                "DAILY TASK ANALYTICS: категория не найдена",
                categorySlug
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
                        childId: analyticsMeta.childId,
    categoryId: category.id,
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

            setSelectIndexNameTimeInterval(0)
            setSelectTimesInterval("one")

        } catch (error) {
            console.log(
                "DAILY TASK ANALYTICS CATCH ERROR:",
                error
            )
        }
    }

    getDailyTaskAnalytics()

}, [selectCategory, analyticsMeta])

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