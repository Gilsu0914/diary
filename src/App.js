import styles from './App.module.css'

import {BrowserRouter, Routes, Route,} from 'react-router-dom'


import Nav from './components/Nav'
import Footer from './components/Footer'

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
