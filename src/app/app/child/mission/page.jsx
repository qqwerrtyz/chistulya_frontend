"use client"
import Menu from "@/components/app/another/menu/Menu"
import styles from "./Mission.module.css"
import { createContext, useState } from "react"
import ContentHeader from "@/components/app/another/tasksAndChallenge/contentTask/contentHeader/ContentHeader"
import ContentBody from "@/components/app/another/tasksAndChallenge/contentTask/contentBody/ContentBody"
import iconsTasks from "../../../../../public/iconsTasks/iconsTasks"


export default function Mission() {
    
    
    const menuItem = {
        itemOne: {
            ru: "Ежедневные",
            en: "everyday"
        },
        itemTwo: {
            ru: "Челленджи",
            en: "challenge"
        },
    }
    // Сюда записывается активное значение из menuItem (куда тыкнул пользователь:
    // на ежедневные или на челленджи)
    const [isActive, setIsActive] = useState(menuItem.itemOne.en)

    // Здесь показываетя на что тыкнуто (гигиена, порядок, еда или учеба)
    const [selectValue, setSelectValue] = useState("hygiene")

    const dailyTasks = {
        hygiene: {
            name: "Гигиена",
            items: [
                 {   
            img: iconsTasks.brushTeeth,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "take"  
        },

        {   
            img: iconsTasks.hairbrush,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "fulfill"  
        },

        {   
            img: iconsTasks.hairbrush,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "fulfill"  
        },

        {   
            img: iconsTasks.hairbrush,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "fulfill"  
        },

        {   
            img: iconsTasks.hairbrush,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "fulfill"  
        },

        {   
            img: iconsTasks.hairbrush,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "fulfill"  
        },

        {   
            img: iconsTasks.hairbrush,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "fulfill"  
        },

        {   
            img: iconsTasks.hairbrush,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "fulfill"  
        },

        {   
            img: iconsTasks.hairbrush,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "fulfill"  
        },

        {   
            img: iconsTasks.hand,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "done"  
        },

        {   
            img: iconsTasks.brushTeeth,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "done"  
        },

        {   
            img: iconsTasks.hand,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "take"  
        },
            ]
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
    const challengeTasks = {
        hygiene: {
            name: "Гигиена",
            items: [
                 {   
            img: iconsTasks.brushTeeth,
            title: "Чистка зубов Челленджи",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "take"  
        },

        {   
            img: iconsTasks.hairbrush,
            title: "Чистка зубов Челленджи",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "fulfill"  
        },

        {   
            img: iconsTasks.hairbrush,
            title: "Чистка зубов Челленджи",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "fulfill"  
        },

        {   
            img: iconsTasks.hairbrush,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "fulfill"  
        },

        {   
            img: iconsTasks.hairbrush,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "fulfill"  
        },

        {   
            img: iconsTasks.hairbrush,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "fulfill"  
        },

        {   
            img: iconsTasks.hairbrush,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "fulfill"  
        },

        {   
            img: iconsTasks.hand,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "done"  
        },

        {   
            img: iconsTasks.brushTeeth,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "done"  
        },

        {   
            img: iconsTasks.hand,
            title: "Чистка зубов",
            short: "Днем и вечером",
            description: "Lorem ipsum dolor sit amet consectetur. Ac dictumst risus elit mattis at vitae ut tincidunt. Orci consequat sed ut scelerisque nullam nulla vel eget duis.",
            reward: {
                coins: 20,
                xp: 140
            },

            // status: done -- выполнено и получена награда
            // statis: fulfill -- выполнить (еще не начал),
            // status: take -- получить награду
            status: "take"  
        },
            ]
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

    
    
    

    return (
        <div className={styles.missionPageWrapper}>
            <div className={styles.missionPage}>
                <div className={styles.menuWrapprt}>
                    <Menu 
                        itemOne={menuItem.itemOne} 
                        itemTwo={menuItem.itemTwo}
                        isActive={isActive}
                        setIsActive={setIsActive}
                    />
                </div>

                <div className={styles.contentWrapper}>
                    <div className={styles.content}>
                            <div className={styles.headerWrapper}>
                                <ContentHeader 
                                    selectValue={selectValue}
                                    setSelectValue={setSelectValue}
                                    firstData={dailyTasks}
                                    challengeTasks={challengeTasks}
                                />
                            </div>

                            <div className={styles.bodyWrapper}>
                                <div className={styles.body}>
                                    <ContentBody
                                        type={"mission"}
                                        selectValue={selectValue}
                                        firstData={dailyTasks}
                                        secondData={challengeTasks}
                                        isActive={isActive}
                                    />
                                </div>
                            </div>
                    </div>
                    
                </div>

            </div>
        </div>
    )
}