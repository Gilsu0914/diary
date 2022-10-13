import styles from './App.module.css'

import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

import Nav from './components/Nav'
import Footer from './components/Footer'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'


function App() {

  const { isAuthReady, user } = useAuthContext()
  //const navigate = useNavigate();

  return (
    <div className={styles.app}>
      {
        isAuthReady ?
        <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={ user ? <Home /> : <Navigate replace={true} to="/login" /> }></Route>
          <Route path="/login" element={ !user ?  <Login /> : <Navigate replace={true} to="/" /> }></Route>
          <Route path="/signup" element={ !user ? <Signup /> : <Navigate replace={true} to="/" /> }></Route>
        </Routes>
        <Footer/>
        </BrowserRouter>
        : "loading..."
      }
      
    </div>
  );
}

export default App;
