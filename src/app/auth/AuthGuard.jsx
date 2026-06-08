"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const ME_QUERY = `
  query Me {
    me {
      id
      email
      role
      profile {
        id
        name
        role
        date_of_birth
        city
        timezone
      }
    }
  }
`

export default function AuthGuard({ children }) {
    const router = useRouter()
    const [isAuthChecked, setIsAuthChecked] = useState(false)

    useEffect(() => {
        async function checkAuth() {
            const accessToken = localStorage.getItem("access_token")

            if (!accessToken) {
                router.replace("/log")
                return
            }

            try {
                const response = await fetch("/api/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    },
                    body: JSON.stringify({
                        query: ME_QUERY
                    })
                })

                const result = await response.json()

                console.log("ME RESULT:", result)

                if (result.data?.me) {
                    setIsAuthChecked(true)
                    return
                }

                if (result.errors?.length) {
                    const firstError = result.errors[0]
                    const code = firstError?.extensions?.code

                    if (code === "UNAUTHENTICATED") {
                        localStorage.removeItem("access_token")
                        localStorage.removeItem("refresh_token")
                        localStorage.removeItem("session_id")
                    }

                    router.replace("/log")
                    return
                }

                router.replace("/log")

            } catch (error) {
                router.replace("/log")
            }
        }

        checkAuth()
    }, [router])

    if (!isAuthChecked) {
        return null
    }

    return children
}