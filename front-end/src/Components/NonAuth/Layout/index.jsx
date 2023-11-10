import Header from "./Header";
import Footer from "../../Auth/Layout/Layout/Footer";

function LayoutNonAuth({ children }) {
    return (
        <div>
            <Header />
            {children}
            <Footer />
        </div>
    );
}

export default LayoutNonAuth;