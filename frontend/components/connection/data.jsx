import axios from 'axios'
import { useEffect } from 'react'
// import { useCookies } from "react-cookie"
// import { redirect } from 'react-router'

// const navigate = useNavigate()
function signInApi({ User, Pass }) {

    const user = {
        username: User,
        password: Pass
    }
    axios.post("http://localhost:3000/signin", {}, {
        'Content-Type': 'multipart/form-data',
        headers: user
    }).then((res) => {

        // console.log(res.data)

        document.cookie = "JWT=" + res.data.cookie + "; path=/";

        alert("User LogdIn <-> data.js")
        window.location.replace("http://localhost:5173/Todos")
        // navigate("/signin")
        // redirect("/signin")
        // window.location.replace('http://localhost:5173/signin');
    }).catch((err) => {

        console.log(err)
        alert("Can't find the user")
    })
}

function signUpApi({ User, Pass }) {

    const user = {
        username: User,
        password: Pass
    }
    //The body feild is at the second place 
    //to send the headder we have to define the body filed 
    axios.post("http://localhost:3000/signup", {}, {
        'Content-Type': 'multipart/form-data',
        headers: user
    }).then((res) => {

        console.log(res)
        // window.location
        alert("User created <-> data.js")
        // navigate("/signin")
        // redirect("/signin")
        window.location.replace('http://localhost:5173/signin');
    }).catch((err) => {

        console.log(err)
        
        alert("User Already Exists")
    })
}
function addTodoApi({ Task, Status, Deadline }) {

    //At this point we have to send the JWT along the headers

    //
    let token = getCookie()
    console.log(token + "    FROM addTodoApi")

    axios.post("http://localhost:3000/addTodo", {

        task: Task,
        status: Status,
        deadline: Deadline
    },
        {
            "Content-Type": "application/json",
            //At this time we are manualy sending the user and pass
            headers: {
                token: token
            }
        }).then((res) => {

            console.log(res)
            alert("Todo added <-> data.js")

        }).catch((err) => {
            console.log(err)
            alert("Errro In Todo Creation <-> data.js")
        })

}


//NOT IN USE <-> Moved to the Todo.jsx
function getAllTodoApi() {
    // let todos = []
    //JWT here
    let token = getCookie()
    console.log(token + "    FROM addTodoApi")

    axios.post("http://localhost:3000/getAllTodo", {}, {

        headers: {
            token: token
        }

    }).then((res) => {
        // console.log(res.data)
        // todos = res.data
        // console.log(res.data)
        return res.data
    }).catch((err) => {
        alert("Errro getting all todo <-> data.js")
        console.log(err)

        return []
    })

    //Returing the empty array until the real object is sent
    return []
}

function updateTodoApi({ TodoId, Task, Status, Deadline }) {

    let token = getCookie()
    console.log(token + "    FROM addTodoApi")

    axios.post("http://localhost:3000/updateTodo",
        {
            todoid: TodoId,
            task: Task,
            status: Status,
            deadline: Deadline

        }, {
        headers: {
            token: token
        }
    }).then((res) => {
        alert("Update success <-> data.js")

    }).catch((err) => {
        alert("Error in Update <-> data.js")

    })

}
function deleteTodoApi({ TodoId }) {
    let token = getCookie()
    console.log(token + "    FROM addTodoApi")

    axios.post("http://localhost:3000/deleteTodo", {
        todoid: TodoId
    }, {
        headers: {
            token: token
        }
    }).then((res) => {
        alert("Delete success <-> data.js")

    }).catch((err) => {
        alert("Error In Delete<-> data.js")

    })
}

function getCookie() {

    let cookis = document.cookie
    let token = undefined
    cookis.split(";").map((obj) => {
        if (obj.trim().startsWith("JWT=")) {

            token = obj.split("=")[1]
            return
        }

    })

    return token
}
export {
    signUpApi,
    signInApi,
    addTodoApi,
    getAllTodoApi,
    updateTodoApi,
    deleteTodoApi,
    getCookie

}