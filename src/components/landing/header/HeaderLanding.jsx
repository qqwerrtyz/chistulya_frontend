// "use client"
// import Link from "next/link";
// import styles from "./header.module.css"
// import Image from "next/image";
// import icons from "@/icons/icons";
// import { useEffect, useState } from "react";
// export default function HeaderLanding() {
//     const menuItems = [
//         { 
//         ru: "Главная",
//         href: "#main"
//         },

//         {
//         ru: "О приложении",
//         href: "#aboutApp"
//         },

//         {
//         ru: "Преимущества",
//         href: "#whyImportant"
//         },

//         {
//         ru: "Для кого",
//         href: "#forWhom"
//         },

//         {
//         ru: "Начать",
//         href: "#howGetStart"
//         },
//     ]

//     const [isSidebar, setIsSidebar] = useState (false);

//     useEffect(() => {
//         if (isSidebar) {
//             document.body.style.overflow = "hidden";
//         } else {
//             document.body.style.overflow = "";
//         }

//         return () => {
//             document.body.style.overflow = "";
//         };
//     }, [isSidebar]);


//     return (
//         <>
//             <header className={styles.headerWrapper}>
//                 <div className={styles.header}>

//                 <div className={styles.logoWrapper}>
//                     <div className={styles.logoImgWrapper}>
//                     <Image
//                         src="/imgs/logo.png"
//                         alt="Logo"
//                         fill                       // <- важно
//                         className={styles.logoImg}
//                         priority                   // опционально
//                     />
//                     </div>

//                     <span style={{color: "#4272EA"}} className={styles.logoHeadline}>Чистюля</span>
//                 </div>

//                 <div className={styles.menuWrapper}>
                    
//                     <div className={styles.menuItemsWrapper}>
//                     {
//                         menuItems.map((item, index) => {
//                         return (
//                             <div className={styles.menuItemWrapper}>
//                             <Link href={item.href} className={styles.menuItem}>{item.ru}</Link>
//                             </div>
//                         )
//                         })
//                     }
//                     </div>
//                 </div>
                

//                 <div className={styles.burgerLandingWrapper}>
//                     <Image 
//                         src={icons.burgerLanding}
//                         className={styles.burgerLanding}
//                         onClick={() => setIsSidebar(prev => !prev)}    
//                     />
//                 </div>
//                 <div className={styles.goAppWrapper}>
//                     <Link href={"/reg"} className={styles.goApp}>Перейти</Link>
//                 </div>
                
//                 </div>
                


//                 {
//                     isSidebar && (
//                         <aside className={styles.sidebarWrapper}>
//                             <div className={styles.sidebar}>
                                
//                                 <div className={styles.crossCloseWrapper}>
//                                     <Image
//                                         src={icons.cross}
//                                         className={styles.cross}
//                                         onClick={() => setIsSidebar(prev => !prev)}    
//                                     />
//                                 </div>

//                                 <div className={styles.menu}>
//                                     <div className={styles.menuTitleWrapper}>
//                                         <span className={styles.menuTitle}>Меню</span>
//                                     </div>

//                                     <div className={styles.menuItems}>
//                                         {
//                                             menuItems.map((item, index) => {
//                                                 return (
//                                                     <div className={styles.menuItemWrapper}>
//                                                         <span className={styles.menuItem}>{item.ru}</span>
//                                                     </div>
//                                                 )
//                                             })
//                                         }
//                                     </div>
//                                 </div>

//                                 <div className={styles.telegramWrapper}>
//                                     <a href={"https://t.me/Qqwerrtyz"} className={styles.telegramLink}>
//                                         <Image src={icons.telegram} className={styles.telegram}/>
//                                     </a>
//                                 </div>

//                                 <div className={styles.goAppSidebarWrapper}>
//                                     <Link className={styles.goAppSidebar} href={"/reg"}>Перейти</Link>
//                                 </div>
//                             </div>

                            
//                         </aside>
//                     )
//                 }
                


                
//             </header>

            
//         </>
//     )
// }


"use client";

import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";
import icons from "@/icons/icons";
import { useEffect, useState } from "react";

