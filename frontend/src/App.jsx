import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthWrapper from '../components/UI/AuthWrapper'
import { SignIn } from '../components/UI/SignIN'
import { SignUp } from '../components/UI/SignUP'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>

    </Router>
    // <SignIn />
  )
}

export default App
