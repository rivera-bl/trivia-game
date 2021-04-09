const httpClient = new HttpClient('https://opentdb.com');
const ui = new UI();

const selectElement = document.getElementById('category');
ui.loadCategories(selectElement);

const playBtn = document.getElementById("play");
playBtn.addEventListener('click', (e) => {
    const category = document.getElementById('category').value;

    localStorage.setItem("category", category);
});

