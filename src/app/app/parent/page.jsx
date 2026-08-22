

// "use client"

// import { GRAPHQL_URL } from "@/config/publicEnv"

// import Image from "next/image"
// import styles from "./Parent.module.css"
// import icons from "@/icons/icons"
// import Link from "next/link"
// import { useEffect, useState, useRef } from "react"

// const MY_CHILDREN_QUERY = `
//     query MyChildren {
//         myChildren {
//             id
//             email
//             profile {
//                 name
//                 role
//             }
//         }
//     }
// `

// export default function Parent() {
//     const [children, setChildren] = useState([])
//     const [err, setErr] = useState(null)
//     const [showCamera, setShowCamera] = useState(false)

//     const videoRef = useRef(null)

//     async function openCamera() {
//     try {
//         setShowCamera(true)

//         const stream = await navigator.mediaDevices.getUserMedia({
//             video: {
//                 facingMode: {
//                     ideal: "environment"
//                 }
//             },
//             audio: false
//         })

//         if (videoRef.current) {
//             videoRef.current.srcObject = stream
//         }

//     } catch (error) {
//         console.log("CAMERA ERROR:", error)
//     }
//     }

//     function closeCamera() {
//     if (videoRef.current?.srcObject) {
//         const stream = videoRef.current.srcObject

//         stream.getTracks().forEach(track => {
//             track.stop()
//         })

//         videoRef.current.srcObject = null
//     }

//     setShowCamera(false)
// }

//     useEffect(() => {
//         async function getMyChildren() {
//             const accessToken = localStorage.getItem("access_token")

//             if (!accessToken) {
//                 setErr("Нет токена авторизации")
//                 return
//             }

//             try {
//                 const response = await fetch(GRAPHQL_URL, {
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": `Bearer ${accessToken}`
//                     },
//                     body: JSON.stringify({
//                         query: MY_CHILDREN_QUERY
//                     })
//                 })

//                 const result = await response.json()

//                 console.log("MY CHILDREN RESULT:", result)

//                 if (result.data?.myChildren) {
//                     setChildren(result.data.myChildren)
//                     return
//                 }

//                 if (result.errors?.length) {
//                     setErr(result.errors[0].message)
//                     return
//                 }

//                 setErr("Не удалось загрузить детей")

//             } catch (error) {
//                 console.log("MY CHILDREN ERROR:", error)
//                 setErr("Ошибка загрузки детей")
//             }
//         }

//         getMyChildren()
//     }, [])

//     return (
//         <div className={styles.parentOffice}>
//             <div className={styles.parentOfficeHeadlineWrapper}>
//                 <h1 className={styles.parentOfficeHeadline}>Кабинет Родителя</h1>
//             </div>
// <div
//     className={styles.addChildWrapper}
//     onClick={openCamera}
// >
//     <span className={styles.addChild}> Добавить ребенка</span>

//     <Image
//         src={icons.plusBlue}
//         className={styles.plusBlue}
//         alt="add child"
//     />
// </div>

//     {showCamera && (
//     <>
//         <video
//             ref={videoRef}
//             autoPlay
//             playsInline
//             className={styles.cameraVideo}
//             style={{ 
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 zIndex: 9999,
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover"
//             }}
//         />

//         <button onClick={closeCamera}>
//             Закрыть камеру
//         </button>
//     </>
// )}

//             <div className={styles.myChildrenWrapper}>
//                 <div className={styles.myChildrenHeadlineWrapper}>
//                     <h2 className={styles.myChildrenHeadline}>Мои дети</h2>
//                 </div>

//                 <div className={styles.myChildren}>
//                     <div className={styles.childWrapper}>

//                         {err && (
//                             <div>
//                                 {err}
//                             </div>
//                         )}

//                         {
//                             children.map((item, index) => {
//                                 const name = item.profile?.name || item.email || "Ребенок"

//                                 return (
//                                     <div className={styles.child} key={item.id}>
//                                         <div className={styles.numberAndNameWrapper}>
//                                             <div className={styles.childNumber}>{index + 1}</div>
//                                             <span className={styles.childName}>{name}</span>
//                                         </div>
                                        

//                                         <Link 
//                                             className={styles.goToChild} 
//                                             href={`/app/parent/${item.id}`}
//                                         >
//                                             Клик
//                                         </Link>
//                                     </div>
//                                 )
//                             })
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }


