// // "use client"
// // import Menu from "@/components/app/another/menu/Menu"
// // import styles from "./Shop.module.css"
// // import { useState } from "react"
// // import iconsTasks from "../../../../../public/iconsTasks/iconsTasks"
// // import BodyAchievements from "@/components/app/shop/achievements/BodyAchievements"
// // import Avatar from "@/components/app/child/avatar/Avatar"
// // import BodyPetRoom from "@/components/app/shop/petRoom/BodyPetRoom"
// // export default function Shop() {
// //     const menuItem = {
// //         itemOne: {
// //             ru: "Ачивки",
// //             en: "achievements"
// //         },
// //         itemTwo: {
// //             ru: "Комната питомца",
// //             en: "petRoom"
// //         },
// //     }

// //     const [isActive, setIsActive] = useState(menuItem.itemOne.en);

// //     const achievementsList = [
// //         {   
// //             id: 1,
// //             img: iconsTasks.brushTeeth,
// //             ruName: "Мыть руки",
// //             enName: "handWashing",
// //             reward: {
// //                 coin: 22,
// //                 xp: null
// //             },
// //             // received -- получено
// //             // reward -- награда
// //             // notAvailable -- не доступно
// //             status: "reward"
// //         },

// //         {   
// //             id: 2,
// //             img: iconsTasks.brushTeeth,
// //             ruName: "Мыть ноги",
// //             enName: "assWashing",
// //             reward: {
// //                 coin: 20,
// //                 xp: 30
// //             },
// //             // received -- получено
// //             // reward -- награда
// //             // notAvailable -- не доступно
// //             status: "notAvailable"
// //         },

// //         {   
// //             id: 3,
// //             img: iconsTasks.brushTeeth,
// //             ruName: "Мыть зубы",
// //             enName: "handWashing",
// //             reward: {
// //                 coin: 20,
// //                 xp: 30
// //             },
// //             // received -- получено
// //             // reward -- награда
// //             // notAvailable -- не доступно
// //             status: "received"
// //         },

// //         {   
// //             id: 4,
// //             img: iconsTasks.brushTeeth,
// //             ruName: "Мыть руки",
// //             enName: "handWashing",
// //             reward: {
// //                 coin: 20,
// //                 xp: 30
// //             },
// //             // received -- получено
// //             // reward -- награда
// //             // notAvailable -- не доступно
// //             status: "reward"
// //         },

// //         {   
// //             id: 5,
// //             img: iconsTasks.brushTeeth,
// //             ruName: "Мыть руки",
// //             enName: "handWashing",
// //             reward: {
// //                 coin: 22,
// //                 xp: null
// //             },
// //             // received -- получено
// //             // reward -- награда
// //             // notAvailable -- не доступно
// //             status: "reward"
// //         },

// //         {   
// //             id: 6,
// //             img: iconsTasks.brushTeeth,
// //             ruName: "Мыть ноги",
// //             enName: "assWashing",
// //             reward: {
// //                 coin: 20,
// //                 xp: 30
// //             },
// //             // received -- получено
// //             // reward -- награда
// //             // notAvailable -- не доступно
// //             status: "notAvailable"
// //         },

// //         {   
// //             id: 7,
// //             img: iconsTasks.brushTeeth,
// //             ruName: "Мыть зубы",
// //             enName: "handWashing",
// //             reward: {
// //                 coin: 20,
// //                 xp: 30
// //             },
// //             // received -- получено
// //             // reward -- награда
// //             // notAvailable -- не доступно
// //             status: "received"
// //         },

// //         {   
// //             id: 8,
// //             img: iconsTasks.brushTeeth,
// //             ruName: "Мыть руки",
// //             enName: "handWashing",
// //             reward: {
// //                 coin: 22,
// //                 xp: null
// //             },
// //             // received -- получено
// //             // reward -- награда
// //             // notAvailable -- не доступно
// //             status: "reward"
// //         },

// //         {   
// //             id: 9,
// //             img: iconsTasks.brushTeeth,
// //             ruName: "Мыть ноги",
// //             enName: "assWashing",
// //             reward: {
// //                 coin: 20,
// //                 xp: 30
// //             },
// //             // received -- получено
// //             // reward -- награда
// //             // notAvailable -- не доступно
// //             status: "notAvailable"
// //         },

