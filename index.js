const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://danthegoodman:danthegoodman@cluster0-uxq2y.gcp.mongodb.net/ooo?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }) // change admin to test in path. Mongoose grabs database from .net/{db} where as mongodb library needs it specified
const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error:"))

db.once("open", () => {
    console.log("connected")
    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        }
    })
    const User = mongoose.model("User", userSchema, "ooo")
    const dan = new User({ name: "Dane" })
    // console.log(dan.name)
    const collection = db.collection("ooo")
    // collection.countDocuments()
    // .then((count) => {
    //     console.log(count, "devices")
    // })
    // collection.insertOne({
    //     name: "daneee"
    // })
    // .then(() => {
    //     console.log("inserted")
    // })
    // .catch((err) => {
    //     console.error(err)
    // })
    // dan.save()
    // .then(() => {
    //     console.log("saved")
    // })
    // .catch((err) => {
    //     // console.error(err)
    // })

    // User.findOne({ name: "danneeeee" }, (err, users) => {
    //     console.log(users)
    //     // setTimeout(() => {
    //     //     console.log("updating")

    //     //     users.update({ name: "danneeeeer" }, (err, raw) => {
    //     //         if (err) {
    //     //             console.error(err)
    //     //         } else {
    //     //             console.log("updated usscess")
    //     //         }
    //     //     })
    //     // }, 2000)
    // })
    const stream = collection.watch()
    stream.on("change", (data) => {
        console.log("change:")
        // console.log(data)
    })
    collection.find({}).toArray() // query everything
    .then((data) => {
        console.log(data)
        data.forEach((ele) => {
            console.log(ele._id)
        })
    })
    // setTimeout(() => {
    //     collection.insertOne({
    //         name: "daneee"
    //     })
    //     .then(() => {
    //         console.log("inserted")
    //     })
    //     .catch((err) => {
    //         console.error(err)
    //     })
    // }, 5000)
})
