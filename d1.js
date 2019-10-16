const http = require("http")
const socketio = require("socket.io")
const redis = require('socket.io-redis')
const server = http.createServer()
const io = socketio(server)
io.adapter(redis({ host: '167.99.11.238', port: 6379, auth_pass: 'danthegoodman'}))

setTimeout(() => {
    io.emit("message", "heyyyyy")
    console.log("emitted")
}, 3000)

server.listen(8080, () => {
    console.log("d1 listening on 8080")
})
