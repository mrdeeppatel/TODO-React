// const axios = require("axios")
function SignInData({ User, Pass }) {

    if (User == "" || Pass == "") {
        alert("Empty value <-> From Connection Function - SignInData")
        return
    }
    const obj = {
        username: User,
        password: Pass
    }
    console.log("UserName = " + User + " PassWord = " + Pass)

}


function SignUpData({ User, Pass }) {
    if (User == "" || Pass == "") {
        alert("Empty value <-> From Connection Function - SignUpData")
        return
    }
    const obj = {
        username: User,
        password: Pass
    }
    /*Axios automatically sets the Content-Type header based on the payload format.
    For example, the following POST request’s content type becomes application/json:*/

    axios.post("SignUP API ", {
        headers: obj
    })
    console.log("UserName = " + User + " PassWord = " + Pass)
    alert("")
}


export {
    SignInData,
    SignUpData
}