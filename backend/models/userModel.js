const mongoos = require("mongoose")
//Create .env file and t=store the user in side it or replace "Your MongoDB URL" with your url
mongoos.connect("Your MongoDB URL/TODO-React")

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