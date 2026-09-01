import HeaderLanding from "@/components/landing/header/HeaderLanding";

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
