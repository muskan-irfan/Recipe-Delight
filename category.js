// Fetch and display all categories
async function fetchCategories() {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/categories.php`;
    const categoryHeader = document.querySelector('.categoryHeader');

    try {
        // Fetch categories
        const response = await fetch(apiUrl);
        const data = await response.json();
        const categories = data.categories;

        // Display categories as clickable buttons
        categories.forEach(category => {
            const categoryButton = document.createElement('button');
            categoryButton.classList.add('category-button');
            categoryButton.innerText = category.strCategory;
            categoryButton.addEventListener('click', () => fetchRecipesByCategory(category.strCategory));
            categoryHeader.appendChild(categoryButton);
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
}

// Fetch and display recipes for a specific category
async function fetchRecipesByCategory(category) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const recipeListContainer = document.querySelector('.recipe-list');

    // Clear previous recipes
    recipeListContainer.innerHTML = `<h2>${category} Recipes</h2>`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const recipes = data.meals;

        // Display each recipe in the category
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('article');
            recipeElement.classList.add('recipe-card');
            recipeElement.innerHTML = `
                <h3>${recipe.strMeal}</h3>
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" style="width:200px; border-radius:10px;" />
                <a href="recipe-details.html?id=${recipe.idMeal}" class="view-details">View Details</a>
            `;
            recipeListContainer.appendChild(recipeElement);
        });
    } catch (error) {
        console.error(`Error fetching recipes for category ${category}:`, error);
        recipeListContainer.innerHTML = `<p>Unable to load recipes. Please try again later.</p>`;
    }
}

// Initialize categories and default recipes
document.addEventListener('DOMContentLoaded', () => {
    fetchCategories();
    fetchRecipesByCategory('Breakfast'); // Default category
});

// Footer Sign-Up Functionality
document.addEventListener("DOMContentLoaded", function () {
    const footerForm = document.querySelectorAll(".footer .signUp button");
  
    footerForm.forEach((button) => {
      button.addEventListener("click", function (event) {
        const firstNameInput = this.previousElementSibling.previousElementSibling.value.trim();
        const emailInput = this.previousElementSibling.value.trim();
  
        if (firstNameInput && emailInput) {
          alert(`Thank you for subscribing to our website, ${firstNameInput}!`);
        } else {
          alert("Please enter both your Name and Email to subscribe.");
        }
      });
    });
  });
  