"use client"

import { GRAPHQL_URL } from "@/config/publicEnv"

import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useRef, useState } from "react"

import styles from "./Parent.module.css"
import icons from "@/icons/icons"

const MY_CHILDREN_QUERY = `
    query MyChildren {
        myChildren {
            id
            email
            profile {
                name
                role
            }
        }
    }
`

function getCameraErrorMessage(error) {
    const errorName = error?.name || ""
    const errorMessage = String(error?.message || error || "")

    if (
        errorName === "NotAllowedError" ||
        errorName === "SecurityError" ||
        /permission|denied|not allowed/i.test(errorMessage)
    ) {
        return "Доступ к камере запрещён. Перейдите в настройки браузера и разрешите доступ к камере."
    }

    if (
        errorName === "NotFoundError" ||
        errorName === "DevicesNotFoundError" ||
        /no camera|camera not found|no cameras/i.test(errorMessage)
    ) {
        return "Камера на устройстве не найдена."
    }

    if (
        errorName === "NotReadableError" ||
        errorName === "TrackStartError" ||
        /could not start video|camera.*use|device.*use/i.test(errorMessage)
    ) {
        return "Не удалось запустить камеру. Возможно, она используется другим приложением."
    }

    return "Не удалось открыть камеру. Проверьте разрешения браузера."
}

