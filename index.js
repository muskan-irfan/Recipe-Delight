// API Base URL
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

// Fetch recipes by search term
async function searchRecipes(query) {
    try {
        const response = await fetch(`${BASE_URL}search.php?s=${query}`);
        const data = await response.json();
        return data.meals || [];
    } catch (error) {
        console.error('Error searching recipes:', error);
        return [];
    }
}

// Fetch random recipes (used for latest recipes)
async function fetchRandomRecipes(count = 3) {
    const recipes = [];
    for (let i = 0; i < count; i++) {
        try {
            const response = await fetch(`${BASE_URL}random.php`);
            const data = await response.json();
            recipes.push(data.meals[0]);
        } catch (error) {
            console.error('Error fetching random recipe:', error);
        }
    }
    return recipes;
}

// Fetch recipes by category
async function fetchRecipesByCategory(category) {
    try {
        const response = await fetch(`${BASE_URL}filter.php?c=${category}`);
        const data = await response.json();
        return data.meals.slice(0, 3); // Limit to 3 recipes
    } catch (error) {
        console.error(`Error fetching recipes for ${category}:`, error);
        return [];
    }
}

// Display recipes in the Latest Recipes section
async function displayLatestRecipes() {
    const latestRecipeContainer = document.querySelector('.latestRecipe');
    const recipes = await fetchRandomRecipes(3);

    recipes.forEach(recipe => {
        const article = document.createElement('div');
        article.classList.add('article');
        article.innerHTML = `
            <div class="latestImage">
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            </div>
            <div class="latestContent">
                <h2>${recipe.strMeal}</h2>
                <a href="recipe-details.html?id=${recipe.idMeal}">View Details</a>
            </div>
        `;
        latestRecipeContainer.appendChild(article);
    });
}

// Display recipes for a selected category
async function handleCategoryClick(category) {
    const categoryContainer = document.querySelector('.latestRecipe');
    categoryContainer.innerHTML = `<h2>${category} Recipes</h2>`;
    const recipes = await fetchRecipesByCategory(category);

    recipes.forEach(recipe => {
        const article = document.createElement('div');
        article.classList.add('article');
        article.innerHTML = `
            <div class="latestImage">
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            </div>
            <div class="latestContent">
                <h2>${recipe.strMeal}</h2>
                <a href="recipe-details.html?id=${recipe.idMeal}">View Details</a>
            </div>
        `;
        categoryContainer.appendChild(article);
    });
}

// Handle recipe search
async function handleSearch() {
    const query = document.querySelector('.search-input').value.trim();
    if (!query) return;

    const searchResults = document.querySelector('.latestRecipe');
    searchResults.innerHTML = `<h2>Search Results for "${query}"</h2>`;
    const recipes = await searchRecipes(query);

    recipes.forEach(recipe => {
        const article = document.createElement('div');
        article.classList.add('article');
        article.innerHTML = `
            <div class="latestImage">
                <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            </div>
            <div class="latestContent">
                <h2>${recipe.strMeal}</h2>
                <a href="recipe-details.html?id=${recipe.idMeal}">View Details</a>
            </div>
        `;
        searchResults.appendChild(article);
    });
}

// Handle subscription
function handleSubscription() {
    const firstName = document.getElementById('first-name').value.trim();
    const email = document.querySelector('.signUp input[type="email"]').value.trim();

    if (!firstName || !email) {
        alert('Please enter both your name and email.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    alert(`Thank you, ${firstName}! You have subscribed to Recipe Delight.`);
}

// Email validation
function validateEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Add event listeners
function initialize() {
    document.querySelector('.btn').addEventListener('click', handleSearch);
    document.querySelector('.vegetarian').addEventListener('click', () => handleCategoryClick('Vegetarian'));
    document.querySelector('.seafood').addEventListener('click', () => handleCategoryClick('Seafood'));
    document.querySelector('.breakfast').addEventListener('click', () => handleCategoryClick('Breakfast'));
    document.querySelector('.signUp button').addEventListener('click', handleSubscription);

    // Display latest recipes on load
    displayLatestRecipes();
}

// Initialize when DOM content is loaded
document.addEventListener('DOMContentLoaded', initialize);
