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
        return renderHTML()
      }
    }
    players.push(newPlayer)
    return renderHTML()
  } else {
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
          console.log("there's a tie between " + players[index - 2].name + ' and ' + player.name)
          numTies++
          index -= numTies
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
    renderHTML()
  } else {
    return false
  }
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