export default function Parent() {
    const [children, setChildren] = useState([])
    const [err, setErr] = useState(null)
    const [showCamera, setShowCamera] = useState(false)

    const videoRef = useRef(null)
    const scannerRef = useRef(null)
    const scanProcessedRef = useRef(false)

    const stopCamera = useCallback(() => {
        scanProcessedRef.current = true

        const scanner = scannerRef.current
        scannerRef.current = null

        if (scanner) {
            /*
             * true означает, что видеопоток нужно остановить
             * сразу, без стандартной задержки библиотеки.
             */
            scanner.pause(true).catch(() => {})
            scanner.destroy()
        }

        if (videoRef.current) {
            videoRef.current.srcObject = null
        }
    }, [])

    const closeCamera = useCallback(() => {
        stopCamera()
        setShowCamera(false)
    }, [stopCamera])

    function openCamera() {
        setShowCamera(true)
    }

    useEffect(() => {
        if (!showCamera) {
            return
        }

        let effectCancelled = false
        let createdScanner = null

        const previousBodyOverflow = document.body.style.overflow
        const previousHtmlOverflow =
            document.documentElement.style.overflow

        document.body.style.overflow = "hidden"
        document.documentElement.style.overflow = "hidden"

        scanProcessedRef.current = false

        async function startScanner() {
            try {
                if (!navigator.mediaDevices?.getUserMedia) {
                    throw new Error("Camera API is not supported")
                }

                /*
                 * Динамический импорт нужен, чтобы библиотека
                 * загружалась только в браузере, а не во время
                 * серверного рендеринга Next.js.
                 */
                const { default: QrScanner } = await import("qr-scanner")

                if (effectCancelled || !videoRef.current) {
                    return
                }

                const scanner = new QrScanner(
                    videoRef.current,

                    (result) => {
                        if (
                            effectCancelled ||
                            scanProcessedRef.current
                        ) {
                            return
                        }

                        scanProcessedRef.current = true

                        let targetUrl

                        try {
                            targetUrl = new URL(result.data)

                            if (
                                targetUrl.protocol !== "http:" &&
                                targetUrl.protocol !== "https:"
                            ) {
                                throw new Error("Invalid URL protocol")
                            }
                        } catch (error) {
                            console.log("INVALID QR LINK:", error)

                            stopCamera()
                            setShowCamera(false)

                            alert("QR-код не содержит корректную ссылку.")

                            return
                        }

                        /*
                         * Сначала полностью выключаем камеру,
                         * затем открываем ссылку из QR.
                         */
                        stopCamera()
                        setShowCamera(false)

                        window.location.assign(targetUrl.toString())
                    },

                    {
                        preferredCamera: "environment",
                        maxScansPerSecond: 10,
                        returnDetailedScanResult: true,
                        highlightScanRegion: false,
                        highlightCodeOutline: false,

                        /*
                         * Ошибка отсутствия QR в отдельном кадре
                         * является нормальной, поэтому её не выводим.
                         */
                        onDecodeError: () => {}
                    }
                )

                createdScanner = scanner
                scannerRef.current = scanner

                await scanner.start()

                /*
                 * Пользователь мог закрыть окно, пока браузер
                 * запрашивал разрешение на камеру.
                 */
                if (
                    effectCancelled ||
                    scannerRef.current !== scanner
                ) {
                    scanner.destroy()
                }
            } catch (error) {
                if (
                    effectCancelled ||
                    scanProcessedRef.current
                ) {
                    return
                }

                console.log("CAMERA ERROR:", error)

                if (createdScanner) {
                    createdScanner.destroy()
                }

                if (scannerRef.current === createdScanner) {
                    scannerRef.current = null
                }

                setShowCamera(false)
                alert(getCameraErrorMessage(error))
            }
        }

        startScanner()

        return () => {
            effectCancelled = true
            scanProcessedRef.current = true

            /*
             * Сработает при закрытии окна, переходе на другую
             * страницу и размонтировании Parent.
             */
            if (
                createdScanner &&
                scannerRef.current === createdScanner
            ) {
                createdScanner.pause(true).catch(() => {})
                createdScanner.destroy()
                scannerRef.current = null
            }

            if (videoRef.current) {
                videoRef.current.srcObject = null
            }

            document.body.style.overflow = previousBodyOverflow
            document.documentElement.style.overflow =
                previousHtmlOverflow
        }
    }, [showCamera, stopCamera])

    useEffect(() => {
        async function getMyChildren() {
            const accessToken = localStorage.getItem("access_token")

            if (!accessToken) {
                setErr("Нет токена авторизации")
                return
            }

            try {
                const response = await fetch(GRAPHQL_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        query: MY_CHILDREN_QUERY
                    })
                })

                const result = await response.json()

                console.log("MY CHILDREN RESULT:", result)

                if (result.data?.myChildren) {
                    setChildren(result.data.myChildren)
                    return
                }

                if (result.errors?.length) {
                    setErr(result.errors[0].message)
                    return
                }

                setErr("Не удалось загрузить детей")
            } catch (error) {
                console.log("MY CHILDREN ERROR:", error)
                setErr("Ошибка загрузки детей")
            }
        }

        getMyChildren()
    }, [])

    return (
        <div className={styles.parentOffice}>
            <div className={styles.parentOfficeHeadlineWrapper}>
                <h1 className={styles.parentOfficeHeadline}>
                    Кабинет Родителя
                </h1>
            </div>

            <div
                className={styles.addChildWrapper}
                onClick={openCamera}
            >
                <span className={styles.addChild}>
                    Добавить ребенка
                </span>

                <Image
                    src={icons.plusBlue}
                    className={styles.plusBlue}
                    alt="Добавить ребенка"
                />
            </div>

            {showCamera && (
                <div className={styles.cameraOverlay}>
                    <video
                        ref={videoRef}
                        className={styles.cameraVideo}
                        autoPlay
                        playsInline
                        muted
                    />

                    <div className={styles.cameraFrame} />

                    <p className={styles.cameraHint}>
                        Наведите камеру на QR-код ребенка
                    </p>

                    <button
                        type="button"
                        className={styles.closeCameraButton}
                        onClick={closeCamera}
                    >
                        Закрыть камеру
                    </button>
                </div>
            )}

            <div className={styles.myChildrenWrapper}>
                <div className={styles.myChildrenHeadlineWrapper}>
                    <h2 className={styles.myChildrenHeadline}>
                        Мои дети
                    </h2>
                </div>

                <div className={styles.myChildren}>
                    <div className={styles.childWrapper}>
                        {err && <div>{err}</div>}

                        {children.map((item, index) => {
                            const name =
                                item.profile?.name ||
                                item.email ||
                                "Ребенок"

                            return (
                                <div
                                    className={styles.child}
                                    key={item.id}
                                >
                                    <div
                                        className={
                                            styles.numberAndNameWrapper
                                        }
                                    >
                                        <div
                                            className={styles.childNumber}
                                        >
                                            {index + 1}
                                        </div>

                                        <span
                                            className={styles.childName}
                                        >
                                            {name}
                                        </span>
                                    </div>

                                    <Link
                                        className={styles.goToChild}
                                        href={`/app/parent/${item.id}`}
                                    >
                                        Клик
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}