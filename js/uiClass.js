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

    async loadCurrentQuestionAndChoices(currentQuestion){
        questionTitleElement.innerHTML = currentQuestion.question;

        choicesElements.forEach((choice, index) => {
            choice.innerHTML = currentQuestion.choices[index];
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
