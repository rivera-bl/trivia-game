class Game {

    constructor(bonusCorrect){
        this.bonusCorrect = bonusCorrect;
    }
    
    async questionsLoad(questionsAmount, category=""){
        questionsAmount = `amount=${questionsAmount}`;
        category = `category=${category}`;

        const query = `${questionsAmount}&${category}&type=multiple`;

        let questions = await httpClient.get(`/api.php?${query}`);
        questions = await ui.formatQuestions(questions)

        return questions;
    }
    
    choiceEvaluate(e, currentQuestion){
        const selectedChoice = e.target;
        const choiceEvaluated = 
            selectedChoice.innerText == 
                currentQuestion.correctAnswer ? "correct" : "incorrect";
        
        if(choiceEvaluated == 'correct'){
            score += this.bonusCorrect;
        };

        return choiceEvaluated;
    }
}
