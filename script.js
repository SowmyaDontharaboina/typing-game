const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');


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
    'loving'
];

//init word
let difficulty = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : 'medium';
difficultySelect.value = localStorage.getItem("difficulty") !== null ? localStorage.getItem("difficulty") : 'medium';
let randomWord = '';

let score = 0;

let time = 10;

const getRandomWord = () => {
    return words[Math.floor(Math.random() * words.length)];
}

const addWordToDom = () => {
    randomWord = getRandomWord();
    word.innerText = randomWord;
}
addWordToDom();

const updateScore = () => {
    score++;
    scoreEl.innerText = score;
}

const gameOver = () => {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final Score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';
};

const updateTime = () => {
    time--;
    timeEl.innerText = `${time}s`
    if(time === 0) {
        clearInterval(timeInterval);
        gameOver();
    }
}

text.addEventListener('input', e => {
    const enteredText = e.target.value;
    if(randomWord === enteredText) {
        addWordToDom();
        updateScore();
        e.target.value = '';
       if(difficulty === 'hard') {
        time +=2;
       } else if(difficulty === 'medium')  {
        time +=3;
       } else {
        time +=5;
       }
        updateTime();
    }
})

text.focus();

//start count

const timeInterval = setInterval(updateTime, 1000);

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'))

difficultySelect.addEventListener('change', (e) => {
    difficulty = e.target.value;

    localStorage.setItem('difficulty', difficulty);
})