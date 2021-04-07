
const fetchCategories = async () => {
    const res = await fetch("https://opentdb.com/api_category.php");
    const resJSON = await res.json();
    
    const categoriesArray = resJSON.trivia_categories;
    const selectElement = document.getElementById('category');
    // console.log(selectElement);

    categoriesArray.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        // option.innerText = category.name;
        option.appendChild(document.createTextNode(category.name))

        selectElement.appendChild(option);
    });
};

document.addEventListener('DOMContentLoaded', fetchCategories);
