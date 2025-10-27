import Image from "next/image"
import styles from "./ProductsList.module.css"
import icons from "../../../../../../public/icons/icons"

export default function ProductsList({item}) {
    return (
        <div className={styles.petRoomProductsWrapper}>
            {/* Запускаем цикл непосредственно по предметам из данной категории*/}
            {
                item.product.map((i, idx) => {
                    // i = {
                    //     id: 1,
                    //     img: iconsTasks.brushTeeth,
                    //     name: "Серый",
                    //     price: 10,
                    //     status: {
                    //         // buy -- куплен или не куплен предмет
                    //         buy: true,
                    //         // active -- установлен как активный или нет
                    //         active: false
                    //     }
                    // }

                    return (
                        <div className={styles.product}>
                            <div className={styles.productImgAndText}>
                                <div className={styles.productImgWrapper}>
                                    <Image src={i.img} className={styles.productImg}/>
                                </div>
                                
                                <div className={styles.productTextWrapper}>
                                    <span className={styles.productTextTitle}>{i.name}</span>
                                    {
                                        i.status.buy === false && (
                                            <span className={styles.productTextPrice}>
                                                {i.price} <Image src={icons.coin} className={styles.productTextPriceImg}/>
                                            </span>
                                        )
                                    }
                                    
                                </div>
                                
                                
                            </div>

                            <div className={styles.productButtons}>
                                {
                                    i.status.buy === false && (
                                        <button className={`${styles.productButton} ${styles.buy}`}>
                                            Купить
                                        </button>
                                    )
                                }

                                {
                                    i.status.buy === true && (
                                        i.status.active === true ? (
                                            <button className={`${styles.productButton} ${styles.active}`}>
                                                Выбрано
                                            </button>
                                        ) : (
                                            <button className={`${styles.productButton} ${styles.notActive}`}>
                                                Выбрать
                                            </button>
                                        )

                                        
                                    )
                                }
                                
                                
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}