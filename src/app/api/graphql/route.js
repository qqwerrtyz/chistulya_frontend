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