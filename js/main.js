const input = document.getElementById('enter-score')
const addButton = document.getElementById('add')
const clearButton = document.getElementById('clear')
const rankingsList = document.getElementById('rankings-list')
const players = []
const Player = function () {
  this.name = name
  this.score = 0
}

function checkIfPlayerExists (name) {
  // loop over all players, return index of matching name
  for (let i = 0; i < players.length; i++) {
    if (players[i].name === name) {
      return i
    }
  }
  return false
}

function addToRankings () {
  // check for accidental click when empty
  if (input.value === '') {
    return false
  }

  let name = input.value.split(',')[0]
  let score = parseInt(input.value.split(',')[1], 10)
  let playerIndex = checkIfPlayerExists(name)

  // check if existing player returned an index number
  if (typeof playerIndex === 'number') {
    players[playerIndex].score += score
  } else {
    // push new player into players array
    players.push({'name': name, 'score': score})
  }

  // sort players array
  players.sort((a, b) => {
    return a.score < b.score ? 1 : -1
  })

  // map player names and scores to rankings list as list items
  rankingsList.innerHTML = players.map((player, index) => {
    // use 'pt' if score is 1, 'pts' otherwise
    let points = 'pts'
    if (player.score === 1) {
      points = 'pt'
    }
    // check for ties. excluding the first player, if the previous player has the same score as the current player, give the current player the same ranking
    if (index >= 1 && players[index - 1].score === players[index].score) {
      return `<li>${index}. ${player.name}, ${player.score} ${points}</li>`
    } else {
      // start with index 1 instead of 0 for ranking
      return `<li>${index + 1}. ${player.name}, ${player.score} ${points}</li>`
    }
  })
    .join('')

  // clear the input field
  input.value = ''
}

function clearRankings () {
  if (confirm('Are you sure? This will delete all rankings.')) {
    rankingsList.innerHTML = ''
  } else {
    return false
  }
}

addButton.addEventListener('click', addToRankings)
clearButton.addEventListener('click', clearRankings)
