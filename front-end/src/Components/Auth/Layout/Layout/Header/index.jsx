import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.scss'
import { useDispatch, useSelector } from "react-redux";
import { signoutUser } from "../../../../../store/reducer/signin";
import { useNavigate } from 'react-router-dom';
import AddNewDeal from "../../../Admin/AddNewDeal";

function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSignout = async () => {
        // e.preventDefault();
        const success = await dispatch(signoutUser())

        if (success) {
            navigate('/');
        }
    }

    const userState = useSelector((state) => state.signin.userData);




    return (
        <div>
            <Navbar className="nav-auth" >
                <Container className="nav-auth">
                    <div className="nav-auth">

                        <div>
                            <Nav className="me-auto">
                                <Navbar.Brand>DEALCOM</Navbar.Brand>

                                <Nav.Link>
                                    <Link to="/deal" className="button-nav">
                                        Deals
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    <Link to="/claimed" className="button-nav">
                                        Claimed
                                    </Link>
                                </Nav.Link>
                                <Nav.Link>
                                    {userState.Role === 'admin' && (
                                        <Link to="/users" className="button-nav">
                                            Users List
                                        </Link>
                                    )}
                                </Nav.Link>
                                <AddNewDeal />
                            </Nav>
                        </div>
                        <div>

                            <Nav.Link>
                                <button className="signout" onClick={handleSignout}> Signout</button>
                            </Nav.Link>
                        </div>
                    </div>
                </Container>
            </Navbar>
        </div >
    );
}

export default Header;