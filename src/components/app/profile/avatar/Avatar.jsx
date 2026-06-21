// import icons from "../../../../icons/icons"
// import styles from "./../Profile.module.css"
// import Image from "next/image"




// export default function Avatar() {
//     return (
//         <div className={styles.avatarWrapper}>
//             <div className={styles.avatar}>
//                 <div className={styles.avatarImgWrapper}>
//                     <span className={styles.avatarAddImgText}>
//                         Добавить фото
//                     </span>

//                     <div className={styles.avatarAddImgIconWrapper}>
//                         <Image src={icons.plusWhite} className={styles.avatarAddImgIcon}/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

"use client"

import icons from "../../../../icons/icons"
import styles from "./../Profile.module.css"
import Image from "next/image"
import { useRef } from "react"

export default function Avatar({ avatarUrl, onUploadAvatar }) {
    const fileInputRef = useRef(null)

    function handleOpenFileInput() {
        fileInputRef.current?.click()
    }

    function handleFileChange(event) {
        const file = event.target.files?.[0]

        if (!file) {
            return
        }

        onUploadAvatar(file)
    }

    return (
        <div className={styles.avatarWrapper}>
            <div className={styles.avatar}>

                {avatarUrl ? (
                    <img src={avatarUrl} className={styles.avatarImg} alt="avatar" />
                ) : (
                    <div className={styles.avatarImgWrapper}>
                        <span className={styles.avatarAddImgText}>
                            Добавить фото
                        </span>

                        <div 
                            className={styles.avatarAddImgIconWrapper}
                            onClick={handleOpenFileInput}
                        >
                            <Image src={icons.plusWhite} className={styles.avatarAddImgIcon} alt="add" />
                        </div>
                    </div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                />

            </div>
        </div>
    )
}