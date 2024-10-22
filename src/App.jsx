import './App.css'


// React Hooks
import { BrowserRouter, Route, Routes } from 'react-router-dom'

// Pages
import Home from './pages/Home/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
