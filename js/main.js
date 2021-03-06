const input = document.getElementById('enter-score')
const addButton = document.getElementById('add')
const clearButton = document.getElementById('clear')
const rankingsList = document.getElementById('rankings-list')

let players = []

const Player = function (name, score) {
  this.name = name
  this.score = score
}

function addPlayer () {
  let name = input.value.split(',')[0]
  let score = parseInt(input.value.split(',')[1], 10)

  if (typeof score !== 'number' || isNaN(score)) {
    return 'Not a number'
  } else if (input.value === '') {
    return false
  }

  const newPlayer = new Player(name, score)

  if (players.length > 0) {
    for (let i = 0; i < players.length; i++) {
      if (players[i].name === name) {
        players[i].score = score
        saveLocalStorage(name, score, i)
        return renderHTML()
      }
    }

    saveLocalStorage(name, score, players.length)
    players.push(newPlayer)
    return renderHTML()
  } else {
    saveLocalStorage(name, score, players.length)
    players.push(newPlayer)
    return renderHTML()
  }
}

function renderHTML () {
  rankingsList.innerHTML = ''
  let numTies = 0

  return players.sort((a, b) => {
    return a.score < b.score ? 1 : -1
  })
    .map((player, index) => {
      let points = player.score === 1 ? 'pt' : 'pts'
      index++

      if (index >= 2) {
        if (players[index - 2].score === player.score) {
          numTies++
          index -= numTies
        } else {
          numTies = 0
        }
      }

      let el = document.createElement('li')
      let textNode = document.createTextNode(`${index}. ${player.name}, ${player.score} ${points}`)
      el.appendChild(textNode)
      rankingsList.appendChild(el)
    })
}

function clearPlayers () {
  if (confirm('Are you sure? This will delete all rankings.')) {
    players = []
    localStorage.clear()
    renderHTML()
  } else {
    return false
  }
}

function saveLocalStorage (name, score, index) {
  localStorage.setItem(`name-${index}`, name)
  localStorage.setItem(`score-${index}`, score)
}

function loadLocalStorage () {
  for (var i = 0; i < window.localStorage.length / 2; i++) {
    let name = localStorage.getItem(`name-${i}`)
    let score = localStorage.getItem(`score-${i}`)
    let newPlayer = new Player(name, score)
    players.push(newPlayer)
  }
  renderHTML()
}

clearButton.addEventListener('click', clearPlayers)

addButton.addEventListener('click', function () {
  addPlayer()
  input.value = ''
})

document.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addPlayer()
    input.value = ''
  }
})

loadLocalStorage()
