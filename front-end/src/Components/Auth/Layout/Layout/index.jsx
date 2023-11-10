import Header from "./Header";
import Footer from "./Footer";
import './Layout.scss'
function LayoutAuth({ children }) {
    return (
        <div>
            <Header />
            <div className="color-body">
                {children}
            </div>

            <Footer />
        </div>
    );
}

export default LayoutAuth;