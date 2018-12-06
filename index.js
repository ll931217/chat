import express from 'express'
import http from 'http'
import sassMiddleware from 'node-sass-middleware'
import path from 'path'
import socket from 'socket.io'

const app = express()
const server = http.Server(app)
const io = socket(server)

app.set('view engine', 'pug')
app.use(sassMiddleware({
  src: path.join(__dirname, 'assets'),
  dest: path.join(__dirname, 'static'),
  force: true,
  indentedSyntax: true
}))
app.use(express.static(path.join(__dirname, '/static')))

app.get('/', (req, res) => {
  res.render('index', { title: 'Login' })
})

app.get('/chat', (req, res) => {
  res.render('chat/index', { title: 'Chat' })
})

let users = []
let typing = []
io.on('connection', socket => {
  socket.on('connected', username => {
    if (!users.find(u => u === username)) {
      users.push(username)
    }
    io.emit('user connected', { uname: username, users })
  })

  socket.on('typing', username => {
    if (!typing.find(t => t === username)) {
      typing.push(username)
    }
    socket.broadcast.emit('user typing', typing)
  })

  socket.on('message', ({ msg, username }) => {
    typing = typing.filter(t => t !== username)
    socket.broadcast.emit('user typing', typing)
    socket.broadcast.emit('user message', { msg, uname: username })
  })
})

server.listen(5000, () => console.log('Server is listening on http://localhost:5000'))
