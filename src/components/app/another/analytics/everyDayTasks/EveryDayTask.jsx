"use client"
import Image from "next/image"
import icons from "../../../../../../public/icons/icons"
import styles from "./EveryDayTask.module.css"
import { useEffect, useRef, useState } from "react"
import Menu from "./menu/menu"
import DropDown from "./dropDown/DropDown"
import BodyDiagram from "./bodyDiagram/BodyDiagram"
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

    const [data7Days, setData7Days] = useState({
        hygien: {
            enCategory: "hygien",
            "first": {
                date: {
                    count: "1.10 – 7.10",
                    dataDays: {
                        one: {
                            data: 12
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
                
            },

            "two": {
                date: {
                    count: "8.10 – 15.10",
                    dataDays: {
                        one: {
                            data: 14
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
            
            },

            "three": {
                date: {
                    count: "16.10 – 23.10",
                    dataDays: {
                        one: {
                            data: 12
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
            },

            "four": {
                date: {
                    count: "24.10 – 30.10",
                    dataDays: {
                        one: {
                            data: 12
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
            },
        },

        food: {
            enCategory: "food",
            "first": {
                date: {
                    count: "55.10 – 7.10",
                    dataDays: {
                        one: {
                            data: 12
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
                
            },

            "two": {
                date: {
                    count: "8.10 – 15.10",
                    dataDays: {
                        one: {
                            data: 12
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
            
            },

            "three": {
                date: {
                    count: "16.10 – 23.10",
                    dataDays: {
                        one: {
                            data: 12
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
            },

            "four": {
                date: {
                    count: "24.10 – 30.10",
                    dataDays: {
                        one: {
                            data: 12
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
            },
        },

        order: {
            enCategory: "food",
            "first": {
                date: {
                    count: "55.10 – 7.10",
                    dataDays: {
                        one: {
                            data: 12
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
                
            },

            "two": {
                date: {
                    count: "8.10 – 15.10",
                    dataDays: {
                        one: {
                            data: 12
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
            
            },

            "three": {
                date: {
                    count: "16.10 – 23.10",
                    dataDays: {
                        one: {
                            data: 12
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
            },

            "four": {
                date: {
                    count: "24.10 – 30.10",
                    dataDays: {
                        one: {
                            data: 12
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
            },
        },

        study: {
            enCategory: "food",
            "first": {
                date: {
                    count: "55.10 – 7.10",
                    dataDays: {
                        one: {
                            data: 12
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
                
            },

            "two": {
                date: {
                    count: "8.10 – 15.10",
                    dataDays: {
                        one: {
                            data: 12
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
            
            },

            "three": {
                date: {
                    count: "16.10 – 23.10",
                    dataDays: {
                        one: {
                            data: 12
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
            },

            "four": {
                date: {
                    count: "24.10 – 30.10",
                    dataDays: {
                        one: {
                            data: 12
                        },

                        two: {
                            data: 14
                        },

                        three: {
                            data: 15
                        },

                        four: {
                            data: 16
                        },

                        five: {
                            data: 17
                        },

                        six: {
                            data: 12
                        },

                        seven: {
                            data: 12
                        }
                    }
                },
            },
        }
        
    })

    const namesTimeInterval = ["first", "two", "three", "four"];
    const [selectIndexNameTimeInterval, setSelectIndexNameTimeInterval] = useState(0)
    const [selectTimesInterval, setSelectTimesInterval] = useState(namesTimeInterval[selectIndexNameTimeInterval]);


    const arrowLeftRef = useRef(null);
    const arrowRightRef = useRef(null)

    // Здесь мы будем рендерить данные выбранного элемента
    function renderEveryDayTaskResult(arr, selectCategory, selectTimesInterval) {
        const resultObj = {
            date: null
        }

        resultObj.date = arr[selectCategory]?.[selectTimesInterval]?.date?.count


        return resultObj
        
    }

    // Здесь мы переключаем временные отрезки выбранного элемента

    function handleRefLeft() {
        if (selectIndexNameTimeInterval > 0 ) {
            const newIndex = selectIndexNameTimeInterval - 1;
            setSelectIndexNameTimeInterval(newIndex);
            setSelectTimesInterval(namesTimeInterval[newIndex]);

            
        }
    }

    function handleRefRight() {
        
        if (selectIndexNameTimeInterval < namesTimeInterval.length -1 ) {
            const newIndex = selectIndexNameTimeInterval + 1;
            setSelectIndexNameTimeInterval(newIndex);
            setSelectTimesInterval(namesTimeInterval[newIndex]);

            
        }
    }

    

    return (
        <div className={styles.everyDayTaskWrapper}>
            <div className={styles.everyDayTask}>

                <Menu 
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    dataDayTasks={dataDayTasks}
                
                />
                {
                    isOpen && (
                        <DropDown
                            dataDayTasks={dataDayTasks}
                            setDataDayTasks={setDataDayTasks}
                            setSelectCategory={setSelectCategory}

                        />
                    )
                }

                <div className={styles.everyDayTaskBodyWrapper}>
                    <div className={styles.everyDayTaskBody}>

                        
                        <div className={styles.everyDayTaskBodyHeader}>
                            <div className={styles.everyDayTaskBodyTitleWrapper}>
                                <span className={styles.everyDayTaskBodyTitle} onClick={() => console.log(selectIndexNameTimeInterval)}>
                                    {renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).date}
                                </span>
                            </div>

                            <div className={styles.everyDayTaskBodyGoAndBack}>
                                <div
                                    className={styles.everyDayTaskBodyArrow}
                                    onClick={() => handleRefLeft()}
                                >   
                                    {
                                        selectIndexNameTimeInterval === 0 ? (

                                            <Image src={icons.arrowLeftWhite}/>
                                        ) : (
                                            <Image src={icons.arrowLeftBlue}/>
                                            
                                        )       
                                    }
                                </div>

                                <div
                                    className={styles.everyDayTaskBodyArrow}
                                    onClick={() => handleRefRight()}
                                >

                                    {
                                        selectIndexNameTimeInterval === namesTimeInterval.length -1 ? (

                                            <Image src={icons.arrowRightWhite}/>

                                        ) : (
                                            <Image src={icons.arrowRightBlue}/>                                            
                                        )       
                                    }
                                </div>
                            </div>
                        </div>


                        <BodyDiagram />

                    </div>
                     
                </div>
                

            </div>
        </div>
    )
}