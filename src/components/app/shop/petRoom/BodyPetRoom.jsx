import Image from "next/image"
import styles from "./BodyPetRoom.module.css"
import ProductsList from "./productsList/ProductsList"
import icons from "../../../../../public/icons/icons"
import { useState } from "react"

export default function BodyPetRoom({ dataList }) {
    const [openCategory, setOpenCategory] = useState(0)

    const toggleProductList = (categoryIndex) => {
        if (openCategory === categoryIndex) {
            setOpenCategory(null) // закрываем если уже открыта
        } else {
            setOpenCategory(categoryIndex) // открываем новую категорию
        }
    }

    return (
        <div className={styles.bodyPetRoomWrapper}>
            <div className={styles.bodyPetRoom}>
                {dataList.map((item, index) => {
                    const isCategoryOpen = openCategory === index
                    
                    return (
                        <div className={styles.bodyPetRoomCategory} key={index}>
                            <div 
                                className={styles.bodyPetRoomCategoryHeadlineWrapper}
                                onClick={() => toggleProductList(index)}
                            >
                                <span className={styles.bodyPetRoomCategoryHeadline}>
                                    {item.ruNameCategory}
                                </span>

                                <div className={styles.bodyPetRoomArrows}>
                                    {isCategoryOpen ? (
                                        <div className={styles.bodyPetRoomArrowWrapper}>
                                            <Image src={icons.arrowDown} className={styles.bodyPetRoomArrow}/>
                                        </div>
                                    ) : (
                                        <div className={styles.bodyPetRoomArrowWrapper}>
                                            <Image src={icons.arrowUp} className={styles.bodyPetRoomArrow}/>
                                        </div>
                                    )}
                                </div>
                            </div>
                           
                            {isCategoryOpen && (
                                <div className={styles.productsListWrapper}>
                                    <ProductsList item={item}/>
                                </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}