const quotes = [
    'Success is not final, failure is not fatal: It is the courage to continue that counts.',
    'The only limit to our realization of tomorrow will be our doubts of today.',
    'Don’t watch the clock; do what it does. Keep going.',
    'Believe you can and you’re halfway there.',
    'It always seems impossible until it’s done.',
    'The future belongs to those who believe in the beauty of their dreams.',
    'Your time is limited, don’t waste it living someone else’s life.'
];

let words = [];
let wordIndex = 0;
let startTime = 0;
let timerInterval;

const quoteElement = document.getElementById('quote');
const messageElement = document.getElementById('message');
const typedValueElement = document.getElementById('typed-value');
const startButton = document.getElementById('start');
const timerElement = document.getElementById('timer');

startButton.addEventListener('click', function () {
    const quoteIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[quoteIndex];
    words = quote.split(' ');
    wordIndex = 0;

    const spanWords = words.map(word => `<span>${word}</span>`);
    quoteElement.innerHTML = spanWords.join(' ');

    quoteElement.childNodes[0].classList.add('highlight');
    messageElement.innerText = '';

    typedValueElement.value = '';
    typedValueElement.classList.remove('error');
    typedValueElement.focus();

    startTime = new Date().getTime();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
});

function updateTimer() {
    const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
    timerElement.innerText = `Time: ${elapsedTime}s`;
}

typedValueElement.addEventListener('input', () => {
    const currentWord = words[wordIndex];
    const typedValue = typedValueElement.value.trim();

    if (typedValue === currentWord && wordIndex === words.length - 1) {
        const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
        const message = `CONGRATULATIONS! You finished in ${elapsedTime} seconds.`;
        messageElement.innerText = message;
        clearInterval(timerInterval);
    } else if (typedValue.endsWith(' ') && typedValue === currentWord) {
        typedValueElement.value = '';
        wordIndex++;
        for (const wordElement of quoteElement.childNodes) {
            wordElement.classList.remove('highlight');
        }
        quoteElement.childNodes[wordIndex].classList.add('highlight');
    } else if (currentWord.startsWith(typedValue)) {
        typedValueElement.classList.remove('error');
    } else {
        typedValueElement.classList.add('error');
    }
});
