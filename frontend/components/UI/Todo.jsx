import { useEffect, useState } from "react"
import "./Todo.css"
import { AddTodoData, GetTodoData, UpdateTodo, DeleteTodo } from "../connection/model"
import axios from 'axios'
import { getCookie } from "../connection/data"

function TodoList() {
    //Id empty new todo if not Update todo
    const [idtoupdate, setIdToUpdate] = useState("")
    //At the Update time If update it will not be empty
    // const [todoForChange, setTodoForChange] = useState({})
    //At the fetch time
    const [todos, setTodos] = useState([])

    const [task, setTask] = useState("")
    const [status, setStatus] = useState("Pending")
    const [deadline, setDeadline] = useState("")


    useEffect(() => {
        // console.log(GetTodoData())
        renderTodos({ setTodos: setTodos })
    }, [])
    {/* <div style={{ float: 'left', marginLeft: "10%" }}> */ }

    return <>
        <div style={{ display: "inline-flex", marginLeft: "10%", marginTop: "2%" }}>
            <table style={{ fontFamily: "sans-serif" }}>
                <tbody>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Deadline</th>
                        <th>Action</th>
                    </tr>
                    {
                        todos.map((obj) => {
                            const date = new Date(obj.deadline)
                            // Returing the row 
                            //Now on every iterate the new raw gets added
                            return <tr key={obj._id}>
                                <td>{obj.task}</td>
                                <td>{obj.status}</td>
                                {/* <td>{date.toLocaleDateString()},&ensp; {date.toLocaleTimeString()}</td> */}
                                <td>{date.toLocaleDateString("hi-IN") + "   " + date.toLocaleTimeString()}</td>
                                <td>
                                    <button className="buttonEdit" onClick={() => {

                                        // _id: obj._id,
                                        setTask(obj.task)
                                        setStatus(obj.status)
                                        setDeadline(obj.deadline)

                                        setIdToUpdate({ _id: obj._id })


                                    }}>Edit</button>
                                    <button className="buttonDelete" onClick={() => {
                                        DeleteTodo({ TodoId: obj._id })
                                        {
                                            setTimeout(() => {
                                                renderTodos({ setTodos: setTodos })
                                            }, 1200)
                                        }
                                    }}>Delete</button>
                                </td>
                            </tr>

                        })}
                </tbody>
            </table>
            <div style={{ float: "right", marginLeft: 5, }}>
                <button onClick={() => {
                    { document.cookie = "JWT" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'; }
                    renderTodos({ setTodos: setTodos })
                }}>
                    LogOut
                </button>
            </div>
        </div >

        {/* <TodoInput idtoupdate={idtoupdate} setIdToUpdate={setIdToUpdate}
            task={task} setTask={setTask} status={status} setStatus={setStatus} deadline={deadline}
            setDeadline={setDeadline} setTodos={setTodos}/> */}
        <div style={{ maxWidth: 300, float: 'right', marginRight: "25%" }}>


            <h3>Add Task</h3>
            <div style={{ backgroundColor: "Ivory", padding: 20, maxHeight: 270, maxWidth: 300 }}>


                <TodoTask id={idtoupdate} task={task} setTask={setTask} taskToEdit={task} />
                {/* {console.log(props.todoForChange)} */}
                <TodoStatus id={idtoupdate} status={status} setStatus={setStatus} statusToEdit={status} />
                <TodoDeadline id={idtoupdate} deadline={deadline} setDeadline={setDeadline} deadlineToEdit={deadline} />


                <TodoButton id={idtoupdate} setIdToUpdate={setIdToUpdate}
                    task={task} status={status} deadline={deadline}
                    setDeadline={setDeadline}
                    setTask={setTask}
                    setStatus={setStatus}
                    setTodos={setTodos}
                />
            </div>
        </div>

    </>
}

function renderTodos({ setTodos }) {
    let token = getCookie()
    console.log(token + "    FROM addTodoApi")

    if (token == undefined) {
        window.location.replace('http://localhost:5173/signin');
        return
    }
    axios.post("http://localhost:3000/getAllTodo", {}, {
        headers: {
            token: token
        }
    }).then((res) => {
        console.log(res)

        if (res.status == 211) {
            alert("Token Not valid at TODO.js")
            window.location.replace('http://localhost:5173/signin');
            return

        }

        setTodos(res.data)
    }).catch((err) => {
        alert("Errro getting all todo <-> data.js")
        console.log(err)

        return []
    })
}


function TodoButton(props) {

    if (props.id == "") {
        return <>
            <button onClick={() => {
                AddTodoData({
                    Task: props.task,
                    Status: props.status,
                    Deadline: props.deadline
                })
                {
                    setTimeout(() => {
                        renderTodos({ setTodos: props.setTodos })
                    }, 1200)
                }

            }}>Save</button></>
    } else {

        return <>
            <button onClick={() => {
                UpdateTodo({ Task: props.task, Status: props.status, Deadline: props.deadline, TodoId: props.id })
                setTimeout(() => {
                    renderTodos({ setTodos: props.setTodos })
                }, 1200)
            }}>Update</button>


            <button onClick={() => {
                props.setStatus("Pending"),
                    props.setIdToUpdate(""),
                    props.setDeadline(""),
                    props.setTask("")
            }}>cancle</button>
        </>
    }
}
function TodoTask(props) {

    if (props.id == "") {
        return <>
            <label>Task</label><br />
            <input type="text" placeholder="New Task" onChange={(e) => {


                props.setTask(e.target.value)

            }} /><br /></>

    } else {

        return <>
            <label>Task</label><br />
           


            <input type="text" placeholder="Edit the task" value={props.taskToEdit} onChange={(e) => {


                props.setTask(e.target.value)

            }} /><br />
        </>
    }
}
function TodoStatus(props) {
    const val = props.status

    if (props.id == "") {

        return <>
            <label>Status</label><br />
            <select defaultValue={"Pending"} onChange={(e) => {
                props.setStatus(e.target.value)
            }}>
                <option value="Pending">Pending</option>
                <option value="OnGoing">OnGoing</option>
                <option value="Completed">Completed</option>
            </select><br />
        </>
    } else {

        return <>
            <label>Status new</label><br />
            <select defaultValue={"OnGoing"} onChange={(e) => {
                // setSelected(e.target.value)
                props.setStatus(e.target.value)
            }}>
                <option value="Pending" selected={(val == "Pending") ? true : false}>Pending</option>
                <option value="OnGoing" selected={(val == "OnGoing") ? true : false}>OnGoing</option>
                <option value="Completed" selected={(val == "Completed") ? true : false}>Completed</option>
            </select><br />
        </>
    }
}
function TodoDeadline(props) {
    const now = new Date();
    const formattedDate = now.toISOString().slice(0, 16);
    if (props.id == "") {
        return <>

            <label >Deadline</label><br />
            <label >mm/dd/yyyy</label><br />
            <input type="datetime-local" value={props.deadlineToEdit} min={formattedDate} max="9999-12-31T23:59" onChange={(e) => {


                props.setDeadline(e.target.value)

            }} /><br /><br />

        </>
    } else {




        return <>

            <label >Deadline</label><br />
            <label >mm/dd/yyyy New</label><br />
            <input type="datetime-local" value={props.deadlineToEdit} min={formattedDate} max="9999-12-31T23:59" onChange={(e) => {


                props.setDeadline(e.target.value)
            }} /><br /><br />

        </>
    }
}

export {
    TodoList
    // TodoInput
}