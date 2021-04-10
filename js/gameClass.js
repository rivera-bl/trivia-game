// Trivia would be a more appropiate name
class Game {

    constructor(bonusCorrect){
        this.bonusCorrect = bonusCorrect;
    }
    
    // TODO:
    // could narrow the tasks of this function. the function is called questionsLoad,
    // so its job shoud only be to take the questions and get them back.
    // its name could even be queryFormat,
    // and the questions could be fetched(1) and fomatted(2) straight from startGame
    async questionsLoad(questionsAmount, category=""){
        questionsAmount = `amount=${questionsAmount}`;
        category = `category=${category}`;
        const query = `${questionsAmount}&${category}&type=multiple`;
        const questions = await httpClient.get(`/api.php?${query}`);
        const questionsFormatted = await this.formatQuestions(questions)
        return questionsFormatted;
    }
    
    async formatQuestions(questionsToFormat) {
        questionsToFormat = await questionsToFormat.results.map(result => {
            // format the results
            const formattedResult = {
                question: result.question,
                choices: [...result.incorrect_answers],
                correctAnswer: result.correct_answer
            };

            formattedResult.choices.push(result.correct_answer);
            // randomize the items location of the choices array
            formattedResult.choices.sort(() => Math.random() - 0.5);
            return formattedResult;
        });

        return questionsToFormat;
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
