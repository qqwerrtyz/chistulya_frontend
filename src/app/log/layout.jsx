// import OnlyPhone from "@/components/onlyPhone/page";



// export default function Layout({children}) {
//     return (
//         <div >
            
//             <OnlyPhone />
//             {children}
//         </div>
//     )
// }


import OnlyPhone from "@/components/onlyPhone/page"

export const metadata = {
    title: "Вход",
    icons: {
        icon: "/avatar/favicon.png"
    },

    description:
        "Вход в личный кабинет приложения Чистюля.",

    robots: {
        index: false,
        follow: false
    }
}

export default function Layout({
    children
}) {
    return (
        <div>
            <OnlyPhone />

            {children}
        </div>
    )
}