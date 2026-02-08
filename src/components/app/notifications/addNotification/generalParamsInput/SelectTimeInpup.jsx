import Image from "next/image"
import styles from "./../../Notifications.module.css"
import icons from "../../../../../icons/icons"
import { useState, useRef, useEffect, useContext } from "react"
import { InputContext } from "../AddNotification";

export default function SelectTimeInpup() {
    const [showDropdown, setShowDropdown] = useState(false);
    const {data, setData} = useContext(InputContext)

    // выбранное время (строки "00".."23" и "00".."59")
    const [hours, setHours] = useState("10")
    const [minutes, setMinutes] = useState("22")

    // массивы для рендера
    const hoursList = Array.from({ length: 24 }, (_, i) =>
        String(i).padStart(2, "0")
    )
    const minutesList = Array.from({ length: 60 }, (_, i) =>
        String(i).padStart(2, "0")
    )

    // рефы на контейнеры колонок (часы и минуты)
    const hoursRef = useRef(null)
    const minutesRef = useRef(null)

    // таймаут для определения завершения скролла (debounce)
    const scrollTimeoutRef = useRef(null)

    // вспомогательная функция: получить реальную высоту элемента списка (динамически)
    const getItemHeight = (container) => {
        if (!container) return 36 // запасной вариант
        const firstItem = container.querySelector(`.${styles.selectTimeItem}`)
        return firstItem ? firstItem.offsetHeight : 36
    }

    // прокрутить контейнер так, чтобы элемент с индексом index оказался по центру
    const scrollToIndex = (container, index) => {
        if (!container) return
        const itemHeight = getItemHeight(container)
        const containerHeight = container.clientHeight
        const targetTop = index * itemHeight - (containerHeight / 2 - itemHeight / 2)
        // плавная прокрутка (CSS scroll-behavior тоже включён)
        container.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" })
    }

    // вычисляем текущий индекс по центру контейнера и вызываем setValue
    const snapAndSetValue = (container, list, setValue) => {
        if (!container) return
        const itemHeight = getItemHeight(container)
        const containerHeight = container.clientHeight
        const centerPosition = container.scrollTop + containerHeight / 2
        let index = Math.floor(centerPosition / itemHeight)

        // защита от выхода за границы
        if (index < 0) index = 0
        if (index > list.length - 1) index = list.length - 1

        const value = list[index]
        if (value !== undefined) {
            setValue(value)
            // корректно проваливаемся до точной позиции
            scrollToIndex(container, index)
        }
    }

    // общая обработка onScroll — debounce для snap после прекращения прокрутки
    const handleScroll = (e, list, setValue) => {
        const container = e.target
        // при каждом событии скролла сбрасываем таймаут
        if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current)
        }
        // через 100ms после последнего scroll — считаем центр и "прилипаем"
        scrollTimeoutRef.current = setTimeout(() => {
            snapAndSetValue(container, list, setValue)
        }, 100)
    }

    // обработчик колеса — скроллим ровно на 1 элемент вверх/вниз
    const handleWheel = (e, list, containerRef, setValue) => {
        // мы хотим управлять прокруткой вручную
        e.preventDefault()

        const container = containerRef.current
        if (!container) return

        const itemHeight = getItemHeight(container)
        const containerHeight = container.clientHeight
        const centerPosition = container.scrollTop + containerHeight / 2
        const currentIndex = Math.floor(centerPosition / itemHeight)

        // направление колеса: +1 вниз, -1 вверх
        const direction = e.deltaY > 0 ? 1 : -1
        let newIndex = currentIndex + direction

        if (newIndex < 0) newIndex = 0
        if (newIndex > list.length - 1) newIndex = list.length - 1

        // прокрутить к новому индексу и сразу установить значение
        scrollToIndex(container, newIndex)
        setValue(list[newIndex])
    }

    // при монтировании компонента прокручиваем колонки к текущим значениям (чтобы центрировали)
    useEffect(() => {
        const hrContainer = hoursRef.current
        const minContainer = minutesRef.current

        // небольшая задержка, чтобы DOM успел отрисоваться и offsetHeight был корректным
        const t = setTimeout(() => {
            if (hrContainer) {
                const idx = hoursList.indexOf(hours)
                if (idx >= 0) scrollToIndex(hrContainer, idx)
            }
            if (minContainer) {
                const idx = minutesList.indexOf(minutes)
                if (idx >= 0) scrollToIndex(minContainer, idx)
            }
        }, 50)

        return () => clearTimeout(t)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function sendResult() {
        setData(prev => {
            const clone = {
                ...prev,
                time: hours + ":" + minutes
            }

            return clone
        })
    }

    if (!data && !setData) return <h1>ЗАГРУЗКААААА</h1>

    return (
        <div
            className={`${styles.generalParamsFieldWrapper} ${styles.generalParamsFieldWrapperSelectTime}`}
        >
            <div
                className={styles.generalParamsFieldHeader}
                onClick={() => setShowDropdown(prev => !prev)}
            >
                <span className={styles.generalParamsField}>
                    {
                        data?.time ? `${data?.time}` : "Выбрать время"
                    }
                </span>

                <div className={styles.generalParamsArrowsWrapper}>
                    {
                        showDropdown
                            ? <Image src={icons.arrowUp} className={styles.generalParamsArrow} />
                            : <Image src={icons.arrowDown} className={styles.generalParamsArrow} />
                    }
                </div>
            </div>

            {showDropdown && (
                <div className={`${styles.dropdownSelectTimeWrapper} ${styles.dropdownSelectTimeWrapperSelectTime}`}>
                    <div className={styles.selectTimeContentWrapper}>
                        <div className={styles.selectTimeContent}>

                            {/* HEADER */}
                            <div className={styles.selectTimeHeader}>
                                <Image
                                    className={styles.selectTimeHeaderIcon}
                                    src={icons.closeSelectTime}
                                    onClick={() => setShowDropdown(false)}
                                />
                                <Image
                                    className={styles.selectTimeHeaderIcon}
                                    src={icons.doneSelectTime}
                                    onClick={() => {
                                        sendResult();
                                        setShowDropdown(false);
                                    }}
                                />
                            </div>

                            {/* BODY */}
                            <div className={styles.selectTimeBody}>

                                {/* рамка центра */}
                                <div className={styles.selectTimeCenterLine} />

                                <div className={styles.selectTimeColumns}>

                                    {/* ЧАСЫ */}
                                    <div
                                        // реф нужен, чтобы прокручивать програмно
                                        ref={hoursRef}
                                        className={styles.selectTimeColumn}
                                        onScroll={(e) =>
                                            handleScroll(e, hoursList, setHours)
                                        }
                                        onWheel={(e) =>
                                            handleWheel(e, hoursList, hoursRef, setHours)
                                        }
                                    >
                                        {hoursList.map(h => (
                                            <div
                                                key={h}
                                                className={`${styles.selectTimeItem} ${
                                                    h === hours ? styles.active : ""
                                                }`}
                                            >
                                                {h}
                                            </div>
                                        ))}
                                    </div>

                                    {/* : */}
                                

                                    {/* МИНУТЫ */}
                                    <div
                                        ref={minutesRef}
                                        className={styles.selectTimeColumn}
                                        onScroll={(e) =>
                                            handleScroll(e, minutesList, setMinutes)
                                        }
                                        onWheel={(e) =>
                                            handleWheel(e, minutesList, minutesRef, setMinutes)
                                        }
                                    >
                                        {minutesList.map(m => (
                                            <div
                                                key={m}
                                                className={`${styles.selectTimeItem} ${
                                                    m === minutes ? styles.active : ""
                                                }`}
                                            >
                                                {m}
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
