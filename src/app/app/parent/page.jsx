import Image from "next/image"
import styles from "./Parent.module.css"
import icons from "@/icons/icons"
import Link from "next/link"
export default function Parent() {
    const children = [
        {name: "Маша"},
        {name: "Cаша"},
        {name: "Миша"},
        {name: "Петя"},
        {name: "Коля"},
        {name: "Вася"},
        {name: "Влад"},
        {name: "Леша"},
        {name: "Катя"},
    ]
    return (
        <div className={styles.parentOffice}>
            <div className={styles.parentOfficeHeadlineWrapper}>
                <h1 className={styles.parentOfficeHeadline}>Кабинет Родителя</h1>
            </div>

            <div className={styles.addChildWrapper}>
                <span className={styles.addChild}> Добавить ребенка</span>
                <Image src={icons.plusBlue} className={styles.plusBlue}/>
            </div>

            <div className={styles.myChildrenWrapper}>
                <div className={styles.myChildrenHeadlineWrapper}>
                    <h2 className={styles.myChildrenHeadline}>Мои дети</h2>
                </div>

                <div className={styles.myChildren}>
                    <div className={styles.childWrapper}>
                        {
                            children.map((item, index) => {
                                const name = item.name;
                                return (
                                    <div className={styles.child}>
                                        <div className={styles.childNumber}>{index + 1}</div>
                                        <span className={styles.childName}>{name}</span>

                                        <Link href={`/app/parent/${index}`}>Клик</Link>
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