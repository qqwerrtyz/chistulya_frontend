import { useContext, useEffect, useState } from "react"
import styles from "./ContentBody.module.css"
import Image from "next/image";
import icons from "../../../../../../../public/icons/icons";

export default function ContentBody({selectValue, firstData, secondData, isActive, type}) {

    

    // Тут на основании isActive мы выбираем что рендерить:
    // ежедневные задания или челленджи

    const [data, setData] = useState("");

    useEffect(() => {

            if (firstData && secondData) {
                setData(isActive === "everyday" ? firstData : secondData);
            }
        
    }, [isActive, firstData, secondData, type]);

    if (!data || !data[selectValue]) {
        return <div>Данные загружаются</div>;
    }



    return (
        <div className={styles.contentBodyWrapper}>
            <div className={styles.contentBody}>

                {

                    data[selectValue]?.items.map((item, index) => {
                        return (
                            <div className={styles.item} key={`${item.title}-${index}`}>

                                <div className={styles.imgAndTextWrapper}>
                                        <div className={styles.imgItemWrppaer}>
                                            <Image alt={`${item.title}`} className={styles.imgItem} src={item.img}/>
                                        </div>
                                    

                                    <div className={styles.titleAndShortDesc}>
                                        <span className={styles.title}>{item.title}</span>
                                        {type === "home" || type === "mission" && (

                                            <span className={styles.shortDesc}>{item.short}</span>
                                        )  }
                                    </div>
                                </div>

                                <div className={styles.buttonWrapper}>

                                    {
                                        item.status === "fulfill" && (
                                            <button className={styles.buttonFullfill}>Выполнить</button>
                                        )
                                    }

                                    {
                                        item.status === "done" && (
                                            <button className={styles.buttonDone}>Получено</button>
                                        )
                                    }

                                    {
                                        item.status === "take" && (
                                            <button className={styles.buttonTake}>
                                                {item.reward.coins} <Image src={icons.coin}/>
                                            </button>
                                        )
                                    }
                                    

                                </div>
                            </div>
                        )
                    })

                 
                }
                

            </div>
        </div>
    )
}