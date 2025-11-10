import Image from "next/image"
import styles from "./BodyPetRoom.module.css"
import ProductsList from "./productsList/ProductsList"
import icons from "../../../../../public/icons/icons"
import { useState } from "react"

export default function BodyPetRoom ({dataList}) {
    // теперь храним состояние по ключам категорий
    const [openProductList, setOpenProductList] = useState({})

    const toggleCategory = (key) => {
        setOpenProductList(prev => ({
            ...prev,
            [key]: !prev[key]
        }))
    }

    return (
        <div className={styles.bodyPetRoomWrapper}>
            <div className={styles.bodyPetRoom}>
                {
                    dataList.map((item, index) => {
                        const key = item.enNameCategory ?? index // надежный ключ
                        const isOpen = !!openProductList[key]

                        return (
                            <div className={styles.bodyPetRoomCategory} key={key}>
                                <div
                                    className={styles.bodyPetRoomCategoryHeadlineWrapper}
                                    onClick={() => toggleCategory(key)}
                                >
                                    <span className={styles.bodyPetRoomCategoryHeadline}>
                                        {item.ruNameCategory}
                                    </span>

                                    <div className={styles.bodyPetRoomArrows}>
                                        {
                                            isOpen ? (
                                                <div className={styles.bodyPetRoomArrowWrapper}>
                                                    <Image src={icons.arrowDown} className={styles.bodyPetRoomArrow}/>
                                                </div>
                                            ) : (
                                                <div className={styles.bodyPetRoomArrowWrapper}>
                                                    <Image src={icons.arrowUp} className={styles.bodyPetRoomArrow}/>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>

                                {
                                    isOpen && (
                                        <div className={styles.productsListWrapper}>
                                            <ProductsList item={item}/>
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
