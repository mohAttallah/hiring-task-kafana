import './App.css'
import Signup from './Components/NonAuth/Signup';
import Signin from './Components/NonAuth/Signin';
import DealCard from './Components/Auth/Deal';
import LayoutNonAuth from './Components/NonAuth/Layout';
import LayoutAuth from './Components/Auth/Layout/Layout';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Claimed from './Components/Auth/Claimed';
import UserList from './Components/Auth/Admin/User';

function App() {
  const isAuthState = useSelector(state => state.signin.isAuth);
  const tokenState = useSelector(state => state.signin.token)
  const userState = useSelector((state) => state.signin.userData);

  const navigate = useNavigate();
  const AuthenticatedRoutes = () => (
    <>

      <Route path="/deal" element={<DealCard />} />
      <Route path="/claimed" element={<Claimed />} />
      {userState.Role === 'admin' && (
        <Route path="/users" element={<UserList />} />
      )}
      {tokenState === null && (
        <Route path="/" element={<Signin />} />
      )}
    </>
  );

  const NonAuthenticatedRoutes = () => (
    <>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      {/* Other non-authenticated routes */}
    </>
  );

  useEffect(() => {
    if (tokenState === null) {
      navigate('/')
    }
  }, [tokenState]);

  return (
    <>
      {isAuthState ? (
        <LayoutAuth>

          <Routes>
            {AuthenticatedRoutes()}
          </Routes>
        </LayoutAuth>
      ) :
        <LayoutNonAuth>
          <Routes>
            {NonAuthenticatedRoutes()}
          </Routes>
        </LayoutNonAuth>
      }
    </>
  )
}

export default App;