// //         {   
// //             id: 10,
// //             img: iconsTasks.brushTeeth,
// //             ruName: "Мыть зубы",
// //             enName: "handWashing",
// //             reward: {
// //                 coin: 20,
// //                 xp: 30
// //             },
// //             // received -- получено
// //             // reward -- награда
// //             // notAvailable -- не доступно
// //             status: "received"
// //         },

// //         {   
// //             id: 11,
// //             img: iconsTasks.brushTeeth,
// //             ruName: "Мыть руки",
// //             enName: "handWashing",
// //             reward: {
// //                 coin: 22,
// //                 xp: null
// //             },
// //             // received -- получено
// //             // reward -- награда
// //             // notAvailable -- не доступно
// //             status: "reward"
// //         },

// //         {   
// //             id: 12,
// //             img: iconsTasks.brushTeeth,
// //             ruName: "Мыть ноги",
// //             enName: "assWashing",
// //             reward: {
// //                 coin: 20,
// //                 xp: 30
// //             },
// //             // received -- получено
// //             // reward -- награда
// //             // notAvailable -- не доступно
// //             status: "notAvailable"
// //         },

// //         {   
// //             id: 13,
// //             img: iconsTasks.brushTeeth,
// //             ruName: "Мыть зубы",
// //             enName: "handWashing",
// //             reward: {
// //                 coin: 20,
// //                 xp: 30
// //             },
// //             // received -- получено
// //             // reward -- награда
// //             // notAvailable -- не доступно
// //             status: "received"
// //         },
// //     ]

// //     const itemsList = [
// //         {
// //             ruNameCategory: "Предметы",
// //             enNameCategory: "items",
// //             product: [
// //                 {
// //                     id: 1,
// //                     img: iconsTasks.brushTeeth,
// //                     name: "Диван",
// //                     price: 10,
// //                     status: {
// //                         // buy -- куплен или не куплен предмет
// //                         buy: true,
// //                         // active -- установлен как активный или нет
// //                         active: false
// //                     }
// //                 },

// //                 {
// //                     id: 2,
// //                     img: iconsTasks.brushTeeth,
// //                     name: "Диван",
// //                     price: 12,
// //                     status: {
// //                         // buy -- куплен или не куплен предмет
// //                         buy: true,
// //                         // active -- установлен как активный или нет
// //                         active: true
// //                     }
// //                 },
// //             ]
// //         },

// //         {
// //             ruNameCategory: "Фоны",
// //             enNameCategory: "fill",
// //             product: [
// //                 {
// //                     id: 1,
// //                     img: iconsTasks.brushTeeth,
// //                     name: "Серый",
// //                     price: 10,
// //                     status: {
// //                         // buy -- куплен или не куплен предмет
// //                         buy: true,
// //                         // active -- установлен как активный или нет
// //                         active: false
// //                     }
// //                 },

// //                 {
// //                     id: 2,
// //                     img: iconsTasks.brushTeeth,
// //                     name: "лес",
// //                     price: 12,
// //                     status: {
// //                         // buy -- куплен или не куплен предмет
// //                         buy: false,
// //                         // active -- установлен как активный или нет
// //                         active: false
// //                     }
// //                 },
// //             ]
// //         }
// //     ]

// //     return (
// //         <div className={styles.shopPageWrapper}>
// //             <div className={styles.shopPage}>

// //                 <div className={styles.menuWrapper}>
// //                     <Menu
// //                         itemOne={menuItem.itemOne} 
// //                         itemTwo={menuItem.itemTwo}
// //                         isActive={isActive}
// //                         setIsActive={setIsActive}
// //                     />
// //                 </div>

// //                 {
// //                     isActive === "petRoom" && (
// //                         <div className={styles.petRoomAvatarWrapper}>
// //                             <Avatar />
// //                         </div>
// //                     )
// //                 }

                    
// //                 {
// //                     isActive === "achievements" && (
// //                         <div className={styles.shopAchievementsBodyWrapper}>

// //                             <BodyAchievements 
// //                                 dataList={achievementsList}
// //                             />
// //                         </div>

// //                     )
// //                 }


// //                 {
// //                     isActive === "petRoom" && (
// //                         <div className={styles.shopPetRoomBodyWrapper}>
                           
// //                             <BodyPetRoom 
// //                                 dataList={itemsList}
// //                             />
// //                         </div>
// //                     )
// //                 }

// //             </div>
// //         </div>
// //     )
// // }


// "use client"

