import React from 'react'
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import AllBooks from './pages/AllBooks';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/all-books' element={<AllBooks />} />
          <Route path='/LogIn' element={<LogIn />} />
          <Route path='/SignUp' element={<SignUp />} />
          
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App;