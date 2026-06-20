"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

const ME_QUERY = `
  query Me {
    me {
      id
      email
      role
      profile {
        name
        role
        date_of_birth
        city
        timezone
      }
    }
  }
`

export default function GetRole() {
    const router = useRouter()

    // useEffect(() => {
    //     async function checkRole() {
    //         const accessToken = localStorage.getItem("access_token")

    //         if (!accessToken) {
    //             router.replace("/log")
    //             return
    //         }

    //         try {
    //             const response = await fetch("/api/graphql", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${accessToken}`
    //                 },
    //                 body: JSON.stringify({
    //                     query: ME_QUERY
    //                 })
    //             })

    //             const result = await response.json()

    //             console.log("GET ROLE RESULT:", result)

    //             const user = result.data?.me

    //             if (!user) {
    //                 router.replace("/log")
    //                 return
    //             }

    //             const role = user.profile?.role

    //             if (role === "parent") {
    //                 router.replace("/app/parent")
    //                 return
    //             }

    //             if (role === "child") {
    //                 router.replace("/app/child")
    //                 return
    //             }

    //             router.replace("/setrole")

    //         } catch (error) {
    //             console.log("GET ROLE ERROR:", error)
    //             router.replace("/log")
    //         }
    //     }

    //     checkRole()
    // }, [router])

    return (
        <div>
            <h1>Подождите... определяем вашу роль</h1>
        </div>
    )
}