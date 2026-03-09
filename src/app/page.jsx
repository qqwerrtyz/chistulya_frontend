import HeaderLanding from "@/components/landing/header/HeaderLanding";
import Link from "next/link";
import styles from "./landing.module.css"
import Image from "next/image";
import icons from "@/icons/icons";
import Main from "@/components/landing/main/Main";
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
       
        




      
    </>
    
  );
}
