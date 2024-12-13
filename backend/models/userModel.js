const mongoos = require("mongoose")

mongoos.connect("mongodb+srv://100xDev:i0XUrTfJXBtKTdk4@cluster0.9uh7q.mongodb.net/TODO-React")

const userSchema = mongoos.Schema({
    username: String,
    password: String,
    todos: [{
        task: String,
        status: String,
        deadline: String
    }]
})

const userModel = mongoos.model("User", userSchema)

module.exports = { userModel }