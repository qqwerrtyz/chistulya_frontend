// import NoPhoto from "@/components/app/noPhoto/NoPhoto";
// import "./globals.css"
// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body >
//         {children}
//       </body>
//     </html>
//   );
// }


import "./globals.css"

const siteUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://чистуля.рф"

export const metadata = {
    metadataBase: new URL(siteUrl),

    title: {
        default: "Чистюля",
        template: "%s | Чистюля"
    },
    icons: {
        icon: "/avatar/favicon.png"
    },

    description:
        "Чистюля — игровое приложение для формирования полезных привычек у детей.",

    applicationName: "Чистюля",

    keywords: [
        "Чистюля",
        "полезные привычки",
        "гигиена для детей",
        "детские задания",
        "мотивация ребёнка"
    ]
}

export const viewport = {
    themeColor: "#4272EA"
}

export default function RootLayout({
    children
}) {
    return (
        <html lang="ru">
            <body>
                {children}
            </body>
        </html>
    )
}