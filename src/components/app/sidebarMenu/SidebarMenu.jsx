import { GRAPHQL_URL } from "@/config/publicEnv"
import Link from "next/link"
import icons from "../../../icons/icons"
import IconHeader from "../another/IconHeader/IconHeader"
import styles from "./Sidebar.module.css"
import Image from "next/image"
import another from "../../../../public/imgs/another/another"
import { useState, useEffect, useRef } from "react"

import QR from "../another/qr/QR"
import { useRouter } from "next/navigation"

function MenuItem({name, href, handler, onClick}) {
    return (
        <Link onClick={handler} href={href} className={styles.item}>
            <span className={styles.itemName}>{name}</span>
            <Image alt="arrowGo" className={styles.arrowGo} src={icons.arrowGo} />
        </Link>
    )
}

const ME_QUERY = `
    query Me {
        me {
            role
        }
    }
`

const LOGOUT_MUTATION = `
    mutation Logout {
        logout {
            success
            errors {
                __typename

                ... on ValidationError {
                    message
                    fields {
                        field
                        messages
                    }
                }

                ... on RateLimitError {
                    message
                    retryAfter
                }

                ... on InvalidActionError {
                    message
                }
            }
        }
    }
`

export default function SidebarMenu({showSidebar, setShowSidebar}) {
    const router = useRouter()

    const [showQR, setShowQR] = useState(false);
    const [role, setRole] = useState(null)
    useEffect(() => {
    const savedRole =
        localStorage.getItem("role")

    if (
        savedRole === "parent" ||
        savedRole === "child"
    ) {
        setRole(savedRole)
    } else {
        setRole(null)
    }
}, [showSidebar])
function handleMenuWrapperClick(event) {
    const menuItem = event.target.closest(
        `a.${styles.item}`
    )

    if (!menuItem) {
        return
    }

    setShowSidebar(false)
}
    const videoRef = useRef(null)
const [cameraStream, setCameraStream] = useState(null)
    useEffect(() => {
    async function getUserRole() {
        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
            return
        }

        try {
            const response = await fetch(GRAPHQL_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    query: ME_QUERY
                })
            })

            const result = await response.json()

            console.log("SIDEBAR ME RESULT:", result)

            if (result.data?.me?.role) {
                setRole(result.data.me.role)
            }

        } catch (error) {
            console.log("SIDEBAR ROLE ERROR:", error)
        }
    }

    getUserRole()
}, [])

    const itemMenuChild = [
        {
            name: "Главная",
            href: "/app/child/"
        },

        {
            name: "Миссии",
            href: "/app/child/mission/"
        },

        {
            name: "Магазин",
            href: "/app/child/shop/"
        },

        {
            name: "Напоминания",
            href: "/app/notifications/"
        },

        {
            name: "Аналитика",
            href: "/app/child/analytics/"
        },

        {
            name: "Профиль",
            href: "/app/profile/"
        },
    ]

    const itemMenuParent = [
        // {
        //     name: "Главная",
        //     href: "/app/parent/"
        // },
        // {
        //     name: "Аналитика",
        //     href: "/app/parent/analytics/"
        // },
    ]

    const itemChildren = [
        // {
        //     name: "Маша",
        //     href: "/app/parent/"
        // },
        // {
        //     name: "Саша",
        //     href: "/app/parent/analytics/"
        // },
    ]


    function handlerQR(event) {
        event.preventDefault();
        setShowQR(prev => !prev)
    }

    async function openCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: {
                    ideal: "environment"
                }
            },
            audio: false
        })

        setCameraStream(stream)

        if (videoRef.current) {
            videoRef.current.srcObject = stream
        }

    } catch (error) {
        console.log("CAMERA ERROR:", error)
    }
}

    function handlerShowSidebar() {
        setShowSidebar(prev => !prev)
    }

    async function handlerLogout() {
        const isConfirm = confirm("Вы точно хотите выйти?")

        if (!isConfirm) {
            return
        }

        const accessToken = localStorage.getItem("access_token")

        if (!accessToken) {
            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            localStorage.removeItem("session_id")
            router.replace("/log")
            return
        }

        try {
            const response = await fetch(GRAPHQL_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    query: LOGOUT_MUTATION
                })
            })

            const result = await response.json()

            console.log("LOGOUT RESULT:", result)

            const payload = result.data?.logout

            if (!payload?.success) {
                const message =
                    payload?.errors?.[0]?.message ||
                    result?.errors?.[0]?.message ||
                    "Ошибка выхода из аккаунта"

                alert(message)
                return
            }

            localStorage.removeItem("access_token")
            localStorage.removeItem("refresh_token")
            localStorage.removeItem("session_id")

            router.replace("/log")

        } catch (error) {
            console.log("LOGOUT ERROR:", error)
            alert("Ошибка соединения с сервером")
        }
    }

    return (

        showSidebar && (
            <div className={styles.sidebarMenu}>
                <div className={styles.header}>
                    <div className={styles.closeWrapper}>
                        <IconHeader 
                            onClick={handlerShowSidebar}
                            alt={"activeBurger"}
                            className={styles.activeBurger}
                            src={icons.activeBurger}
                        />
                    </div>
                </div>

                <div className={styles.body}>
                    <div className={styles.menuWrapper} onClick={handleMenuWrapperClick}
>
                        {
                            role === "child" && (
                                itemMenuChild.map((item, index) => {
                                    return (
                                            <MenuItem onClick={handlerShowSidebar} name={item.name} href={item.href} key={`${index}-${item.name}`}/>
                                    )
                                })
                            )
                        }

                        {
                            role === "parent" && (
                                <>
                                    <div >
                                        {
                                            itemMenuParent.map((item, index) => {
                                                return (
                                                        <MenuItem name={item.name} href={item.href} key={`${index}-${item.name}`}/>
                                                )
                                            })
                                        }
                                    </div>

                                    <div className={styles.itemChildren}>
                                        {
                                            itemChildren.map((item, index) => {
                                                return (
                                                        <MenuItem name={item.name} href={item.href} key={`${index}-${item.name}`}/>
                                                )
                                            })
                                        }
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>

                <div className={styles.footer}>

                    {role === "child" ? (
                        <div className={styles.itemQr}>
                            <MenuItem
                                handler={handlerQR}
                                name={"QR-код"}
                                href={"#"}
                            />

                            <QR
                                isShow={showQR}
                                setIsShow={setShowQR}
                            />

                           
                        </div>
                    ) : (
   

                        <div className={styles.openCameraWrapper}>
                            {
                                role === "parent" ? (
                                    <button className={styles.openCamera}
                                        onClick={() => alert("Функция открытия камеры для QR-кода в разработке, откройте камеру телефона")}>
                                        Открыть камеру для QR
                                    </button>
                                ) : (
                                    <button
                                        className={styles.openCamera}
                                        onClick={handlerQR}
                                    >
                                        Открыть qr
                                    </button>
                                )
                            }
                            

                            

                            <QR
                                isShow={showQR}
                                setIsShow={setShowQR}
                            />
                        </div>
                    )}

                    <div className={styles.exitWrapper} onClick={handlerLogout}>
                        <div className={styles.exit}>
                            <Image alt="exit" className={styles.exitIcon} src={icons.exit}/>
                            <span className={styles.exitText}>Выйти</span>
                        </div>
                    </div>
                </div>
                

            </div>
        )
    )
}