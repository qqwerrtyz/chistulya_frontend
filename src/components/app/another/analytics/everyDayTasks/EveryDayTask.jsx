"use client"
import styles from "./EveryDayTask.module.css"
import {  useState } from "react"
import Menu from "./menu/Menu"
import DropDown from "./dropDown/DropDown"
import BodyDiagram from "./bodyDiagram/BodyDiagram"
import HeaderDiagram from "./headerDiagram/HeaderDiagram"
import AnalyticsHeadline from "../headline/Headline"
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

    // Сюда записывается выбранная категория:
    //  "hygien" "order" "food" "study"
    const [selectCategory, setSelectCategory] = useState("hygien")

    const [data7Days, setData7Days] = useState({
        hygien: {
            enCategory: "hygien",
            "one": {
                date: {
                    count: "1.10 – 7.10",
                    dataDays: {
                        one: { date: 1, data: 7 },
                        two: { date: 2, data: 9 },
                        three: { date: 3, data: 14 },
                        four: { date: 4, data: 11 },
                        five: { date: 5, data: 18 },
                        six: { date: 6, data: 5 },
                        seven: { date: 7, data: 13 }
                    }
                }
            },
            "two": {
                date: {
                    count: "8.10 – 14.10",
                    dataDays: {
                        one: { date: 8, data: 10 },
                        two: { date: 9, data: 8 },
                        three: { date: 10, data: 16 },
                        four: { date: 11, data: 12 },
                        five: { date: 12, data: 19 },
                        six: { date: 13, data: 6 },
                        seven: { date: 14, data: 14 }
                    }
                }
            },
            "three": {
                date: {
                    count: "15.10 – 21.10",
                    dataDays: {
                        one: { date: 15, data: 15 },
                        two: { date: 16, data: 11 },
                        three: { date: 17, data: 9 },
                        four: { date: 18, data: 13 },
                        five: { date: 19, data: 17 },
                        six: { date: 20, data: 4 },
                        seven: { date: 21, data: 12 }
                    }
                }
            },
            "four": {
                date: {
                    count: "22.10 – 28.10",
                    dataDays: {
                        one: { date: 22, data: 20 },
                        two: { date: 23, data: 18 },
                        three: { date: 24, data: 7 },
                        four: { date: 25, data: 10 },
                        five: { date: 26, data: 16 },
                        six: { date: 27, data: 8 },
                        seven: { date: 28, data: 15 }
                    }
                }
            }
        },

        food: {
            enCategory: "food",
            "one": {
                date: {
                    count: "1.10 – 7.10",
                    dataDays: {
                        one: { date: 1, data: 6 },
                        two: { date: 2, data: 12 },
                        three: { date: 3, data: 9 },
                        four: { date: 4, data: 17 },
                        five: { date: 5, data: 14 },
                        six: { date: 6, data: 5 },
                        seven: { date: 7, data: 11 }
                    }
                }
            },
            "two": {
                date: {
                    count: "8.10 – 14.10",
                    dataDays: {
                        one: { date: 8, data: 8 },
                        two: { date: 9, data: 13 },
                        three: { date: 10, data: 10 },
                        four: { date: 11, data: 19 },
                        five: { date: 12, data: 7 },
                        six: { date: 13, data: 16 },
                        seven: { date: 14, data: 12 }
                    }
                }
            },
            "three": {
                date: {
                    count: "15.10 – 21.10",
                    dataDays: {
                        one: { date: 15, data: 14 },
                        two: { date: 16, data: 6 },
                        three: { date: 17, data: 18 },
                        four: { date: 18, data: 9 },
                        five: { date: 19, data: 15 },
                        six: { date: 20, data: 11 },
                        seven: { date: 21, data: 20 }
                    }
                }
            },
            "four": {
                date: {
                    count: "22.10 – 28.10",
                    dataDays: {
                        one: { date: 22, data: 5 },
                        two: { date: 23, data: 10 },
                        three: { date: 24, data: 13 },
                        four: { date: 25, data: 7 },
                        five: { date: 26, data: 12 },
                        six: { date: 27, data: 18 },
                        seven: { date: 28, data: 9 }
                    }
                }
            }
        },

        order: {
            enCategory: "order",
            "one": {
                date: {
                    count: "1.10 – 7.10",
                    dataDays: {
                        one: { date: 1, data: 9 },
                        two: { date: 2, data: 7 },
                        three: { date: 3, data: 11 },
                        four: { date: 4, data: 15 },
                        five: { date: 5, data: 13 },
                        six: { date: 6, data: 6 },
                        seven: { date: 7, data: 16 }
                    }
                }
            },
            "two": {
                date: {
                    count: "8.10 – 14.10",
                    dataDays: {
                        one: { date: 8, data: 12 },
                        two: { date: 9, data: 5 },
                        three: { date: 10, data: 14 },
                        four: { date: 11, data: 8 },
                        five: { date: 12, data: 19 },
                        six: { date: 13, data: 10 },
                        seven: { date: 14, data: 17 }
                    }
                }
            },
            "three": {
                date: {
                    count: "15.10 – 21.10",
                    dataDays: {
                        one: { date: 15, data: 13 },
                        two: { date: 16, data: 18 },
                        three: { date: 17, data: 6 },
                        four: { date: 18, data: 11 },
                        five: { date: 19, data: 9 },
                        six: { date: 20, data: 20 },
                        seven: { date: 21, data: 8 }
                    }
                }
            },
            "four": {
                date: {
                    count: "22.10 – 28.10",
                    dataDays: {
                        one: { date: 22, data: 16 },
                        two: { date: 23, data: 14 },
                        three: { date: 24, data: 10 },
                        four: { date: 25, data: 7 },
                        five: { date: 26, data: 18 },
                        six: { date: 27, data: 12 },
                        seven: { date: 28, data: 15 }
                    }
                }
            }
        },

        study: {
            enCategory: "study",
            "one": {
                date: {
                    count: "1.10 – 7.10",
                    dataDays: {
                        one: { date: 1, data: 11 },
                        two: { date: 2, data: 8 },
                        three: { date: 3, data: 16 },
                        four: { date: 4, data: 13 },
                        five: { date: 5, data: 5 },
                        six: { date: 6, data: 17 },
                        seven: { date: 7, data: 9 }
                    }
                }
            },
            "two": {
                date: {
                    count: "8.10 – 14.10",
                    dataDays: {
                        one: { date: 8, data: 7 },
                        two: { date: 9, data: 12 },
                        three: { date: 10, data: 14 },
                        four: { date: 11, data: 10 },
                        five: { date: 12, data: 18 },
                        six: { date: 13, data: 6 },
                        seven: { date: 14, data: 15 }
                    }
                }
            },
            "three": {
                date: {
                    count: "15.10 – 21.10",
                    dataDays: {
                        one: { date: 15, data: 19 },
                        two: { date: 16, data: 9 },
                        three: { date: 17, data: 8 },
                        four: { date: 18, data: 16 },
                        five: { date: 19, data: 12 },
                        six: { date: 20, data: 7 },
                        seven: { date: 21, data: 11 }
                    }
                }
            },
            "four": {
                date: {
                    count: "22.10 – 28.10",
                    dataDays: {
                        one: { date: 22, data: 10 },
                        two: { date: 23, data: 15 },
                        three: { date: 24, data: 13 },
                        four: { date: 25, data: 18 },
                        five: { date: 26, data: 14 },
                        six: { date: 27, data: 9 },
                        seven: { date: 28, data: 6 }
                    }
                }
            }
        }
    });


    // У нас есть объект data7Days и дальше будут хуки по выбору активных данных
   
    // У нас в массиве data7Days категории, а у этих категорий имеется подкатегории
    // с данными "first", "two", "three", "four" -- именнл они представлены в 
    // константе namesTimeInterval
    const namesTimeInterval = ["one", "two", "three", "four"];

    // Константа selectIndexNameTimeInterval -- это индекс выбранной подкатегории из
    // константы namesTimeInterval. Мы фиксируем не выбранную подкатегорию, а ее индекс
    const [selectIndexNameTimeInterval, setSelectIndexNameTimeInterval] = useState(0)

    // А вот здесь мы фиксируем при помощи вышеописанного название подкатегории:
    // "first", "two", "three", "four"
    const [selectTimesInterval, setSelectTimesInterval] = useState(namesTimeInterval[selectIndexNameTimeInterval]);


    // Здесь мы будем рендерить данные выбранного элемента
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

        // В переменную date мы записываем временной промежуток
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

    // Здесь мы переключаем временные отрезки выбранного элемента

    
    

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