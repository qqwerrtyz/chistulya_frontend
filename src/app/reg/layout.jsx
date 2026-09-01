import Footer from "@/components/app/footer/Footer";
import Header from "@/components/app/header/Header";
import OnlyPhone from "@/components/onlyPhone/page";



export default function Layout({children}) {
    return (
        <div >
         
            <OnlyPhone />
            {children}
        </div>
    )
}