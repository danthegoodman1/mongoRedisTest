const socketio = require("socket.io-client")

const socket = socketio("http://localhost:8080")

socket.on("connect", () => {
    console.log("client connected")
})

socket.on("message", (mes) => {
    console.log(`New message from server: ${mes}`)
})

socket.on("update", (update) => {
    console.log(`${update.username} was added as a new user!`)
})

const nsp = socketio("http://localhost:8080/nsp")

nsp.on("message", (msg) => {
    console.log(`nsp message: ${msg}`)
})
