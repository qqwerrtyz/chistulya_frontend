// "use client"
// import Image from "next/image";
// import styles from "./../../Profile.module.css"
// import { useState } from "react";
// import icons from "../../../../../icons/icons";
// import { useRouter } from "next/navigation";

// export default function Item({ icon, title, dropDown,  link, name}) {
//     const [isOpen, setIsOpen] = useState(false)
//     const router = useRouter()

//     return (
//         <div
//             className={styles.userDataItem}
//             onClick={() => {
//                 if (dropDown) setIsOpen(prev => !prev);
//                 if (link) {
//                     if (name === "support") router.push("https://t.me/Qqwerrtyz");
//                     if (name === "exit") alert("*Выход*")
//                 }
//             }}
//         >
//             <div className={styles.userDataItemHeader}>
//                 <div className={styles.userDataItemHeaderContent}>
//                     <div className={styles.userDataIconWrapper}>
//                         <Image className={styles.userDataIcon} src={icon}/>
//                     </div>

//                     <div className={styles.userDataTitleWrapper}>
//                         <span className={styles.userDataTitle}>{title}</span>
//                     </div>
//                 </div>
                
//                 {
//                     dropDown && (
//                         <div className={styles.userDataOpenOrClose}>
//                             {
//                                 isOpen ? (
//                                     <Image className={styles.userDataOpenOrCloseicon} src={icons.arrowUp}/>
//                                 ) : (
//                                     <Image className={styles.userDataOpenOrCloseicon} src={icons.arrowDown}/>
//                                 )
//                             }
//                         </div>
//                     )
//                 }
                
//             </div>

//             {
//                 isOpen && (
//                     <div className={styles.userDataItemBody}>
//                         <div className={styles.userDataValueWrapper}>
//                             <span className={styles.userDataValue}>Kdv9R9__v*</span>
//                         </div>
//                     </div>
//                 )
//             }
            
//         </div>

//     )
// }


// "use client"

// import Image from "next/image";
// import styles from "./../../Profile.module.css"
// import { useState } from "react";
// import icons from "../../../../../icons/icons";
// import { useRouter } from "next/navigation";

// export default function Item({ icon, title, dropDown, link, name, value }) {
//     const [isOpen, setIsOpen] = useState(false)
//     const router = useRouter()

//     return (
//         <div
//             className={styles.userDataItem}
//             onClick={() => {
//                 if (dropDown) setIsOpen(prev => !prev);
//                 if (link) {
//                     if (name === "support") router.push("https://t.me/Qqwerrtyz");
//                     if (name === "exit") alert("*Выход*")
//                 }
//             }}
//         >
//             <div className={styles.userDataItemHeader}>
//                 <div className={styles.userDataItemHeaderContent}>
//                     <div className={styles.userDataIconWrapper}>
//                         <Image className={styles.userDataIcon} src={icon} alt="_"/>
//                     </div>

//                     <div className={styles.userDataTitleWrapper}>
//                         <span className={styles.userDataTitle}>{title}</span>
//                     </div>
//                 </div>
                
//                 {
//                     dropDown && (
//                         <div className={styles.userDataOpenOrClose}>
//                             {
//                                 isOpen ? (
//                                     <Image className={styles.userDataOpenOrCloseicon} src={icons.arrowUp} alt="_"/>
//                                 ) : (
//                                     <Image className={styles.userDataOpenOrCloseicon} src={icons.arrowDown} alt="_"/>
//                                 )
//                             }
//                         </div>
//                     )
//                 }
                
//             </div>

//             {
//                 isOpen && (
//                     <div className={styles.userDataItemBody}>
//                         <div className={styles.userDataValueWrapper}>
//                             <span className={styles.userDataValue}>{value || "Нет данных"}</span>
//                         </div>
//                     </div>
//                 )
//             }
            
//         </div>
//     )
// }






"use client"

import Image from "next/image";
import styles from "./../../Profile.module.css"
import { useState } from "react";
import icons from "../../../../../icons/icons";
import { useRouter } from "next/navigation";

export default function Item({ icon, title, dropDown, link, name, value, valueClickable, onValueClick }) {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()

    return (
        <div
            className={styles.userDataItem}
            onClick={() => {
                if (dropDown) setIsOpen(prev => !prev);
                if (link) {
                    if (name === "support") router.push("https://t.me/Qqwerrtyz");
                    if (name === "exit") alert("*Выход*")
                }
            }}
        >
            <div className={styles.userDataItemHeader}>
                <div className={styles.userDataItemHeaderContent}>
                    <div className={styles.userDataIconWrapper}>
                        <Image className={styles.userDataIcon} src={icon} alt="_"/>
                    </div>

                    <div className={styles.userDataTitleWrapper}>
                        <span className={styles.userDataTitle}>{title}</span>
                    </div>
                </div>
                
                {
                    dropDown && (
                        <div className={styles.userDataOpenOrClose}>
                            {
                                isOpen ? (
                                    <Image className={styles.userDataOpenOrCloseicon} src={icons.arrowUp} alt="_"/>
                                ) : (
                                    <Image className={styles.userDataOpenOrCloseicon} src={icons.arrowDown} alt="_"/>
                                )
                            }
                        </div>
                    )
                }
                
            </div>

            {
                isOpen && (
                    <div className={styles.userDataItemBody}>
                        <div className={styles.userDataValueWrapper}>
                            <span 
                                className={styles.userDataValue}
                                onClick={(event) => {
                                    if (!valueClickable) return

                                    event.stopPropagation()
                                    onValueClick()
                                }}
                                style={{
                                    textDecoration: valueClickable ? "underline" : "none",
                                    cursor: valueClickable ? "pointer" : "default"
                                }}
                            >
                                {value || "Нет данных"}
                            </span>
                        </div>
                    </div>
                )
            }
            
        </div>
    )
}