// import Menu from "@/components/app/another/menu/Menu"
// import styles from "./Shop.module.css"
// import { useEffect,useRef, useState } from "react"
// import iconsTasks from "../../../../../public/iconsTasks/iconsTasks"
// import BodyAchievements from "@/components/app/shop/achievements/BodyAchievements"
// import Avatar from "@/components/app/child/avatar/Avatar"
// import BodyPetRoom from "@/components/app/shop/petRoom/BodyPetRoom"


// const MY_ACHIEVEMENTS_QUERY = `
//   query MyAchievementsDebug {
//     myAchievements {
//       status
//       completed_at
//       reward_claimed_at
//       achievement {
//         id
//         title
//         short_description
//         description
//         is_available
//         reward_xp
//         reward_coins
//       }
//     }
//   }
// `

// const PET_ITEM_CATEGORIES_QUERY = `
//   query PetItemCategoriesDebug {
//     petItemCategories {
//       id
//       slug
//       title
//       order_column
//     }
//   }
// `

// const PET_CATALOG_QUERY = `
//   query PetCatalogDebug {
//     petCatalog(page: 1, per_page: 100) {
//       data {
//         id
//         title
//         short_description
//         description
//         is_available
//         price
//         category {
//           id
//           slug
//           title
//           order_column
//         }
//       }
//     }
//   }
// `

// const MY_PET_ITEMS_QUERY = `
//   query MyPetItemsDebug {
//     myPetItems {
//       pet_item_id
//       is_equipped
//       purchased_at
//       pet_item {
//         id
//       }
//     }
//   }
// `
// function mapAchievementStatus(item) {
//     if (item.status === "reward_claimed") {
//         return "received"
//     }

//     if (item.status === "completed") {
//         return "reward"
//     }

//     return "notAvailable"
// }

// function prepareAchievements(data) {
//     const achievements = data?.myAchievements || []

//     return achievements.map((item) => {
//         const achievement = item.achievement

//         return {
//             id: achievement.id,
//             img: iconsTasks.brushTeeth,
//             ruName: achievement.title,
//             enName: achievement.id,
//             reward: {
//                 coin: achievement.reward_coins || 0,
//                 xp: achievement.reward_xp || null
//             },
//             status: achievement.is_available ? mapAchievementStatus(item) : "notAvailable"
//         }
//     })
// }

// function preparePetRoomItems(data) {
//     const categories = data?.petItemCategories || []
//     const catalogItems = data?.petCatalog?.data || []
//     const myPetItems = data?.myPetItems || []

//     const ownedItems = {}

//     myPetItems.forEach((item) => {
//         ownedItems[item.pet_item_id] = item
//     })

//     const result = categories.map((category) => {
//         return {
//             ruNameCategory: category.title,
//             enNameCategory: category.slug,
//             product: []
//         }
//     })

//     catalogItems.forEach((item) => {
//         const categorySlug = item.category?.slug || "items"
//         const categoryTitle = item.category?.title || "Предметы"

//         let categoryGroup = result.find((category) => {
//             return category.enNameCategory === categorySlug
//         })

//         if (!categoryGroup) {
//             categoryGroup = {
//                 ruNameCategory: categoryTitle,
//                 enNameCategory: categorySlug,
//                 product: []
//             }

//             result.push(categoryGroup)
//         }

//         const ownedItem = ownedItems[item.id]

//         categoryGroup.product.push({
//             id: item.id,
//             img: iconsTasks.brushTeeth,
//             name: item.title,
//             price: item.price,
//             status: {
//                 buy: Boolean(ownedItem),
//                 active: Boolean(ownedItem?.is_equipped)
//             }
//         })
//     })

//     return result
// }

// export default function Shop() {
//     const menuItem = {
//         itemOne: {
//             ru: "Ачивки",
//             en: "achievements"
//         },
//         itemTwo: {
//             ru: "Комната питомца",
//             en: "petRoom"
//         },
//     }

//     const [isActive, setIsActive] = useState(menuItem.itemOne.en)
//     const [achievementsList, setAchievementsList] = useState([])
//     const [itemsList, setItemsList] = useState([])
//     const [err, setErr] = useState(null)
//     const didLoad = useRef(false)

//     async function graphqlDebugRequest(name, query) {
//     const accessToken = localStorage.getItem("access_token")

//     console.log(`START QUERY: ${name}`)

//     const response = await fetch(GRAPHQL_URL, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${accessToken}`
//         },
//         body: JSON.stringify({
//             query
//         })
//     })

//     const result = await response.json()

//     console.log(`STATUS QUERY: ${name}`, response.status)
//     console.log(`RESULT QUERY: ${name}`, JSON.stringify(result, null, 2))

