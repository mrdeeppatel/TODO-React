import { useState } from "react"
//A Wrapper Div
import AuthWrapper from "./Wrapper"

//SignIn API handler
import { SignUpData } from "../connection/model"

function SignUp() {

    const [Username, setUsername] = useState("")
    const [PassWord, setPassword] = useState("")
    

    return <AuthWrapper PageType={"SignUp"}>
        <div style={{ backgroundColor: "cadetblue", borderStyle: "solid", borderWidth: 2, padding: 5 }}>


                <label htmlFor=""><b>UserName</b></label><br />


                <input type="text" placeholder="Username Here" name="User" required

                    onChange={(e) => {
                       
                        setUsername(e.target.value)
                    }}
                /><br /><br />


                <label htmlFor=""><b>PassWord</b></label><br />


                <input type="password" placeholder="PassWord Here" name="Pass" required

                    onChange={(e) => {
                       
                        setPassword(e.target.value)
                    }}
                /> <br /> <br />
                <button type="submit" onClick={() => {

               
                    alert("From Sign Component")

                    //Passing the Detiles to the SignInData
                    // SignUpData({ User: Username, Pass: PassWord })


                    SignUpData({ User: Username, Pass: PassWord })
                }}>SignUp</button>
                <button style={{float:"right", marginRight:"5%"}} onClick={()=>{
                    window.location.replace('http://localhost:5173/signin')
                }}>Login Page</button>

            
        </div>
    </AuthWrapper>
}


export { SignUp }

