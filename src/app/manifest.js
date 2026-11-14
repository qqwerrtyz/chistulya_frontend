
export default function manifest() {
    return {
        name: "Чистюля",
        short_name: "Чистюля",
        description:
            "Игровое приложение для формирования полезных привычек у детей.",

        start_url: "/",
        display: "standalone",

        background_color: "#ffffff",
        theme_color: "#4272EA",

        icons: [
            {
                src: "/avatar/android-icon-192.png",
                sizes: "192x192",
                type: "image/png"
            },
            {
                src: "/avatar/android-icon-512.png",
                sizes: "512x512",
                type: "image/png"
            }
        ]
    }
}