//     if (result.errors?.length) {
//         console.error(`ERROR IN QUERY: ${name}`, JSON.stringify(result.errors, null, 2))
//     }

//     return result
// }

//     useEffect(() => {
//     if (didLoad.current) {
//         return
//     }

//     didLoad.current = true

//     async function getShopData() {
//         const accessToken = localStorage.getItem("access_token")

//         if (!accessToken) {
//             setErr("Нет токена авторизации")
//             return
//         }

//         try {
//             const achievementsResult = await graphqlDebugRequest(
//                 "MY_ACHIEVEMENTS_QUERY",
//                 MY_ACHIEVEMENTS_QUERY
//             )

//             console.log("ACHIEVEMENTS FULL RESULT:", achievementsResult)

//         } catch (error) {
//             console.error("SHOP DEBUG ERROR:", error)
//             setErr("Ошибка загрузки магазина")
//         }
//     }

//     getShopData()
// }, [])

//     return (
//         <div className={styles.shopPageWrapper}>
//             <div className={styles.shopPage}>

//                 <div className={styles.menuWrapper}>
//                     <Menu
//                         itemOne={menuItem.itemOne} 
//                         itemTwo={menuItem.itemTwo}
//                         isActive={isActive}
//                         setIsActive={setIsActive}
//                     />
//                 </div>

//                 {err && (
//                     <div>
//                         {err}
//                     </div>
//                 )}

//                 {
//                     isActive === "petRoom" && (
//                         <div className={styles.petRoomAvatarWrapper}>
//                             <Avatar />
//                         </div>
//                     )
//                 }

//                 {
//                     isActive === "achievements" && (
//                         <div className={styles.shopAchievementsBodyWrapper}>
//                             <BodyAchievements 
//                                 dataList={achievementsList}
//                             />
//                         </div>
//                     )
//                 }

//                 {
//                     isActive === "petRoom" && (
//                         <div className={styles.shopPetRoomBodyWrapper}>
//                             <BodyPetRoom 
//                                 dataList={itemsList}
//                             />
//                         </div>
//                     )
//                 }

//             </div>
//         </div>
//     )
// }


"use client"

import { GRAPHQL_URL } from "@/config/publicEnv"
import Menu from "@/components/app/another/menu/Menu"
import styles from "./Shop.module.css"
import { useEffect, useRef, useState } from "react"
import iconsTasks from "../../../../../public/iconsTasks/iconsTasks"
import BodyAchievements from "@/components/app/shop/achievements/BodyAchievements"
import Avatar from "@/components/app/child/avatar/Avatar"
import BodyPetRoom from "@/components/app/shop/petRoom/BodyPetRoom"

// ===================== QUERIES =====================

const MY_ACHIEVEMENTS_QUERY = `
  query MyAchievementsDebug {
    myAchievements {
      status
      completed_at
      reward_claimed_at
      achievement {
        id
        title
        short_description
        description
        is_available
        reward_xp
        reward_coins
      }
    }
  }
`

const PET_ITEM_CATEGORIES_QUERY = `
  query PetItemCategoriesDebug {
    petItemCategories {
      id
      slug
      title
      order_column
    }
  }
`

const PET_CATALOG_QUERY = `
  query PetCatalogDebug {
    petCatalog(page: 1, per_page: 100) {
      data {
        id
        title
        short_description
        description
        is_available
        price
        category {
          id
          slug
          title
          order_column
        }
      }
    }
  }
`

const MY_PET_ITEMS_QUERY = `
  query MyPetItemsDebug {
    myPetItems {
      pet_item_id
      is_equipped
      purchased_at
      pet_item {
        id
      }
    }
  }
`

// ===================== MAPPERS =====================

function mapAchievementStatus(item) {
    if (item.status === "reward_claimed") {
        return "received"
    }

    if (item.status === "completed") {
        return "reward"
    }

    return "notAvailable"
}

function prepareAchievements(data) {
    const achievements = data?.myAchievements || []

    return achievements.map((item) => {
        const achievement = item.achievement

        return {
            id: achievement.id,
            img: iconsTasks.brushTeeth,
            ruName: achievement.title,
            enName: achievement.id,
            reward: {
                coin: achievement.reward_coins || 0,
                xp: achievement.reward_xp || null
            },
            status: achievement.is_available ? mapAchievementStatus(item) : "notAvailable"
        }
    })
}

