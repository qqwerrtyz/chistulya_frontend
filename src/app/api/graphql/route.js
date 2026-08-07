export async function POST(request) {
    try {
        const body = await request.json()

        const authHeader = request.headers.get("authorization")

        const response = await fetch("https://api.xn--h1agrefu5d.xn--p1ai/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(authHeader ? { Authorization: authHeader } : {})
            },
            body: JSON.stringify(body)
        })

        const data = await response.json()

        return Response.json(data, {
            status: response.status
        })
    } catch (error) {
        return Response.json(
            {
                errors: [
                    {
                        message: "Ошибка прокси-запроса к GraphQL API"
                    }
                ]
            },
            {
                status: 500
            }
        )
    }
}


// export async function POST(request) {
//     try {
//         const body = await request.json()
//         const authHeader = request.headers.get("authorization")

//         console.log("GRAPHQL PROXY REQUEST:", body)

//         const response = await fetch(
//             "https://api.xn--h1agrefu5d.xn--p1ai/graphql",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                     ...(authHeader
//                         ? { Authorization: authHeader }
//                         : {})
//                 },
//                 body: JSON.stringify(body),
//                 cache: "no-store"
//             }
//         )

//         const responseText = await response.text()

//         console.log("GRAPHQL API STATUS:", response.status)
//         console.log("GRAPHQL API RESPONSE:", responseText)

//         let data

//         try {
//             data = JSON.parse(responseText)
//         } catch {
//             console.error(
//                 "GRAPHQL API RETURNED NOT JSON:",
//                 responseText
//             )

//             return Response.json(
//                 {
//                     errors: [
//                         {
//                             message:
//                                 "GraphQL API вернул ответ не в формате JSON",
//                             server_response: responseText
//                         }
//                     ]
//                 },
//                 {
//                     status: response.status || 500
//                 }
//             )
//         }

//         return Response.json(data, {
//             status: response.status
//         })
//     } catch (error) {
//         console.error("GRAPHQL PROXY ERROR:", error)

//         return Response.json(
//             {
//                 errors: [
//                     {
//                         message:
//                             "Ошибка прокси-запроса к GraphQL API",
//                         details:
//                             error instanceof Error
//                                 ? error.message
//                                 : String(error)
//                     }
//                 ]
//             },
//             {
//                 status: 500
//             }
//         )
//     }
// }