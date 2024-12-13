const { Router } = require("express")
const route = Router()
const { userMiddleware } = require("../midleware/userMiddleware")
const { userModel } = require("../models/userModel")



route.post("/signup", userMiddleware, async (req, res) => {

    const username = req.headers.username;
    const password = req.headers.password;

    const response = await userModel.findOne({
        username: username,
        // password: password
    })


    if (response) {

        console.log("User Already Exsist <-> route.js")
        res.status(411).json({ MSG: "User Already Exsist" })
        return
    }

    await userModel.create({
        username: username,
        password: password
    })

    console.log("User Created <-> route.js")
    res.status(200).json({ MSG: "User Created" })

})

route.post("/signin", userMiddleware, async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    const response = await userModel.findOne({
        username: username,
        password: password
    })
    if (!response) {

        console.log("User Doesn't Exsist <-> route.js")
        res.status(411).json({ MSG: "User Doedn't Exsist" })
        return
    }

    res.status(200).json({
        MSG: "SignIN Successful"
    })

})

route.post("/addTodo", async (req, res) => {

    //Change this with the JWT
    const username = req.headers.username;
    const password = req.headers.password;


    //ADD Zod authanticatin
    console.log(req.body)
    let response = await userModel.findOne({
        username: username,
        password: password
    })
    if (!response) {

        console.log("User Doesn't Exsist to extrect todo <-> route.js")
        res.status(411).json({ MSG: "User Doedn't Exsist" })
        return
    }

    // console.log()
    const task = req.body.task
    const status = req.body.status
    const deadline = req.body.deadline

    await userModel.updateOne({
        username: username
    }, {
        "$push": {
            todos: {
                task: task,
                status: status,
                deadline: deadline
            }
        }
    })
    res.json("Todo added")
})

route.post("/getAllTodo", async (req, res) => {
    const username = req.headers.username;
    const password = req.headers.password;

    let response = await userModel.findOne({
        username: username,
        password: password
    })

    console.log(response.todos)
    res.json(response.todos)

})

route.post("/updateTodo", async (req, res) => {    //Change this with the JWT
    const username = req.headers.username;
    const password = req.headers.password;

    let response = await userModel.findOne({
        username: username,
        password: password
    })
    if (!response) {

        console.log("User Doesn't Exsist to extrect todo <-> route.js")
        res.status(411).json({ MSG: "User Doedn't Exsist" })
        return
    }

    const task = req.body.task
    const status = req.body.status
    const deadline = req.body.deadline
    const todoid = req.body.todoid

    //ADD Zod authanticatin
    // console.log(req.headers)

    const isUpdated = await userModel.findOneAndUpdate({
        username: username,
        "todos._id": todoid
    }, {
        "$set": {
            "todos.$.task": task,
            "todos.$.status": status,
            "todos.$.deadline": deadline
        }
    })



    console.log(isUpdated)
    res.send(isUpdated)

})

module.exports = { route }