function preparePetRoomItems(data) {
    const categories = data?.petItemCategories || []
    const catalogItems = data?.petCatalog?.data || []
    const myPetItems = data?.myPetItems || []

    const ownedItems = {}

    myPetItems.forEach((item) => {
        ownedItems[item.pet_item_id] = item
    })

    const result = categories.map((category) => {
        return {
            ruNameCategory: category.title,
            enNameCategory: category.slug,
            product: []
        }
    })

    catalogItems.forEach((item) => {
        const categorySlug = item.category?.slug || "items"
        const categoryTitle = item.category?.title || "Предметы"

        let categoryGroup = result.find((category) => {
            return category.enNameCategory === categorySlug
        })

        if (!categoryGroup) {
            categoryGroup = {
                ruNameCategory: categoryTitle,
                enNameCategory: categorySlug,
                product: []
            }

            result.push(categoryGroup)
        }

        const ownedItem = ownedItems[item.id]

        categoryGroup.product.push({
            id: item.id,
            img: iconsTasks.brushTeeth,
            name: item.title,
            price: item.price,
            status: {
                buy: Boolean(ownedItem),
                active: Boolean(ownedItem?.is_equipped)
            }
        })
    })

    return result
}

// ===================== PAGE =====================

export default function Shop() {
    const menuItem = {
        itemOne: {
            ru: "Ачивки",
            en: "achievements"
        },
        itemTwo: {
            ru: "Комната питомца",
            en: "petRoom"
        },
    }

    const [isActive, setIsActive] = useState(menuItem.itemOne.en)
    const [achievementsList, setAchievementsList] = useState([])
    const [itemsList, setItemsList] = useState([])
    const [err, setErr] = useState(null)
    const didLoad = useRef(false)

    async function graphqlDebugRequest(name, query) {
        const accessToken = localStorage.getItem("access_token")

        const response = await fetch(GRAPHQL_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            },
            body: JSON.stringify({ query })
        })

        const result = await response.json()

        if (result.errors?.length) {
            console.error(`ERROR IN QUERY: ${name}`, result.errors)
        }

        return result
    }

    useEffect(() => {
        if (didLoad.current) return
        didLoad.current = true

        async function getShopData() {
            const accessToken = localStorage.getItem("access_token")

            if (!accessToken) {
                setErr("Нет токена авторизации")
                return
            }

            try {
                const achievementsResult = await graphqlDebugRequest(
                    "MY_ACHIEVEMENTS_QUERY",
                    MY_ACHIEVEMENTS_QUERY
                )

                const categoriesResult = await graphqlDebugRequest(
                    "PET_ITEM_CATEGORIES_QUERY",
                    PET_ITEM_CATEGORIES_QUERY
                )

                const catalogResult = await graphqlDebugRequest(
                    "PET_CATALOG_QUERY",
                    PET_CATALOG_QUERY
                )

                const myItemsResult = await graphqlDebugRequest(
                    "MY_PET_ITEMS_QUERY",
                    MY_PET_ITEMS_QUERY
                )

                setAchievementsList(
                    prepareAchievements(achievementsResult.data)
                )

                setItemsList(
                    preparePetRoomItems({
                        petItemCategories: categoriesResult.data?.petItemCategories,
                        petCatalog: catalogResult.data?.petCatalog,
                        myPetItems: myItemsResult.data?.myPetItems
                    })
                )

            } catch (error) {
                console.error(error)
                setErr("Ошибка загрузки магазина")
            }
        }

        getShopData()
    }, [])

    return (
        <div className={styles.shopPageWrapper}>
            <h1>В разработке</h1>
            {/* <div className={styles.shopPage}>

                <div className={styles.menuWrapper}>
                    <Menu
                        itemOne={menuItem.itemOne}
                        itemTwo={menuItem.itemTwo}
                        isActive={isActive}
                        setIsActive={setIsActive}
                    />
                </div>

                {err && <div>{err}</div>}

                {isActive === "petRoom" && (
                    <div className={styles.petRoomAvatarWrapper}>
                        <Avatar />
                    </div>
                )}

                {isActive === "achievements" && (
                    <div className={styles.shopAchievementsBodyWrapper}>
                        <BodyAchievements dataList={achievementsList} />
                    </div>
                )}

                {isActive === "petRoom" && (
                    <div className={styles.shopPetRoomBodyWrapper}>
                        <BodyPetRoom dataList={itemsList} />
                    </div>
                )}

            </div> */}
        </div>
    )
}