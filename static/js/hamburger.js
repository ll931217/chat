const hamburger = document.querySelector('.hamburger')
const users = document.querySelector('.users')

hamburger.addEventListener('click', () => {
  users.classList.toggle('open')
  hamburger.classList.toggle('open')
})
