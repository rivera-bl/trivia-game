const highScoresList = document.getElementById("high-scores-ul");
const highScoresLS = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = 
    // takes the LS array and returns a modified version of it
    highScoresLS.map(score => {
        return `<li class= "high-score">${score.name} - ${score.score}</li>`;
    })
    .join("");

