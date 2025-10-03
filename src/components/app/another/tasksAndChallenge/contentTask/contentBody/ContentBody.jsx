import { useContext } from "react"
import styles from "./ContentBody.module.css"
import Image from "next/image";
import icons from "../../../../../../../public/icons/icons";
import { DataContent } from "../../wrapper/Wrapper";
export default function ContentBody({selectValue}) {
    const dailyTasks = useContext(DataContent);

    return (
        <div className={styles.contentBodyWrapper}>
            <div className={styles.contentBody}>

                {

                    dailyTasks[selectValue]?.items.map((item, index) => {
                        return (
                            <div className={styles.item}>

                                <div className={styles.imgAndTextWrapper}>
                                    <div className={styles.imgItemWrppaer}>
                                        <Image className={styles.imgItem} src={item.img}/>
                                    </div>

                                    <div className={styles.titleAndShortDesc}>
                                        <span className={styles.title}>{item.title}</span>
                                        <span className={styles.shortDesc}>{item.short}</span>
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