"use client"
import Footer from "@/components/app/footer/Footer";
import Header from "@/components/app/header/Header";
import NoPhoto from "@/components/app/noPhoto/NoPhoto";
import AuthGuard from "../auth/AuthGuard";
import { useEffect, useState } from "react";

const stylesBody = {
    minHeight: "100vh",
    padding: "0px",
    backgroundColor: "#4272EA",
    boxSizing: "border-box"
};

const stylesChildrenWrapper = {
    paddingTop: "50px",
    paddingBottom: "90px"
};

export default function Layout({ children }) {
    const [role, setRole] = useState(null)

    useEffect(() => {
        const savedRole = localStorage.getItem("role")
        setRole(savedRole)
    }, [])
    return (
        <AuthGuard>
            {/* <NoPhoto /> */}
            <div style={stylesBody}>
                <Header />
                <div style={stylesChildrenWrapper}>
                    {children}
                </div>
                {role !== "parent" && role !== null && (
                    <Footer />
                )}
            </div>
        </AuthGuard>
    );
}
