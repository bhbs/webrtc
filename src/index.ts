import { join } from 'path'
import { createServer } from 'http'
import { Server } from 'socket.io'
import express from 'express'

const app = express()
const server = createServer(app)
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/index.html'))
})

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

const port = process.env.PORT || 3000
server.listen(port, () => { console.log('listening on :' + port) })
