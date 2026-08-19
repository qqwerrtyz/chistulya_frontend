const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL
const appUrl = process.env.NEXT_PUBLIC_APP_URL

if (!graphqlUrl) {
    throw new Error(
        "Не задана переменная окружения NEXT_PUBLIC_GRAPHQL_URL"
    )
}

if (!appUrl) {
    throw new Error(
        "Не задана переменная окружения NEXT_PUBLIC_APP_URL"
    )
}

export const GRAPHQL_URL = graphqlUrl.replace(/\/+$/, "")
export const APP_URL = appUrl.replace(/\/+$/, "")