import Footer from "@/components/app/footer/Footer";
import Header from "@/components/app/header/Header";
import NoPhoto from "@/components/app/noPhoto/NoPhoto";

const stylesBody = {
    minHeight: "100vh",
    padding: "0px",
    backgroundColor: "#4272EA",
    boxSizing: "border-box"
};

const stylesChildrenWrapper = {
    paddingTop: "50px",
    paddingBottom: "90px"
};

export default function Layout({ children }) {
    return (
        <>
            <NoPhoto />
            <div style={stylesBody}>
                <Header />
                <div style={stylesChildrenWrapper}>
                    {children}
                </div>
                <Footer />
            </div>
        </>
    );
}