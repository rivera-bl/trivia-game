const usernameElement = document.getElementById('username');
const saveScoreBtn = document.getElementById("save-score");
const finalScoreElement = document.getElementById("final-score");
const mostRecentScoreLS = localStorage.getItem("mostRecentScore");

// get the highScores array from LS, if it doesn't exist create an empty one
const highScoresLS = JSON.parse(localStorage.getItem("highScores")) || [];

finalScoreElement.innerText = mostRecentScoreLS;

usernameElement.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {
    e.preventDefault();
    console.log('clicked');

    const score = {
        score: mostRecentScoreLS,
        name: username.value
    };

    highScoresLS.push(score);
    localStorage.setItem("highScores", JSON.stringify(highScoresLS));
    console.log(highScoresLS);
}
