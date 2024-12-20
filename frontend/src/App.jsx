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

        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/Signin" element={<SignIn />} />
          <Route path="/Todos" element={<TodoList />} />
        </Routes>

      </Router>


    </>

  )
}

export default App
