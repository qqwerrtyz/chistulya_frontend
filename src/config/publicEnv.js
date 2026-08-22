// // const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL
// // const appUrl = process.env.NEXT_PUBLIC_APP_URL

// // if (!graphqlUrl) {
// //     throw new Error(
// //         "Не задана переменная окружения NEXT_PUBLIC_GRAPHQL_URL"
// //     )
// // }

// // if (!appUrl) {
// //     throw new Error(
// //         "Не задана переменная окружения NEXT_PUBLIC_APP_URL"
// //     )
// // }

// // export const GRAPHQL_URL = graphqlUrl.replace(/\/+$/, "")
// // export const APP_URL = appUrl.replace(/\/+$/, "")

// const graphqlUrl = process.env.NEXT_PUBLIC_GRAPHQL_URL
// const appUrl = process.env.NEXT_PUBLIC_APP_URL

// if (!graphqlUrl) {
//     throw new Error(
//         "Не задана переменная окружения NEXT_PUBLIC_GRAPHQL_URL"
//     )
// }

// if (!appUrl) {
//     throw new Error(
//         "Не задана переменная окружения NEXT_PUBLIC_APP_URL"
//     )
// }

// export const GRAPHQL_URL = graphqlUrl.replace(/\/+$/, "")
// export const APP_URL = appUrl.replace(/\/+$/, "")


const DEFAULT_GRAPHQL_URL =
    "https://api.xn--h1agrefu5d.xn--p1ai/graphql"

const DEFAULT_APP_URL =
    "https://xn--h1agrefu5d.xn--p1ai"

const graphqlUrl =
    process.env.NEXT_PUBLIC_GRAPHQL_URL ||
    DEFAULT_GRAPHQL_URL

const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (
        typeof window !== "undefined"
            ? window.location.origin
            : DEFAULT_APP_URL
    )

export const GRAPHQL_URL = graphqlUrl.replace(/\/+$/, "")

export const APP_URL = appUrl.replace(/\/+$/, "")