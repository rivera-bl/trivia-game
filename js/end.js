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

    const score = {
        score: mostRecentScoreLS,
        name: username.value
    };

    highScoresLS.push(score);

    // this sorts the array returning the b.score only if its value is positive when substracting a.score. TODO: review if it's a better way
    highScoresLS.sort((a,b) => b.score - a.score)
    // remove every item from index 5
    highScoresLS.splice(5);

    // update LS and go back home
    localStorage.setItem("highScores", JSON.stringify(highScoresLS));
    window.location.assign("/");
}
