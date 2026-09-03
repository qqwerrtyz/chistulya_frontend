// "use client"
// import Footer from "@/components/app/footer/Footer";
// import Header from "@/components/app/header/Header";
// import NoPhoto from "@/components/app/noPhoto/NoPhoto";
// import AuthGuard from "../auth/AuthGuard";
// import { useEffect, useState } from "react";

// const stylesBody = {
//     minHeight: "100vh",
//     padding: "0px",
//     backgroundColor: "#4272EA",
//     boxSizing: "border-box"
// };

// const stylesChildrenWrapper = {
//     paddingTop: "50px",
// };

// export default function Layout({ children }) {
//     const [role, setRole] = useState(null)

//     useEffect(() => {
//         const savedRole = localStorage.getItem("role")
//         setRole(savedRole)
//     }, [])
//     return (
//         <AuthGuard>
//             {/* <NoPhoto /> */}
//             <div style={stylesBody}>
//                 <Header />
//                 <div style={stylesChildrenWrapper}>
//                     {children}
//                 </div>
//                 {role !== "parent" && role !== null && (
//                     <Footer />
//                 )}
//             </div>
//         </AuthGuard>
//     );
// }

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