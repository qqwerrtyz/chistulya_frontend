import HeaderLanding from "@/components/landing/header/HeaderLanding";
import Link from "next/link";
import styles from "./landing.module.css"
import Image from "next/image";
import icons from "@/icons/icons";
import Main from "@/components/landing/main/Main";
import AboutApp from "@/components/landing/aboutApp/AboutApp";
import WhyImportant from "@/components/landing/whyImportant/WhyImportant";
import ForWhom from "@/components/landing/forWhom/ForWhom";
import HowGetStart from "@/components/landing/howGetStart/HowGetStart";
import FooterLanding from "@/components/landing/footerLanding/FooterLanding";
import UpButton from "@/components/landing/upButton/UpButton";
export default function Home() {

  return (
    <>
      {/* <div style={{
        display:"flex",
        flexDirection: "column"
      }}>
        <Link href={"/app/child"}>На страницу ребенка</Link>
        <Link href={"/app/parent"}>На страницу родителя</Link>
        <Link href={"/auth"}>Вход</Link>
    
      </div> */}

      <HeaderLanding />


      <Main />
       
        

      <AboutApp />

      <WhyImportant />
      
      <ForWhom />

      <HowGetStart />

      <FooterLanding />

      <UpButton />
    </>
    
  );
}
