"use client"
import Menu from "@/components/app/another/menu/Menu"
import styles from "./Shop.module.css"
import { useState } from "react"
import iconsTasks from "../../../../../public/iconsTasks/iconsTasks"
import BodyAchievements from "@/components/app/shop/achievements/BodyAchievements"
import Avatar from "@/components/app/child/avatar/Avatar"
import BodyPetRoom from "@/components/app/shop/petRoom/BodyPetRoom"
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

    const [isActive, setIsActive] = useState(menuItem.itemOne.en);

    const achievementsList = [
        {   
            id: 1,
            img: iconsTasks.brushTeeth,
            ruName: "Мыть руки",
            enName: "handWashing",
            reward: {
                coin: 22,
                xp: null
            },
            // received -- получено
            // reward -- награда
            // notAvailable -- не доступно
            status: "reward"
        },

        {   
            id: 2,
            img: iconsTasks.brushTeeth,
            ruName: "Мыть попу",
            enName: "assWashing",
            reward: {
                coin: 20,
                xp: 30
            },
            // received -- получено
            // reward -- награда
            // notAvailable -- не доступно
            status: "notAvailable"
        },

        {   
            id: 3,
            img: iconsTasks.brushTeeth,
            ruName: "Мыть зубы",
            enName: "handWashing",
            reward: {
                coin: 20,
                xp: 30
            },
            // received -- получено
            // reward -- награда
            // notAvailable -- не доступно
            status: "received"
        },

        {   
            id: 4,
            img: iconsTasks.brushTeeth,
            ruName: "Мыть руки",
            enName: "handWashing",
            reward: {
                coin: 20,
                xp: 30
            },
            // received -- получено
            // reward -- награда
            // notAvailable -- не доступно
            status: "reward"
        },

        {   
            id: 5,
            img: iconsTasks.brushTeeth,
            ruName: "Мыть руки",
            enName: "handWashing",
            reward: {
                coin: 22,
                xp: null
            },
            // received -- получено
            // reward -- награда
            // notAvailable -- не доступно
            status: "reward"
        },

        {   
            id: 6,
            img: iconsTasks.brushTeeth,
            ruName: "Мыть попу",
            enName: "assWashing",
            reward: {
                coin: 20,
                xp: 30
            },
            // received -- получено
            // reward -- награда
            // notAvailable -- не доступно
            status: "notAvailable"
        },

        {   
            id: 7,
            img: iconsTasks.brushTeeth,
            ruName: "Мыть зубы",
            enName: "handWashing",
            reward: {
                coin: 20,
                xp: 30
            },
            // received -- получено
            // reward -- награда
            // notAvailable -- не доступно
            status: "received"
        },

        {   
            id: 8,
            img: iconsTasks.brushTeeth,
            ruName: "Мыть руки",
            enName: "handWashing",
            reward: {
                coin: 22,
                xp: null
            },
            // received -- получено
            // reward -- награда
            // notAvailable -- не доступно
            status: "reward"
        },

        {   
            id: 9,
            img: iconsTasks.brushTeeth,
            ruName: "Мыть попу",
            enName: "assWashing",
            reward: {
                coin: 20,
                xp: 30
            },
            // received -- получено
            // reward -- награда
            // notAvailable -- не доступно
            status: "notAvailable"
        },

        {   
            id: 10,
            img: iconsTasks.brushTeeth,
            ruName: "Мыть зубы",
            enName: "handWashing",
            reward: {
                coin: 20,
                xp: 30
            },
            // received -- получено
            // reward -- награда
            // notAvailable -- не доступно
            status: "received"
        },

        {   
            id: 11,
            img: iconsTasks.brushTeeth,
            ruName: "Мыть руки",
            enName: "handWashing",
            reward: {
                coin: 22,
                xp: null
            },
            // received -- получено
            // reward -- награда
            // notAvailable -- не доступно
            status: "reward"
        },

        {   
            id: 12,
            img: iconsTasks.brushTeeth,
            ruName: "Мыть попу",
            enName: "assWashing",
            reward: {
                coin: 20,
                xp: 30
            },
            // received -- получено
            // reward -- награда
            // notAvailable -- не доступно
            status: "notAvailable"
        },

        {   
            id: 13,
            img: iconsTasks.brushTeeth,
            ruName: "Мыть зубы",
            enName: "handWashing",
            reward: {
                coin: 20,
                xp: 30
            },
            // received -- получено
            // reward -- награда
            // notAvailable -- не доступно
            status: "received"
        },
    ]

    const itemsList = [
        {
            ruNameCategory: "Предметы",
            enNameCategory: "items",
            product: [
                {
                    id: 1,
                    img: iconsTasks.brushTeeth,
                    name: "Диван",
                    price: 10,
                    status: {
                        // buy -- куплен или не куплен предмет
                        buy: true,
                        // active -- установлен как активный или нет
                        active: false
                    }
                },

                {
                    id: 2,
                    img: iconsTasks.brushTeeth,
                    name: "Диван",
                    price: 12,
                    status: {
                        // buy -- куплен или не куплен предмет
                        buy: true,
                        // active -- установлен как активный или нет
                        active: true
                    }
                },
            ]
        },

        {
            ruNameCategory: "Фоны",
            enNameCategory: "fill",
            product: [
                {
                    id: 1,
                    img: iconsTasks.brushTeeth,
                    name: "Серый",
                    price: 10,
                    status: {
                        // buy -- куплен или не куплен предмет
                        buy: true,
                        // active -- установлен как активный или нет
                        active: false
                    }
                },

                {
                    id: 2,
                    img: iconsTasks.brushTeeth,
                    name: "лес",
                    price: 12,
                    status: {
                        // buy -- куплен или не куплен предмет
                        buy: false,
                        // active -- установлен как активный или нет
                        active: false
                    }
                },
            ]
        }
    ]

    return (
        <div className={styles.shopPageWrapper}>
            <div className={styles.shopPage}>

                <div className={styles.menuWrapper}>
                    <Menu
                        itemOne={menuItem.itemOne} 
                        itemTwo={menuItem.itemTwo}
                        isActive={isActive}
                        setIsActive={setIsActive}
                    />
                </div>

                {
                    isActive === "petRoom" && (
                        <div className={styles.petRoomAvatarWrapper}>
                            <Avatar />
                        </div>
                    )
                }

                    
                {
                    isActive === "achievements" && (
                        <div className={styles.shopAchievementsBodyWrapper}>

                            <BodyAchievements 
                                dataList={achievementsList}
                            />
                        </div>

                    )
                }


                {
                    isActive === "petRoom" && (
                        <div className={styles.shopPetRoomBodyWrapper}>
                            <BodyPetRoom 
                                dataList={itemsList}
                            />
                        </div>
                    )
                }

            </div>
        </div>
    )
}