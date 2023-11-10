import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.scss'
function Header(props) {
    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark"  >
                <Container className="nav-non">
                    <div className="nav-non">

                        <div>
                            <Navbar.Brand>DEALCOM</Navbar.Brand>
                        </div>
                        <div>
                            <Nav className="me-auto">
                                <Nav.Link>
                                    <Link to="/" className="button-nav">
                                        Signin
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to="/signup" className="reflex">
                                        Signup
                                    </Link>
                                </Nav.Link>
                            </Nav>
                        </div>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;