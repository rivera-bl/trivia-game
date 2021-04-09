const httpClient = new HttpClient('https://opentdb.com');
const ui = new UI();

const selectElement = document.getElementById('category');
ui.printCategories(selectElement);

const playBtn = document.getElementById("play");
playBtn.addEventListener('click', () => {
    const categoriesElement = document.getElementById('category');
    const categoryId = categoriesElement.value;
    const categoryName = categoriesElement.selectedOptions[0].text; 

    localStorage.setItem("category", categoryId);
    localStorage.setItem("categoryName", categoryName);
});

