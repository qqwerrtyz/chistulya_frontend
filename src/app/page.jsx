import HeaderLanding from "@/components/landing/header/HeaderLanding";

import Main from "@/components/landing/main/Main";
import AboutApp from "@/components/landing/aboutApp/AboutApp";
import WhyImportant from "@/components/landing/whyImportant/WhyImportant";
import ForWhom from "@/components/landing/forWhom/ForWhom";
import HowGetStart from "@/components/landing/howGetStart/HowGetStart";
import FooterLanding from "@/components/landing/footerLanding/FooterLanding";
import UpButton from "@/components/landing/upButton/UpButton";
export const metadata = {
    title: {
        absolute:
            "Чистюля — полезные привычки для детей"
    },

    description:
        "Игровое приложение, которое помогает детям формировать полезные привычки, выполнять ежедневные задания и получать награды.",

    alternates: {
        canonical: "/"
    },

    openGraph: {
        title:
            "Чистюля — полезные привычки для детей",

        description:
            "Помогаем детям формировать полезные привычки через игру, задания и награды.",

        url: "/",
        siteName: "Чистюля",
        locale: "ru_RU",
        type: "website"
    },

    twitter: {
        card: "summary_large_image",

        title:
            "Чистюля — полезные привычки для детей",

        description:
            "Формирование полезных детских привычек через игру."
    }
}
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
