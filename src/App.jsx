import './App.css';

// Custom Hooks
import { useAuth } from './hooks/useAuth';

// React Hooks
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import Service from './pages/Service/Service';

function App() {
  const {auth, loading} = useAuth();
  
  if(loading) {
    return <p>Loading...</p>
  }
  return (
    <>
      <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/services' element={<Service/>} />
            <Route path="/login"  element={!auth ? <Login /> : <Navigate to='/'/>} />
            <Route path="/register"  element={!auth ? <Register /> : <Navigate to='/'/>} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
