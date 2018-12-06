import express from 'express'
import consola from 'consola'
import dotenv from 'dotenv'
import http from 'http'
import { Nuxt, Builder } from 'nuxt'
import socket from 'socket.io'
dotenv.config()

const app = express()
const server = http.Server(app)
const io = socket(server)
const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000

app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  server.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()

let connected = []
let users = []
let typing = []
io.on('connection', socket => {
  socket.on('connected', username => {
    if (!users.find(u => u === username)) {
      connected.push({ id: socket.id, username })
      users.push(username)
    }
    io.emit('userConnected', { uname: username, users })
  })

  socket.on('typing', username => {
    if (!typing.find(t => t === username)) {
      typing.push(username)
    }
    socket.broadcast.emit('userTyping', typing)
  })

  socket.on('message', ({ msg, username }) => {
    typing = typing.filter(t => t !== username)
    socket.broadcast.emit('userTyping', typing)
    socket.broadcast.emit('userMessage', { msg, uname: username })
  })

  socket.on('disconnect', () => {
    const found = connected.find(c => c.id === socket.id)
    if (found) {
      users = users.filter(u => u !== found.username)
      connected = connected.filter(c => c.id !== socket.id)
      io.emit('userDisconnected', { uname: found.username, users })
    }
  })
})
