// "use client"

// import Image from "next/image"
// import styles from "./Child.module.css"
// import { useParams } from "next/navigation"
// import icons from "../../../../icons/icons"
// import TasksAndChallenges from "@/components/app/another/tasksAndChallenge/TasksAndChallenges"
// import EveryDayTask from "@/components/app/another/analytics/everyDayTasks/EveryDayTask"
// import Chellenge from "@/components/app/another/analytics/chellenge/Chellenge"
// import TaskAndChallengesParent from "@/components/app/parent/TaskAndChallengesParent"
// import EveryDayTaskParent from "@/components/app/parent/EveryDayTaskParent"
// import ChellengeParent from "@/components/app/parent/ChellengeParent"

// export default function MyChild() {
//     const { child } = useParams()
//     return (
//         <div className={styles.myChildWrapper}>
//             <div className={styles.myChild}>
//                 <div className={styles.myChildHeader}>
//                     <div className={styles.nameChildWrapper}>
//                         <h1 className={styles.nameChild}>Ребенок Саша</h1>
//                     </div>

//                     <div className={styles.backWrapper}>
//                         <Image src={icons.backNotificationBlue} className={styles.back}/>
//                     </div>

//                     <div className={styles.customTaskWrapper}>
//                         <span className={styles.customTask}>Кастомное задание</span>
//                          <Image src={icons.plusBlue} className={styles.customTaskPlus}/>
//                     </div>

//                     <div className={styles.addNotificationWrapper}>
//                         <span className={styles.addNotification}>Напоминание</span>
//                         <Image src={icons.plusBlue} className={styles.customTaskPlus}/>
//                     </div>
//                 </div>

//                 <div className={styles.myChildBody}>
//                     <TaskAndChallengesParent childId={child}/>
                    
//                 </div>

//                 <div className={styles.myChildAnalytics}>
//                     <div className={styles.everyDayTaskWrapper}>
//                         <EveryDayTaskParent childId={child}/>
//                     </div>
//                     <div className={styles.chellengeWrapper}>
//                         <ChellengeParent childId={child}/>
//                     </div>
//                 </div>
//             </div>
//         </div>
        
//     )
// }



"use client"

import Image from "next/image"
import styles from "./Child.module.css"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import icons from "../../../../icons/icons"
import TasksAndChallenges from "@/components/app/another/tasksAndChallenge/TasksAndChallenges"
import EveryDayTask from "@/components/app/another/analytics/everyDayTasks/EveryDayTask"
import Chellenge from "@/components/app/another/analytics/chellenge/Chellenge"
import TaskAndChallengesParent from "@/components/app/parent/TaskAndChallengesParent"
import EveryDayTaskParent from "@/components/app/parent/EveryDayTaskParent"
import ChellengeParent from "@/components/app/parent/ChellengeParent"
import AddNotificationParent from "@/components/app/parent/AddNotificationParent"

const MY_CHILDREN_QUERY = `
    query MyChildren {
        myChildren {
            id
            email
            profile {
                name
                role
            }
        }
    }
`

export default function MyChild() {
    const { child } = useParams()

    const [childName, setChildName] = useState("");
    const [showAddNotification, setShowAddNotification] = useState(false);

    useEffect(() => {
        async function getChildName() {
            const accessToken = localStorage.getItem("access_token")

            if (!accessToken) {
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
                        query: MY_CHILDREN_QUERY
                    })
                })

                const result = await response.json()

                console.log("MY CHILDREN FOR CHILD PAGE RESULT:", result)

                const currentChild = result.data?.myChildren?.find(item => item.id === child)

                if (currentChild) {
                    setChildName(currentChild.profile?.name || currentChild.email || "Ребенок")
                }

            } catch (error) {
                console.log("GET CHILD NAME ERROR:", error)
            }
        }

        getChildName()
    }, [child])

    return (
        <div className={styles.myChildWrapper}>
            <div className={styles.myChild}>
                <div className={styles.myChildHeader}>
                    <div className={styles.nameChildWrapper}>
                        <h1 className={styles.nameChild}>
                            Ребенок {childName || ""}
                        </h1>
                    </div>

                    <div className={styles.backWrapper}>
                        <Image src={icons.backNotificationBlue} className={styles.back}/>
                    </div>

                    <div className={styles.customTaskWrapper}>
                        <span className={styles.customTask}>Кастомное задание</span>
                         <Image src={icons.plusBlue} className={styles.customTaskPlus}/>
                    </div>

                    <div onClick={() => setShowAddNotification(prev => !prev)} className={styles.addNotificationWrapper}>
                        <span className={styles.addNotification}>Напоминание</span>
                        <Image src={icons.plusBlue} className={styles.customTaskPlus}/>
                    </div>
                </div>

                <div className={styles.myChildBody}>
                    <TaskAndChallengesParent childId={child}/>
                </div>
                
                <div className={styles.myChildAnalytics}>
                    <div className={styles.everyDayTaskWrapper}>
                        <EveryDayTaskParent childId={child}/>
                    </div>
                    <div className={styles.chellengeWrapper}>
                        <ChellengeParent childId={child}/>
                    </div>
                </div>
            </div>

            {showAddNotification && (
                <AddNotificationParent 
                    childId={child}
                    setShowAddNotification={setShowAddNotification}
                />
            )}
        </div>
    )
}