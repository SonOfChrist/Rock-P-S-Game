//When something doesn't exist in local storage is going to give us null // we solve it by default values
//Default Operators == Json.parse(), Json.stringify(), localStorage.setItem(), localStorage.getItem() and localStorage.removeItem().
let score = JSON.parse(localStorage.getItem('score')) || { wins:0, losses:0, ties:0 };

updateScoreElement();

let isAutoPlaying = false

let intervalId;

// const autoPlay = () => {};
function autoPlay() {
    if (!isAutoPlaying){
        intervalId = setInterval(() => {
            const playerMove = pickComputerMoves();
            playGame(playerMove);
        }, 1000);

        document.querySelector('.js-auto-play-button').innerText = 'Stop Play'
        isAutoPlaying = true
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false

        document.querySelector('.js-auto-play-button').innerText = 'Auto Play'
    }
};

// Adding Eventlistener with the different event eg. click, keydown

document.querySelector('.js-rock-button').addEventListener('click', () => { playGame('rock') });

document.querySelector('.js-paper-button').addEventListener('click', () => { playGame('paper') });

document.querySelector('.js-scissors-button').addEventListener('click', () => { playGame('scissors') });

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r' || 'R'){
        playGame('rock');
    } else if (event.key === 'p' || 'P'){
        playGame('paper');
    } else if (event.key === 's' || 'S'){
        playGame('scissors');
    }
});

function playGame(playerMove){
    const computerMove = pickComputerMoves();

        let result = '';
            if (playerMove === 'rock'){                                      
                if (computerMove === 'rock'){
                    result = 'Tie.';
                }else if(computerMove === 'paper'){
                    result = 'You lose.';
                }else if(computerMove === 'scissors'){
                    result = 'You win.';
                }

            } else if(playerMove === 'paper'){
                if (computerMove === 'rock'){
                    result = 'You win.';
                }else if(computerMove === 'paper'){
                    result = 'Tie.';
                }else if(computerMove === 'scissors'){
                    result = 'You lose.';
                }

            } else if(playerMove === 'scissors'){
                if (computerMove === 'rock'){
                    result = 'You lose.';
                }else if(computerMove === 'paper'){
                    result = 'You win.';
                }else if(computerMove === 'scissors'){
                    result = 'Tie.';
                }
            }

            if(result === 'You win.') {
                score.wins += 1;
            } else if (result === 'You lose.'){
                score.losses += 1;
            } else if(result === 'Tie.'){
                score.ties += 1;
            }
// localStorage.setItem() they just work with string only after that we are updating the score on the page
            localStorage.setItem('score', JSON.stringify(score));

            updateScoreElement();

            document.querySelector('.js-result'). innerText = result;

            document.querySelector('.js-moves'). innerHTML = `You
                <img class="move-icon" src="Images/${playerMove}.png" alt="playerMove">
                <img class="move-icon" src="Images/${computerMove}.png" alt="computerMove">
                Computer`;

    };

    function updateScoreElement(){
        document.querySelector('.js-score').innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
    };
    
    function pickComputerMoves(){

         const randomNumber = Math.random();

            let computerMove = '';

                if(randomNumber >= 0 && randomNumber < 1/3){
                computerMove = 'rock';
                }else if(randomNumber >= 1/3 && randomNumber < 2/3){
                    computerMove = 'paper';
                }else if( randomNumber >= 2/3 && randomNumber < 1){
                    computerMove = 'scissors';
                }
            return computerMove;
    };
    function1();