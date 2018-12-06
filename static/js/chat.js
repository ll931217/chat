/* eslint-env browser */

/* eslint-disable no-undef */
// const socket = io('http://localhost:5000')
const socket = io()
/* eslint-enable no-undef */
const $ = el => document.querySelector(el)

const appendMessage = (msg, username, owner) => {
  const div = document.createElement('div')
  div.setAttribute('class', 'msg-container')
  const p = document.createElement('p')
  p.setAttribute('class', 'msg-box')
  if (owner) {
    p.classList.add('owner')
  }
  const span = document.createElement('span')
  const name = document.createTextNode(username + ': ')
  span.appendChild(name)
  p.appendChild(span)
  const message = document.createTextNode(msg)
  p.appendChild(message)
  div.appendChild(p)
  $('.chat-output').appendChild(div)
}
const appendNotification = msg => {
  $('.status').innerHTML = msg
}
const appendUser = user => {
  const li = document.createElement('li')
  const text = document.createTextNode(user)
  li.appendChild(text)
  $('ul.users-list').appendChild(li)
}

if (sessionStorage.getItem('username')) {
  const username = sessionStorage.getItem('username')

  socket.emit('connected', username)
  $('.chat-input').addEventListener('keydown', e => socket.emit('typing', username))
  $('.chat-form').addEventListener('submit', e => {
    e.preventDefault()
    e.stopPropagation()

    socket.emit('message', { msg: $('.chat-input').value, username })
    appendMessage($('.chat-input').value, username, true)
    $('.chat-output').scrollTop = $('.chat-output').scrollHeight
    $('.chat-input').value = ''
  })

  socket.on('user connected', ({ uname, users }) => {
    $('ul.users-list').innerHTML = ''
    users.forEach(user => {
      if (user !== username) {
        appendUser(user)
      }
    })
    if (uname !== username) {
      appendNotification(`${uname} has connected`)
    }
  })
  socket.on('user typing', usernames => {
    usernames = usernames.filter(u => u !== username)
    if (usernames.length !== 0) {
      const users = usernames.join(', ')
      appendNotification(`${users} is typing`)
    } else {
      appendNotification('')
    }
  })
  socket.on('user message', ({ msg, uname }) => {
    appendMessage(msg, uname, false)
    $('.chat-output').scrollTop = $('.chat-output').scrollHeight
  })
} else {
  window.location = '/'
}
