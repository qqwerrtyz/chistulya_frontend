// import Image from "next/image"
// import styles from "./FooterLanding.module.css"
// import Link from "next/link"
// import icons from "@/icons/icons"
 
// export default function FooterLanding() {
//     return (
//         <footer className={styles.footerWrapper}>
//             <div className={styles.footer}>

//                 <div className={styles.col1}>
//                     <div className={styles.logoWrapper}>
//                         <Image
//                             src="/imgs/logo.png"
//                             width={100}
//                             height={100}
//                             alt="Logo"
//                             className={styles.logoImg}
//                             priority                   // опционально
//                         />
//                         <span style={{color: "#4272EA"}} className={styles.logoText}>Чистюля</span>
//                     </div>
//                 </div>

//                 <div className={styles.col2}>
//                     <div className={`${styles.footerItem} ${styles.footerItem1}`}>
//                         <span className={styles.footerItemTitle}>Меню</span>
//                         <div className={styles.footerSubitems}>
//                             <Link href={"#main"} className={styles.footerSubitem}>Главная</Link>
//                             <Link href={"#aboutApp"} className={styles.footerSubitem}>О приложении</Link>
//                             <Link href={"#whyImportant"} className={styles.footerSubitem}>Преимущества</Link>
//                             <Link href={"#forWhom"} className={styles.footerSubitem}>Для кого  </Link>
//                             <Link href={"#howGetStart"} className={styles.footerSubitem}>Начать</Link>
//                         </div>
//                     </div>

//                     <div className={`${styles.footerItem} ${styles.footerItem2}`}>
//                         <span className={styles.footerItemTitle}>Контакты</span>
//                         <div className={styles.footerSubitems}>
//                             <a href={"https://t.me/Qqwerrtyz"} className={styles.footerSubitemImgWrapper}>
//                                 <Image width={100} height={100} src={icons.telegram} className={styles.footerSubitemImg}/>
//                             </a>
                            
//                         </div>
//                     </div>

//                     <div className={`${styles.footerItem} ${styles.footerItem3}`}>
//                         <div className={styles.footerDocuments}>
//                             <Link href={"#"} className={styles.footerDocument}>Пользовательское соглашение</Link>
//                             <Link href={"#"} className={styles.footerDocument}>Все права защищены. Copyright © {new Date().getFullYear()}</Link>
//                         </div>
//                     </div>
//                 </div>


//                 <div className={styles.col3}>
//                     <div className={styles.fasie}>
//                         <Link style={{color: "#323232"}} href="https://www.fasie.ru/" className={styles.fasieText}>Проект сделан при поддержке Фонда содействия инновации</Link>
//                         <Link href="https://www.fasie.ru/">
//                             <Image width={100} height={100} className={styles.fasieImg} src={"/imgs/landing/fasie.png"}/>
//                         </Link>
//                     </div>
//                 </div>

//             </div>
//         </footer>
//     )
// }



"use client";

import Image from "next/image";
import styles from "./FooterLanding.module.css";
import Link from "next/link";
import icons from "@/icons/icons";

export default function FooterLanding() {

    function handleScroll(e, href) {
        e.preventDefault();

        const element = document.querySelector(href);

        // Находим .header внутри HeaderLanding
        const header = document.querySelector("header > div");

        if (!element) return;

        const headerHeight = header?.offsetHeight || 0;

        // Дополнительное расстояние после фиксированной шапки
        const gap = 28;

        const elementPosition =
            element.getBoundingClientRect().top + window.scrollY;

        const scrollPosition =
            elementPosition - headerHeight - gap;

        window.scrollTo({
            top: Math.max(scrollPosition, 0),
            behavior: "smooth",
        });
    }


    return (
        <footer className={styles.footerWrapper}>
            <div className={styles.footer}>

                <div className={styles.col1}>
                    <div className={styles.logoWrapper}>
                        <Image
                            src="/imgs/logo.png"
                            width={100}
                            height={100}
                            alt="Logo"
                            className={styles.logoImg}
                            priority
                        />

                        <span
                            style={{ color: "#4272EA" }}
                            className={styles.logoText}
                        >
                            Чистюля
                        </span>
                    </div>
                </div>


                <div className={styles.col2}>

                    <div
                        className={`${styles.footerItem} ${styles.footerItem1}`}
                    >
                        <span className={styles.footerItemTitle}>
                            Меню
                        </span>

                        <div className={styles.footerSubitems}>

                            <Link
                                href="#main"
                                className={styles.footerSubitem}
                                onClick={(e) => handleScroll(e, "#main")}
                            >
                                Главная
                            </Link>

                            <Link
                                href="#aboutApp"
                                className={styles.footerSubitem}
                                onClick={(e) => handleScroll(e, "#aboutApp")}
                            >
                                О приложении
                            </Link>

                            <Link
                                href="#whyImportant"
                                className={styles.footerSubitem}
                                onClick={(e) => handleScroll(e, "#whyImportant")}
                            >
                                Преимущества
                            </Link>

                            <Link
                                href="#forWhom"
                                className={styles.footerSubitem}
                                onClick={(e) => handleScroll(e, "#forWhom")}
                            >
                                Для кого
                            </Link>

                            <Link
                                href="#howGetStart"
                                className={styles.footerSubitem}
                                onClick={(e) => handleScroll(e, "#howGetStart")}
                            >
                                Начать
                            </Link>

                        </div>
                    </div>


                    <div
                        className={`${styles.footerItem} ${styles.footerItem2}`}
                    >
                        <span className={styles.footerItemTitle}>
                            Контакты
                        </span>

                        <div className={styles.footerSubitems}>
                            <a
                                href="https://t.me/Qqwerrtyz"
                                className={styles.footerSubitemImgWrapper}
                            >
                                <Image
                                    width={100}
                                    height={100}
                                    src={icons.telegram}
                                    alt="Telegram"
                                    className={styles.footerSubitemImg}
                                />
                            </a>
                        </div>
                    </div>


                    <div
                        className={`${styles.footerItem} ${styles.footerItem3}`}
                    >
                        <div className={styles.footerDocuments}>

                            <Link
                                href="#"
                                className={styles.footerDocument}
                            >
                                Пользовательское соглашение
                            </Link>

                            <Link
                                href="#"
                                className={styles.footerDocument}
                            >
                                Все права защищены. Copyright ©{" "}
                                {new Date().getFullYear()}
                            </Link>

                        </div>
                    </div>

                </div>


                <div className={styles.col3}>
                    <div className={styles.fasie}>

                        <Link
                            style={{ color: "#323232" }}
                            href="https://www.fasie.ru/"
                            className={styles.fasieText}
                        >
                            Проект сделан при поддержке Фонда содействия инновации
                        </Link>

                        <Link href="https://www.fasie.ru/">
                            <Image
                                width={100}
                                height={100}
                                alt="Фонд содействия инновациям"
                                className={styles.fasieImg}
                                src="/imgs/landing/fasie.png"
                            />
                        </Link>

                    </div>
                </div>

            </div>
        </footer>
    );
}