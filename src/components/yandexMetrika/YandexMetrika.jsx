"use client"

import { useEffect } from "react"

export default function YandexMetrica() {
    useEffect(() => {
        const initMetrika = () => {
            const consent = localStorage.getItem("cookieConsent")

            if (consent !== "accepted") {
                return
            }

            // Не запускаем Метрику повторно
            if (window.ym) {
                return
            }

            ;(function(m, e, t, r, i, k, a) {
                m[i] =
                    m[i] ||
                    function() {
                        ;(m[i].a = m[i].a || []).push(arguments)
                    }

                m[i].l = 1 * new Date()

                for (let j = 0; j < document.scripts.length; j++) {
                    if (document.scripts[j].src === r) {
                        return
                    }
                }

                k = e.createElement(t)
                a = e.getElementsByTagName(t)[0]

                k.async = 1
                k.src = r

                a.parentNode.insertBefore(k, a)
            })(
                window,
                document,
                "script",
                "https://mc.webvisor.org/metrika/tag_ww.js?id=112400079",
                "ym"
            )

            window.ym(112400079, "init", {
                ssr: true,
                webvisor: true,
                trackHash: true,
                clickmap: true,
                ecommerce: "dataLayer",
                referrer: document.referrer,
                url: location.href,
                accurateTrackBounce: true,
                trackLinks: true
            })
        }

        // Проверяем согласие при загрузке страницы
        initMetrika()

        // Если пользователь нажал "Принять" без перезагрузки страницы
        window.addEventListener(
            "cookieConsentUpdated",
            initMetrika
        )

        return () => {
            window.removeEventListener(
                "cookieConsentUpdated",
                initMetrika
            )
        }
    }, [])

    return null
}