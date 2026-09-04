

import AppLayoutClient from "./AppLayoutClient"

export const metadata = {
    title: "Личный кабинет",

    description:
        "Личный кабинет пользователя приложения Чистюля.",
    
    icons: {
        icon: "/avatar/favicon.png"
    },

    robots: {
        index: false,
        follow: false,
        nocache: true,

        googleBot: {
            index: false,
            follow: false,
            noimageindex: true
        }
    }
}

export default function Layout({
    children
}) {
    return (
        <AppLayoutClient>
            {children}
        </AppLayoutClient>
    )
}