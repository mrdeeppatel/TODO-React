
//Creating the Wrapper for the SignUP and the SignIN
//Both SignUp and SignIn will have a Headder named {Create Account} {Login} 
//The type will be provided by the component which is using it 

//Basicaly we are exporting a pre built component wrapper that will be used for 
//Both Login and Create Account will have the same outer
function AuthWrapper({ children, PageType }) {


    return <div style={{ backgroundColor: "powderblue", width: 300, border: 3, borderColor: "black", borderStyle: "solid", padding: 20 }}>

        <h1>{PageType}</h1>

        {children}
    </div>

}

export default AuthWrapper