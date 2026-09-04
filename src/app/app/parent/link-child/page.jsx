
import { Suspense } from "react"
import LinkChildClient from "./LinkChildClient"

export default function LinkChildPage() {
    return (
        <Suspense fallback={<div>Привязываем ребёнка...</div>}>
            <LinkChildClient />
        </Suspense>
    )
}