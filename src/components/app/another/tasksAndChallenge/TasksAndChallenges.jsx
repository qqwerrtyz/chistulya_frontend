"use client"
import { createContext, useState } from "react"
import styles from "./TasksAndChallenges.module.css"
import iconsTasks from "../../../../../public/iconsTasks/iconsTasks";
import Header from "./header/Header";
import ProgressLine from "./progressLine/ProgressLine";
import Content from "./contentTask/Content";
// import Wrapper from "./wrapper/Wrapper"


function ShowContent ({title, flags, dailyTasks}) {
    if (!dailyTasks) return;
    if (title === "Ежедневные задания") {
        return flags.tasks && (
            <div className={styles.body}>
                
                <ProgressLine />

                <div className={styles.contentWrapper}>

                    <Content dailyTasks={dailyTasks}/>
                </div>
            </div>
        )
    } else if (title === "Челенджи") {
        return flags.challenge && (
            <div className={styles.body}>
                <ProgressLine />

                <div className={styles.contentWrapper}>
                    <Content dailyTasks={dailyTasks}/>
                </div>
            </div>
        )
    }
}


function Wrapper({title, flags, setFlags}) {
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


export default function TasksAndChallenges() {
   

    const [flags, setFlags] = useState({
        tasks: true,
        challenge: false
    })


    return (
        <div className={styles.tasksAndChallengesWrapper}>
            <div className={styles.tasksAndChallenges}>

                <div className={styles.main}>
                    <Wrapper title={"Ежедневные задания"} flags={flags} setFlags={setFlags}/>
                    <Wrapper title={"Челенджи"} flags={flags} setFlags={setFlags}/>
                </div>

            </div>
        </div>
    )
}