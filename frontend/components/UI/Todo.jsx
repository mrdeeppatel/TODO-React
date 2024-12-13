import { useEffect, useState } from "react"
import "./Todo.css"
import { AddTodoData, GetTodoData, UpdateTod } from "../connection/model"
import axios from 'axios'

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
        const user = {
            username: "newuser",
            password: "1234"
        }

        axios.post("http://localhost:3000/getAllTodo", {}, {
            headers: user
        }).then((res) => {

            setTodos(res.data)
            console.log(res.data)
        }).catch((err) => {
            alert("Errro getting all todo <-> data.js")
            console.log(err)

            return []
        })

        // console.log(GetTodoData())
    }, [])
    {/* <div style={{ float: 'left', marginLeft: "10%" }}> */ }

    return <>
        <div style={{ display: "inline-flex", backgroundColor: "red", marginLeft: "10%", marginTop: "2%" }}>
            <table style={{ fontFamily: "sans-serif" }}>
                <tbody>
                    <tr>
                        <th>Task</th>
                        <th>Status</th>
                        <th>Deadline</th>
                        <th>Action</th>
                    </tr>
                    {todos.map((obj) => {
                        const date = new Date(obj.deadline)
                        // Returing the row 
                        //Now on every iterate the new raw gets added
                        return <tr key={obj._id}>
                            <td>{obj.task}</td>
                            <td>{obj.status}</td>
                            {/* <td>{date.toLocaleDateString()},&ensp; {date.toLocaleTimeString()}</td> */}
                            <td>{obj.deadline}</td>
                            <td>
                                <button className="buttonEdit" onClick={() => {

                                    // _id: obj._id,
                                    setTask(obj.task)
                                    setStatus(obj.status)
                                    setDeadline(obj.deadline)

                                    setIdToUpdate({ _id: obj._id })


                                }}>Edit</button>
                                <button className="buttonDelete">Delete</button>
                            </td>
                        </tr>

                    })}
                </tbody>
            </table>
        </div >
        <TodoInput idtoupdate={idtoupdate} setIdToUpdate={setIdToUpdate}
            task={task} setTask={setTask} status={status} setStatus={setStatus} deadline={deadline}
            setDeadline={setDeadline}

        />

    </>
}

function TodoInput({ idtoupdate, setIdToUpdate, task, setTask, status, setStatus, deadline, setDeadline }) {


    return <div style={{ maxWidth: 300, float: 'right', marginRight: "25%" }}>


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
            />
        </div>
    </div>
}

export {
    TodoList
    // TodoInput
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
            }}>Save</button></>
    } else {

        return <>
            <button onClick={() => {
                UpdateTod({ Task: props.task, Status: props.status, Deadline: props.deadline, TodoId: props.id })
            }}>Update</button>


            <button onClick={() => {
                props.setIdToUpdate(""),
                    props.setDeadline(""),
                    props.setStatus(""),
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

                console.log(e.target.value)
                props.setTask(e.target.value)
                if (e.target.value == "") {

                    alert("Can't be null")
                }
            }} /><br /></>

    } else {

        return <>
            <label>Task</label><br />
            {console.log(props.taskToEdit)}


            <input type="text" placeholder="Edit the task" value={props.taskToEdit} onChange={(e) => {

                console.log(e.target.value)
                props.setTask(e.target.value)
                if (e.target.value == "") {

                    alert("Can't be null")
                }
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

    if (props.id == "") {
        return <>

            <label >Deadline</label><br />
            <label >mm/dd/yyyy</label><br />
            <input type="datetime-local" defaultValue="2024-12-31T22:59" min="2024-12-31T22:59" max="9999-12-31T23:59" onChange={(e) => {

                console.log(e.target.value)
                props.setDeadline(e.target.value)

            }} /><br /><br />

        </>
    } else {


        return <>

            <label >Deadline</label><br />
            <label >mm/dd/yyyy New</label><br />
            <input type="datetime-local" value={props.deadlineToEdit} min="2024-12-31T22:59" max="9999-12-31T23:59" onChange={(e) => {

                console.log(e.target.value)
                props.setDeadline(e.target.value)
            }} /><br /><br />

        </>
    }
}
