
const formSubmit = document.querySelector('form')
const search = document.querySelector('input')
const fristP = document.querySelector('#p-1')
const secondP = document.querySelector('#p-2')


formSubmit.addEventListener('submit', (e) => {
  e.preventDefault()
  const location = search.value

  fristP.textContent = 'Loading...'
  secondP.textContent = ''

  fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
      if(data.error) {
        fristP.textContent = data.error
      } else {
        fristP.textContent = data.location
        secondP.textContent = data.weather
        search.value = ''
      }
    })
  })
})