export default function HeaderLanding() {
    const menuItems = [
        {
            ru: "Главная",
            href: "#main",
        },
        {
            ru: "О приложении",
            href: "#aboutApp",
        },
        {
            ru: "Преимущества",
            href: "#whyImportant",
        },
        {
            ru: "Для кого",
            href: "#forWhom",
        },
        {
            ru: "Начать",
            href: "#howGetStart",
        },
    ];

    const [isSidebar, setIsSidebar] = useState(false);

    useEffect(() => {
        if (isSidebar) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isSidebar]);


    function handleScroll(href) {
    const element = document.querySelector(href);
    const header = document.querySelector(`.${styles.header}`);

    if (!element) return;

    setIsSidebar(false);
    document.body.style.overflow = "";

    const headerHeight = header?.offsetHeight || 0;

    // Дополнительный отступ между header и секцией
    const gap = 28;

    const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

    const scrollPosition =
        elementPosition - headerHeight - gap;

    window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
    });
}


    return (
        <>
            <header className={styles.headerWrapper}>
                <div className={styles.header}>

                    <div className={styles.logoWrapper}>
                        <div className={styles.logoImgWrapper}>
                            <Image
                                src="/imgs/logo.png"
                                alt="Logo"
                                fill
                                className={styles.logoImg}
                                priority
                            />
                        </div>

                        <span
                            style={{ color: "#4272EA" }}
                            className={styles.logoHeadline}
                        >
                            Чистюля
                        </span>
                    </div>


                    {/* DESKTOP MENU */}
                    <div className={styles.menuWrapper}>
                        <div className={styles.menuItemsWrapper}>

                            {menuItems.map((item) => (
                                <div
                                    key={item.href}
                                    className={styles.menuItemWrapper}
                                >
                                    <Link
                                        href={item.href}
                                        className={styles.menuItem}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleScroll(item.href);
                                        }}
                                    >
                                        {item.ru}
                                    </Link>
                                </div>
                            ))}

                        </div>
                    </div>


                    {/* BURGER */}
                    <div className={styles.burgerLandingWrapper}>
                        <Image
                            src={icons.burgerLanding}
                            alt="Меню"
                            className={styles.burgerLanding}
                            onClick={() => setIsSidebar((prev) => !prev)}
                        />
                    </div>


                    {/* BUTTON */}
                    <div className={styles.goAppWrapper}>
                        <Link
                            href="/reg"
                            className={styles.goApp}
                        >
                            Перейти
                        </Link>
                    </div>

                </div>


                {/* SIDEBAR */}
                {isSidebar && (
                    <aside className={styles.sidebarWrapper}>
                        <div className={styles.sidebar}>

                            <div className={styles.crossCloseWrapper}>
                                <Image
                                    src={icons.cross}
                                    alt="Закрыть"
                                    className={styles.cross}
                                    onClick={() => setIsSidebar(false)}
                                />
                            </div>


                            <div className={styles.menu}>

                                <div className={styles.menuTitleWrapper}>
                                    <span className={styles.menuTitle}>
                                        Меню
                                    </span>
                                </div>


                                <div className={styles.menuItems}>

                                    {menuItems.map((item) => (
                                        <div
                                            key={item.href}
                                            className={styles.menuItemWrapper}
                                        >
                                            <span
                                                className={styles.menuItem}
                                                onClick={() =>
                                                    handleScroll(item.href)
                                                }
                                            >
                                                {item.ru}
                                            </span>
                                        </div>
                                    ))}

                                </div>
                            </div>


                            <div className={styles.telegramWrapper}>
                                <a
                                    href="https://t.me/Qqwerrtyz"
                                    className={styles.telegramLink}
                                >
                                    <Image
                                        src={icons.telegram}
                                        alt="Telegram"
                                        className={styles.telegram}
                                    />
                                </a>
                            </div>


                            <div className={styles.goAppSidebarWrapper}>
                                <Link
                                    className={styles.goAppSidebar}
                                    href="/reg"
                                >
                                    Перейти
                                </Link>
                            </div>

                        </div>
                    </aside>
                )}

            </header>
        </>
    );
}