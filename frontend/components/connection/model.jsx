import { signUpApi, signInApi, addTodoApi, getAllTodoApi, updateTodoApi, deleteTodoApi } from "./data"

function SignInData({ User, Pass }) {

    if (User == "" || Pass == "") {
        alert("Empty value <-> From Connection Function - SignInData")
        return
    }

    console.log("UserName = " + User + " PassWord = " + Pass)

    signInApi({ User: User, Pass: Pass })
}


function SignUpData({ User, Pass }) {
    if (User == "" || Pass == "") {
        alert("Empty value <-> From Connection Function - SignUpData")
        return
    }

    /*Axios automatically sets the Content-Type header based on the payload format.
    For example, the following POST request’s content type becomes application/json:*/

    // axios.post("SignUP API ", {
    //     headers: obj
    // })
    console.log("UserName = " + User + " PassWord = " + Pass)
    // alert("")

    signUpApi({ User: User, Pass: Pass })
}

function AddTodoData({ Task, Status, Deadline }) {

    //Send the JWT in the headder 

    if (Task == "" || Status == "" || Deadline == "") {

        alert("Fild can't be empty")
        return
    }
    console.log(" Task = " + Task + " Status = " + Status + " Deadline = " + Deadline)
    addTodoApi({ Task: Task, Status: Status, Deadline: Deadline })

}

function GetTodoData() {

    return getAllTodoApi()
    // console.log(todos)
    // return
}

function UpdateTodo({ TodoId, Task, Status, Deadline }) {

    if (Task == "" || Status == "" || Deadline == "") {

        alert("Fild can't be empty")
        return
    }

    updateTodoApi({ TodoId: TodoId, Task: Task, Status: Status, Deadline: Deadline })


}


function DeleteTodo({ TodoId }) {

    deleteTodoApi({ TodoId: TodoId })
}


export {
    SignInData,
    SignUpData,
    AddTodoData,
    GetTodoData,
    UpdateTodo,
    DeleteTodo
}