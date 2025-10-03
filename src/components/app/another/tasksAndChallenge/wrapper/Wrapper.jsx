"use client"
import iconsTasks from "../../../../../../public/iconsTasks/iconsTasks"
import Content from "../contentTask/Content"
import Header from "../header/Header"
import ProgressLine from "../progressLine/ProgressLine"
import { createContext, useState } from "react"
import styles from "./Wrapper.module.css"


export const DataContent = createContext(null);

function ShowContent ({title, flags, dailyTasks}) {
    if (title === "Ежедневные задания") {
        return flags.tasks && (
            <div className={styles.body}>
                <ProgressLine />

                <div className={styles.contentWrapper}>
                    <DataContent.Provider value={dailyTasks}>
                        <Content />
                    </DataContent.Provider>
                </div>
            </div>
        )
    } else if (title === "Челенджи") {
        return flags.challenge && (
            <div className={styles.body}>
                <ProgressLine />

                <div className={styles.contentWrapper}>
                    <DataContent.Provider value={dailyTasks}>
                        <Content />
                    </DataContent.Provider>
                </div>
            </div>
        )
    }
}

export default function Wrapper({title, flags, setFlags}) {
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
        <>
            <Header
                title={title} 
                flags={flags} 
                setFlags={setFlags}
            />

            {ShowContent({title, flags, dailyTasks})}
            
        </>
    )
}