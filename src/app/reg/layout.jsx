// import Footer from "@/components/app/footer/Footer";
// import Header from "@/components/app/header/Header";
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
    title: "Регистрация",
    icons: {
        icon: "/avatar/favicon.png"
    },

    description:
        "Регистрация в приложении Чистюля.",

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