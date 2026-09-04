
"use client"

import { GRAPHQL_URL } from "@/config/publicEnv"
import styles from "./Shop.module.css"
import { useEffect, useRef, useState } from "react"
import iconsTasks from "../../../../../public/iconsTasks/iconsTasks"

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
           
        </div>
    )
}