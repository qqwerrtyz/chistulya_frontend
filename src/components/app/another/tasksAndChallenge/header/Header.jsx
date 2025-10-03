import Image from "next/image"
import styles from "./Header.module.css"
import icons from "../../../../../../public/icons/icons"


export default function Header ({title, flags, setFlags}) {
    return (
        <div className={styles.header}>

            <div 
                className={styles.titleAndToggle}
                onClick={() => {
                    setFlags(prev => {
                        return (

                            title === "Ежедневные задания" ? {
                                ...prev,
                                tasks: !prev.tasks
                            } : {
                                ...prev,
                                challenge: !prev.challenge
                            }
                        )
                    })
                }}
            >
                <div className={styles.headlineWrapper}>
                    <span className={styles.headline}>{title}</span>
                </div>
                
                {   
                    (title === "Ежедневные задания" ? flags.tasks : flags.challenge) === true ? (
                        <div className={styles.toggleWrapper}>
                            <Image alt="arrowDown" src={icons.arrowDown} />
                        </div>
                    ) : (
                        <div className={styles.toggleWrapper}>
                            <Image alt="arrowUp" src={icons.arrowUp} />
                        </div>
                    )
                }
                
            </div>

        

        </div>
    )
}