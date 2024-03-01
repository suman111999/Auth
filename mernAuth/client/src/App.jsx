
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/welcome' element={<Welcome />} />
      </Routes>
    </>
  )
}

export default App
