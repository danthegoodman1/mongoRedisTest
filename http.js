const http = require("http")
const socketio = require("socket.io")
const express = require("express")

const server = http.createServer()
const app = express(server)
const io = socketio(server)

app.get("/", (req, res) => {
    res.send("hello")
})

const nsp = io.of("/nsp")

nsp.on("connection", (socket) => {
    console.log("Connection on nsp")
    socket.emit("message", "welcome to nsp")
    // nsp.sockets[`${socket.id}`].emit("message", "hehe")
})

io.on("connection", (socket) => {
    console.log("socket connected")
    socket.emit("message", "Welcome, user!")
    // io.sockets.connected[`${socket.id}`].emit("message", "found you")
    setTimeout(() => {

    }, 2000)
})

module.exports.app = app
module.exports.io = io

server.listen(8080, () => {
    console.log("socket server listening on port 8080")
})
