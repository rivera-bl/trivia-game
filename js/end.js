const usernameElement = document.getElementById('username');
const saveScoreBtn = document.getElementById("save-score");
const finalScoreElement = document.getElementById("final-score");
const scoreLS = localStorage.getItem("Score");

finalScoreElement.innerText = scoreLS;

usernameElement.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})

saveHighScore = (e) => {
    e.preventDefault();
    console.log('clicked');
}
