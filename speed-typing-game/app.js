const word = document.getElementById('word')
const text = document.getElementById('text')
const scoreEl = document.getElementById('score')
const timeEl = document.getElementById('time')
const endgameEl = document.getElementById('end-game-container')
const settingsBtn = document.getElementById('settings-btn')
const settings = document.getElementById('settings')
const settingsForm = document.getElementById('settings-form')
const difficultySelect = document.getElementById('difficulty')

// List of words for game
const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
]

// focus on input on load
text.focus()

// Init word
let randomWord

// Init score
let score = 0

// Init time
let time = 10

// Gettign difficulty from localstrorage
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium'

// setting value of the select
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium'

// random word
const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)]
}

// add word to dom
const addWordToDom = () => {
  randomWord = getRandomWord()
  word.innerHTML = randomWord
}

// Start counting down
const timeInterval = setInterval(updateTime, 1000)

const updateScore = () => {
  score++
  scoreEl.innerHTML = score
}

addWordToDom()

function updateTime() {
  time--
  timeEl.innerHTML = time + 's'

  if (time === 0) {
    clearInterval(timeInterval)
    gameOver()
  }
}

// showing gameOver screen
function gameOver() {
  endgameEl.innerHTML = `
        <h1>Time run out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `

  endgameEl.style.display = 'flex'
}

text.addEventListener('input', (e) => {
  const insetedText = e.target.value
  if (insetedText === randomWord) {
    addWordToDom()
    updateScore()
    e.target.value = ''

    if (difficulty === 'hard') time += 2
    if (difficulty === 'medium') time += 3
    if (difficulty === 'easy') time += 5

    updateTime()
  }
})

// settings buttons
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'))

// difficulty
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value
  localStorage.setItem('difficulty', difficulty)
})
