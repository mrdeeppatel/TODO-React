import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AuthWrapper from '../components/UI/Wrapper'
import { SignIn } from '../components/UI/SignIN'
import { SignUp } from '../components/UI/SignUP'
import { TodoList } from '../components/UI/Todo'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/Signin" element={<SignIn />} />
        </Routes>

      </Router>

      <TodoList></TodoList>
      {/* <TodoInput></TodoInput> */}
    </>

  )
}

export default App
