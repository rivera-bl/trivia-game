class UI {

    constructor(){
    }

    async loadCategories(elementToFill){
        const categoriesJSON = await httpClient.get('/api_category.php')
        const categories = categoriesJSON.trivia_categories

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.appendChild(document.createTextNode(category.name))

            elementToFill.appendChild(option);
        });
    };

    // METHODS
    // formatQuestions
    // loadQuestionCount

    // TODO: solve this replace mess
    async formatQuestions(questionsToFormat) {
        questionsToFormat = await questionsToFormat.results.map(result => {
            result.incorrect_answers.forEach((choice, index) => {
                result.incorrect_answers[index] = choice.replace(/(&#039\;)/g,"\'").replace(/(&quot\;)/g,"\"").replace(/&amp;/g, '&');
            })

            result.correct_answer = result.correct_answer.replace(/(&#039\;)/g,"\'").replace(/(&quot\;)/g,"\"").replace(/&amp;/g, '&');

            // format the results
            const formattedResult = {
                question: result.question.replace(/(&#039\;)/g,"\'").replace(/(&quot\;)/g,"\"").replace(/&amp;/g, '&'),
                choices: [...result.incorrect_answers],
                correctAnswer: result.correct_answer
            };

            formattedResult.choices.push(result.correct_answer);
            // randomize the items location inside the choices array
            formattedResult.choices.sort(() => Math.random() - 0.5);
            return formattedResult;
        });

        return questionsToFormat;
    }

    async loadCurrentQuestionAndChoices(questions){
        const currentQuestion = await questions[questionCount];
        questionTitleElement.innerText = currentQuestion.question;

        choicesElements.forEach((choice, index) => {
            choice.innerText = currentQuestion.choices[index];
        });
    };
    
    toggleSpinner(gameElement, loaderElement){
        gameElement.classList.remove("hidden");
        loaderElement.classList.add("hidden");
    };
}
