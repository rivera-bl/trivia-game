class UI {

    constructor(){
    }

    async printCategories(elementToFill){
        const categoriesJSON = await httpClient.get('/api_category.php')
        const categories = categoriesJSON.trivia_categories

        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.id;
            option.appendChild(document.createTextNode(category.name))

            elementToFill.appendChild(option);
        });
    };

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

    async loadCurrentQuestionAndChoices(currentQuestion){
        questionTitleElement.innerText = currentQuestion.question;

        choicesElements.forEach((choice, index) => {
            choice.innerText = currentQuestion.choices[index];
        });

        acceptingAnswers = true;
    };

    feedbackChoiceEvaluated(e, choiceEvaluated){
        const selectedChoice = e.target;
        selectedChoice.parentElement.classList.add(choiceEvaluated);
        acceptingAnswers = false;
    }

    feedbackRemove(e, choiceEvaluated){
        const selectedChoice = e.target;
        selectedChoice.parentElement.classList.remove(choiceEvaluated);
    }

    updateHUD(questions){
        scoreElement.innerText = score;
        questionCounterElement.innerText = `${questionCount+1}/${questions.length}`;
    }
    
    toggleSpinner(gameElement, loaderElement){
        gameElement.classList.remove("hidden");
        loaderElement.classList.add("hidden");
    };
}
