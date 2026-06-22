// import Image from "next/image"
// import styles from "./Parent.module.css"
// import icons from "@/icons/icons"
// import Link from "next/link"
// export default function Parent() {
//     const children = [
//         {name: "Маша"},
//         {name: "Cаша"},
//         {name: "Миша"},
//         {name: "Петя"},
//         {name: "Коля"},
//         {name: "Вася"},
//         {name: "Влад"},
//         {name: "Леша"},
//         {name: "Катя"},
//     ]
//     return (
//         <div className={styles.parentOffice}>
//             <div className={styles.parentOfficeHeadlineWrapper}>
//                 <h1 className={styles.parentOfficeHeadline}>Кабинет Родителя</h1>
//             </div>

//             <div className={styles.addChildWrapper}>
//                 <span className={styles.addChild}> Добавить ребенка</span>
//                 <Image src={icons.plusBlue} className={styles.plusBlue}/>
//             </div>

//             <div className={styles.myChildrenWrapper}>
//                 <div className={styles.myChildrenHeadlineWrapper}>
//                     <h2 className={styles.myChildrenHeadline}>Мои дети</h2>
//                 </div>

//                 <div className={styles.myChildren}>
//                     <div className={styles.childWrapper}>
//                         {
//                             children.map((item, index) => {
//                                 const name = item.name;
//                                 return (
//                                     <div className={styles.child}>
//                                         <div className={styles.childNumber}>{index + 1}</div>
//                                         <span className={styles.childName}>{name}</span>

//                                         <Link className={styles.goToChild} href={`/app/parent/${index}`}>Клик</Link>
//                                     </div>
//                                 )
//                             })
//                         }
//                     </div>
                    
//                 </div>
//             </div>
//         </div>
//     )
// }



"use client"

import Image from "next/image"
import styles from "./Parent.module.css"
import icons from "@/icons/icons"
import Link from "next/link"
import { useEffect, useState } from "react"

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

export default function Parent() {
    const [children, setChildren] = useState([])
    const [err, setErr] = useState(null)

    useEffect(() => {
        async function getMyChildren() {
            const accessToken = localStorage.getItem("access_token")

            if (!accessToken) {
                setErr("Нет токена авторизации")
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

                console.log("MY CHILDREN RESULT:", result)

                if (result.data?.myChildren) {
                    setChildren(result.data.myChildren)
                    return
                }

                if (result.errors?.length) {
                    setErr(result.errors[0].message)
                    return
                }

                setErr("Не удалось загрузить детей")

            } catch (error) {
                console.log("MY CHILDREN ERROR:", error)
                setErr("Ошибка загрузки детей")
            }
        }

        getMyChildren()
    }, [])

    return (
        <div className={styles.parentOffice}>
            <div className={styles.parentOfficeHeadlineWrapper}>
                <h1 className={styles.parentOfficeHeadline}>Кабинет Родителя</h1>
            </div>

            <div className={styles.addChildWrapper}>
                <span className={styles.addChild}> Добавить ребенка</span>
                <Image src={icons.plusBlue} className={styles.plusBlue} alt="add child"/>
            </div>

            <div className={styles.myChildrenWrapper}>
                <div className={styles.myChildrenHeadlineWrapper}>
                    <h2 className={styles.myChildrenHeadline}>Мои дети</h2>
                </div>

                <div className={styles.myChildren}>
                    <div className={styles.childWrapper}>

                        {err && (
                            <div>
                                {err}
                            </div>
                        )}

                        {
                            children.map((item, index) => {
                                const name = item.profile?.name || item.email || "Ребенок"

                                return (
                                    <div className={styles.child} key={item.id}>
                                        <div className={styles.childNumber}>{index + 1}</div>
                                        <span className={styles.childName}>{name}</span>

                                        <Link 
                                            className={styles.goToChild} 
                                            href={`/app/parent/${item.id}`}
                                        >
                                            Клик
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}