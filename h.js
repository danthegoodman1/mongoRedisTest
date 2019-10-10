const MongoClient = require('mongodb').MongoClient

const uri = "mongodb+srv://danthegoodman:danthegoodman@cluster0-uxq2y.gcp.mongodb.net/admin?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

client.connect((err) => {
    if (err) throw err
    console.log("connected")
    const collection = client.db("test").collection("ooo")
    collection.countDocuments()
    .then((count) => {
        console.log(count, "devices")
    })

    const stream = collection.watch()
    stream.on("change", (data) => {
        console.log("change:")
        console.log(data)
    })

    setTimeout(() => {
        collection.insertOne({
            name: "daneee"
        })
        .then(() => {
            console.log("inserted")
        })
        .catch((err) => {
            console.error(err)
        })
    }, 5000)

    // client.close()
})
