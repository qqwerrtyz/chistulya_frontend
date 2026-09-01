import OnlyPhone from "@/components/onlyPhone/page";



export default function Layout({children}) {
    return (
        <div >
            
            <OnlyPhone />
            {children}
        </div>
    )
}