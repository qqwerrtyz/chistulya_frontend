

"use client"

import { GRAPHQL_URL } from "@/config/publicEnv"

import Image from "next/image"
import styles from "./Parent.module.css"
import icons from "@/icons/icons"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"

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

export default function Parent() {
    const [children, setChildren] = useState([])
    const [err, setErr] = useState(null)
    const [showCamera, setShowCamera] = useState(false)

    const videoRef = useRef(null)

    async function openCamera() {
    try {
        setShowCamera(true)

        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: {
                    ideal: "environment"
                }
            },
            audio: false
        })

        if (videoRef.current) {
            videoRef.current.srcObject = stream
        }

    } catch (error) {
        console.log("CAMERA ERROR:", error)
    }
    }

    function closeCamera() {
    if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject

        stream.getTracks().forEach(track => {
            track.stop()
        })

        videoRef.current.srcObject = null
    }

    setShowCamera(false)
}

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
                        "Authorization": `Bearer ${accessToken}`
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
                <h1 className={styles.parentOfficeHeadline}>Кабинет Родителя</h1>
            </div>
<div
    className={styles.addChildWrapper}
    onClick={openCamera}
>
    <span className={styles.addChild}> Добавить ребенка</span>

    <Image
        src={icons.plusBlue}
        className={styles.plusBlue}
        alt="add child"
    />
</div>

    {showCamera && (
    <>
        <video
            ref={videoRef}
            autoPlay
            playsInline
            className={styles.cameraVideo}
            style={{ 
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 9999,
                width: "100%",
                height: "100%",
                objectFit: "cover"
            }}
        />

        <button onClick={closeCamera}>
            Закрыть камеру
        </button>
    </>
)}

            <div className={styles.myChildrenWrapper}>
                <div className={styles.myChildrenHeadlineWrapper}>
                    <h2 className={styles.myChildrenHeadline}>Мои дети</h2>
                </div>

                <div className={styles.myChildren}>
                    <div className={styles.childWrapper}>

                        {err && (
                            <div>
                                {err}
                            </div>
                        )}

                        {
                            children.map((item, index) => {
                                const name = item.profile?.name || item.email || "Ребенок"

                                return (
                                    <div className={styles.child} key={item.id}>
                                        <div className={styles.numberAndNameWrapper}>
                                            <div className={styles.childNumber}>{index + 1}</div>
                                            <span className={styles.childName}>{name}</span>
                                        </div>
                                        

                                        <Link 
                                            className={styles.goToChild} 
                                            href={`/app/parent/${item.id}`}
                                        >
                                            Клик
                                        </Link>
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