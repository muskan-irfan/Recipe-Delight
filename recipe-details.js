// Get the recipe ID from the URL
const queryParams = new URLSearchParams(window.location.search);
const recipeId = queryParams.get('id');

// Fetch and display recipe details
async function fetchRecipeDetails(recipeId) {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const recipe = data.meals[0];

        // Populate the page with recipe details
        document.getElementById('recipe-title').innerText = recipe.strMeal;
        document.getElementById('recipe-image').src = recipe.strMealThumb;
        document.getElementById('instructions').innerText = recipe.strInstructions;

        // Populate ingredients list
        const ingredientsList = document.getElementById('ingredients-list');
        for (let i = 1; i <= 20; i++) {
            const ingredient = recipe[`strIngredient${i}`];
            const measure = recipe[`strMeasure${i}`];
            if (ingredient && ingredient.trim() !== '') {
                const listItem = document.createElement('li');
                listItem.innerText = `${measure} ${ingredient}`;
                ingredientsList.appendChild(listItem);
            }
        }
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        document.getElementById('recipe-title').innerText = 'Error loading recipe details.';
    }
}

// Call the function
if (recipeId) {
    fetchRecipeDetails(recipeId);
} else {
    document.getElementById('recipe-title').innerText = 'Invalid Recipe ID.';
}

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
  