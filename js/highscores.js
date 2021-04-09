const highScoresTableElement = document.getElementById("high-scores-table");
const highScoresLS = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresLS.forEach((highscore, index) =>{

    let tr = document.createElement('tr');
    let tdRank = tr.appendChild(document.createElement('td'));
    tdRank.innerHTML = index+1;

    Object.values(highscore).forEach(value => {

        let td = tr.appendChild(document.createElement('td'));
        td.innerHTML = value;
    })

    highScoresTableElement.appendChild(tr);
});


