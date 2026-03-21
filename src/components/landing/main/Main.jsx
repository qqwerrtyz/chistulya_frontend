import Image from "next/image"
import styles from "./Main.module.css"
import Link from "next/link"
import icons from "@/icons/icons"
export default function Main() {
    return (
         <div className={styles.mainWrapper}>
          <div className={styles.main}>

            <div className={`${styles.mainColumnRobot} ${styles.mainColumnRobot1}`}>
              <div className={styles.mainRobotItemWrapper}>

                <div className={`${styles.mainRobotItem} ${styles.mainRobotItemRight}`}>
                  <Image className={styles.mainRobotImg} src={icons.blueRobot}/>
                  <div className={styles.mainRobotPhraseWrapper}>
                    <span className={styles.mainRobotPhrase}>Ты стал настоящим Чистюлей!</span>
                  </div>
                </div>

                <div className={styles.mainRobotItem}>
                  <Image className={styles.mainRobotImg} src={icons.pinkRobot}/>
                  <div className={styles.mainRobotPhraseWrapper}>
                    <span className={styles.mainRobotPhrase}>Каждое действие — победа!</span>
                  </div>
                </div>

                <div className={`${styles.mainRobotItem} ${styles.mainRobotItemRight}`}>
                  <Image className={styles.mainRobotImg} src={icons.blueRobot}/>
                  <div className={styles.mainRobotPhraseWrapper}>
                    <span className={styles.mainRobotPhrase}>Ты достиг нового уровня гигиены!</span>
                  </div>
                </div>
                
              </div>
            </div>

            <div className={styles.mainChistulyaWrapper}>
              <div className={styles.mainChistulya}>
                  <p className={styles.mainTitle}>Ребенок учится через игру, а вы следите за прогрессом с  <span className={styles.mainTitleBlueBg}>Чистюлей</span></p>
                  <p className={styles.mainSubtitle}>Игровые задания, награды и отчёты для родителей — всё, чтобы ребёнок с радостью заботился о себе</p>
                  <div className={styles.mainWebVersionWrapper}>
                    <Link href={"/log"} className={styles.mainWebVersion}>Веб-версия <Image className={styles.mainWebVersionImg} src={icons.planet}/></Link>
                  </div>
              </div>
            </div>


            <div className={styles.mainColumnRobot}>
              <div className={styles.mainRobotItemWrapper}>

                <div className={styles.mainRobotItem}>
                  <Image className={styles.mainRobotImg} src={icons.blueRobot}/>
                  <div className={styles.mainRobotPhraseWrapper}>
                    <span className={styles.mainRobotPhrase}>Продолжай в том же духе, ты на правильном пути!</span>
                  </div>
                </div>

                <div className={`${styles.mainRobotItem} ${styles.mainRobotItemRight}`}>
                  <Image className={styles.mainRobotImg} src={icons.pinkRobot}/>
                  <div className={styles.mainRobotPhraseWrapper}>
                    <span className={styles.mainRobotPhrase}>Здоровье начинается с игры!</span>
                  </div>
                </div>

                <div className={styles.mainRobotItem}>
                  <Image className={styles.mainRobotImg} src={icons.blueRobot}/>
                  <div className={styles.mainRobotPhraseWrapper}>
                    <span className={styles.mainRobotPhrase}>Ты выигрываешь каждый день!</span>
                  </div>
                </div>
                
              </div>
            </div>

          </div>
        </div>
    )
}