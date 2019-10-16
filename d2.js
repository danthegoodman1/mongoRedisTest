const http = require("http")
const socketio = require("socket.io")
const redis = require('socket.io-redis')
const server = http.createServer()
const io = socketio(server)
io.adapter(redis({ host: '167.99.11.238', port: 6379, auth_pass: 'danthegoodman'}))

io.on('connection', socket => {
    console.log("socket connectedd")
})

server.listen(8081, () => {
    console.log("d2 listening on 8081")
})
