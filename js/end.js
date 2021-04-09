const usernameElement = document.getElementById('username');
const saveScoreBtn = document.getElementById("save-score");
const finalScoreElement = document.getElementById("final-score");
const mostRecentScoreLS = localStorage.getItem("mostRecentScore");
const categoryNameLS = localStorage.getItem("categoryName");
const highScoresLS = JSON.parse(localStorage.getItem("highScores")) || [];

finalScoreElement.innerText = mostRecentScoreLS;

// only when the input has text it enables the save btn
usernameElement.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {
    e.preventDefault();

    const score = {
        score: mostRecentScoreLS,
        name: username.value,
        category: categoryNameLS 
    };

    highScoresLS.push(score);
    highScoresLS.sort((a,b) => b.score - a.score)
    highScoresLS.splice(5); // remove every item from index 5

    // update LS and go back home
    localStorage.setItem("highScores", JSON.stringify(highScoresLS));
    window.location.assign("/index.html");
}
