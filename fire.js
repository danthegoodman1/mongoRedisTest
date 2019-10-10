const mongoose = require("mongoose")
const {io, app} = require("./http")

mongoose.connect("mongodb+srv://dan:dan@cluster0-uxq2y.gcp.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

// Handle errors
db.on("error", console.error.bind(console, "connection error:"))

// Define a User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: "username is required",
        trim: true,
        validate: (input) => { return input.length > 0 },
        unique: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    }
})

// Define model from schema
const User = mongoose.model("User", userSchema, "Users")

db.once("open", () => {
    console.log("connected")
    const collection = db.collection("Users")

    // Get document count
    User.countDocuments((err, num) => {
        console.log(`There are ${num} User documents`)
    })

    setTimeout(() => {
        // Create a new instance of our model
        const dan = new User({
            username: "danthegoodman",
            firstName: "Dan",
            lastName: "Goodman"
        })

        // Save our model to the DB
        dan.save()
    }, 2000)

    // Listen for change events
    const stream = collection.watch()
    stream.on("change", (event) => {
        switch (event.operationType) {
        case "delete":
            console.log(`${event.documentKey._id} was deleted`)
            break

        case "insert":
            console.log(`${event.documentKey._id} was inserted`)
            io.emit("update", event.fullDocument)
            break

        default:
            break
        }
    })

    User.findOneAndDelete({ username: "danthegoodman" }, (err, res) => {
        // console.log(res)
    })
})
