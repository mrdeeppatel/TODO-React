import axios from 'axios'
import { useEffect } from 'react'

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

        console.log(res)
        window.location
        alert("User LogdIn <-> data.js")
        // navigate("/signin")
        // redirect("/signin")
        // window.location.replace('http://localhost:5173/signin');
    }).catch((err) => {

        console.log(err)
        alert("Errro in user Login <-> data.js")
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
        window.location
        alert("User created <-> data.js")
        // navigate("/signin")
        // redirect("/signin")
        window.location.replace('http://localhost:5173/signin');
    }).catch((err) => {

        console.log(err)
        alert("Errro in user creation <-> data.js")
    })
}
function addTodoApi({ Task, Status, Deadline }) {

    //At this point we have to send the JWT along the headers




    //
    axios.post("http://localhost:3000/addTodo", {


        task: Task,
        status: Status,
        deadline: Deadline
    },
        {
            "Content-Type": "application/json",

            //At this time we are manualy sending the user and pass
            headers: {
                username: "newuser",
                password: "1234"
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
    const user = {
        username: "user1",
        password: "user123"
    }

    axios.post("http://localhost:3000/getAllTodo", {}, {
        headers: user
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
    axios.post("http://localhost:3000/updateTodo",
        {
            todoid: TodoId,
            task: Task,
            status: Status,
            deadline: Deadline

        }, {
        headers: {
            username: "newuser",
            password: "1234"
        }
    }).then((res) => {
        alert("Update success <-> data.js")

    }).catch((err) => {
        alert("Update success <-> data.js")

    })

}
export {
    signUpApi,
    signInApi,
    addTodoApi,
    getAllTodoApi,
    updateTodoApi
}