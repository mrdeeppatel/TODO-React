import { useState } from "react"
//A Wrapper Div
import AuthWrapper from "./AuthWrapper"

//SignIn API handler
import { SignInData } from "../connection/connection"

function SignIn() {

    const [Username, setUsername] = useState("")
    const [PassWord, setPassword] = useState("")
    return <AuthWrapper PageType={"Login"}>
        <div style={{ backgroundColor: "cadetblue", borderStyle: "solid", borderWidth: 2, padding: 5 }}>

            {/* <form > */}
            <label htmlFor=""><b>UserName</b></label><br />


            <input type="text" placeholder="Username Here" name="User" required

                onChange={(e) => {
                    console.log(e.target.value)
                    setUsername(e.target.value)
                }}
            /><br /><br />


            <label htmlFor=""><b>PassWord</b></label><br />


            <input type="password" placeholder="PassWord Here" name="Pass" required

                onChange={(e) => {
                    console.log(e.target.value)
                    setPassword(e.target.value)
                }}
            /> <br /> <br />
            <button type="submit" onClick={() => {

                console.log(Username + "  " + PassWord)
                alert("From Sign Component")

                //Passing the Detiles to the SignInData
                SignInData({ User: Username, Pass: PassWord })
            }}>LogIn</button>

            {/* </form> */}
        </div>
    </AuthWrapper>
}


export { SignIn }

