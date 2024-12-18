// API Base URL and key (use the free TheMealDB API)
const BASE_URL = 'https://www.themealdb.com/api/json/v1/1/';

// Function to fetch top-rated recipes from the API
async function fetchTopRatedRecipes() {
    const recipeCardsContainer = document.querySelector('#top-rated-recipes');
    recipeCardsContainer.innerHTML = ""; // Clear previous results
    try {
        const response = await fetch(`${BASE_URL}search.php?s=`); // Fetching all recipes
        const data = await response.json();

        if (data.meals) {
            let counter = 0;
            // Limit to 4 top-rated recipes (or any other number you prefer)
            data.meals.forEach(meal => {
                if (counter < 4) { // Show only top 4 recipes
                    const recipeCard = document.createElement('div');
                    recipeCard.classList.add('recipe-card');
                    recipeCard.innerHTML = `
                        <a href="recipe-details.html?id=${meal.idMeal}">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        </a>
                        <h2>${meal.strMeal}</h2>
                       
                        <p>${meal.strCategory} - ${meal.strArea}</p>
                    `;
                    recipeCardsContainer.appendChild(recipeCard);
                    counter++;
                }
            });
        } else {
            console.log('No top-rated recipes found.');
        }
    } catch (error) {
        console.error('Error fetching top-rated recipes:', error);
    }
}

// Function to filter recipes based on the search keyword using TheMealDB API
async function searchRecipes() {
    const searchInput = document.querySelector('.search-bar input').value.trim();
    const recipeCardsContainer = document.querySelector('.recipe-grid');
    recipeCardsContainer.innerHTML = ""; // Clear previous results
    let found = false;

    if (searchInput) {
        try {
            const response = await fetch(`${BASE_URL}search.php?s=${searchInput}`);
            const data = await response.json();
            
            if (data.meals) {
                data.meals.forEach(meal => {
                    found = true;
                    const recipeCard = document.createElement('div');
                    recipeCard.classList.add('recipe-card');
                    recipeCard.innerHTML = `
                        <a href="recipe-details.html?id=${meal.idMeal}">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        </a>
                        <h2>${meal.strMeal}</h2>
                        <p>${meal.strCategory} - ${meal.strArea}</p>
                    `;
                    recipeCardsContainer.appendChild(recipeCard);
                });
            }

            // Handle the "No recipes found" message
            const heroSection = document.querySelector('.hero');
            let noResultsMessage = document.querySelector('.no-results-message');

            if (!found) {
                if (!noResultsMessage) {
                    noResultsMessage = document.createElement('p');
                    noResultsMessage.textContent = "No recipes found. Please try a different keyword.";
                    noResultsMessage.classList.add('no-results-message');
                    noResultsMessage.style.color = "#e74c3c"; // Red for error
                    heroSection.appendChild(noResultsMessage);
                }
            } else if (noResultsMessage) {
                noResultsMessage.remove(); // Remove the message if recipes are found
            }

        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    }
}

// Function to display all recipes when the "View All Recipes" button is clicked
async function viewAllRecipes() {
    const recipeCardsContainer = document.querySelector('.recipe-grid');
    recipeCardsContainer.innerHTML = ""; // Clear previous results
    try {
        const response = await fetch(`${BASE_URL}search.php?s=`);
        const data = await response.json();

        if (data.meals) {
            data.meals.forEach(meal => {
                const recipeCard = document.createElement('div');
                recipeCard.classList.add('recipe-card');
                recipeCard.innerHTML = `
                    <a href="recipe-details.html?id=${meal.idMeal}">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    </a>
                    <h2>${meal.strMeal}</h2>
                    <p>${meal.strCategory} - ${meal.strArea}</p>
                `;
                recipeCardsContainer.appendChild(recipeCard);
            });
        }

        // Hide the "View All Recipes" button after it is clicked
        const viewAllButton = document.querySelector('.view-all-btn');
        if (viewAllButton) {
            viewAllButton.style.display = 'none'; // Hide the button after it is clicked
        }
    } catch (error) {
        console.error('Error fetching all recipes:', error);
    }
}

// Function to validate and process the email subscription form
function subscribeToNewsletter() {
    const firstName = document.getElementById('first name').value.trim();
    const email = document.querySelector('.signUp input[type="email"]').value.trim();
    const feedbackContainer = document.querySelector('.signUp'); // Feedback container is inside the sign-up section

    // Remove any existing feedback messages
    let existingMessage = feedbackContainer.querySelector('.feedback-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Validate inputs
    if (!firstName || !email) {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "Please enter both your name and email address.";
        errorMessage.style.color = "#e74c3c"; // Red for error
        errorMessage.classList.add('feedback-message');
        feedbackContainer.appendChild(errorMessage);
        return;
    }

    if (!validateEmail(email)) {
        const invalidEmailMessage = document.createElement('p');
        invalidEmailMessage.textContent = "Please enter a valid email address.";
        invalidEmailMessage.style.color = "#e74c3c"; // Red for error
        invalidEmailMessage.classList.add('feedback-message');
        feedbackContainer.appendChild(invalidEmailMessage);
        return;
    }

    // Show success message
    const successMessage = document.createElement('p');
    successMessage.textContent = `Thank you, ${firstName}! You will receive updates at ${email}.`;
    successMessage.style.color = "#28a745"; // Green for success
    successMessage.classList.add('feedback-message');
    feedbackContainer.appendChild(successMessage);

    // Clear the form fields
    document.querySelector('.signUp form').reset();

    // Remove the feedback message after 5 seconds
    setTimeout(() => {
        if (successMessage) {
            successMessage.remove();
        }
    }, 5000);
}

// Helper function to validate email format
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Attach event listeners
document.addEventListener('DOMContentLoaded', fetchTopRatedRecipes); // Ensure top-rated recipes are fetched after the DOM is loaded
document.querySelector('.search-icon').addEventListener('click', searchRecipes);
document.querySelector('.search-bar button').addEventListener('click', searchRecipes);
document.querySelector('.view-all-btn').addEventListener('click', viewAllRecipes);
document.querySelector('.signUp button').addEventListener('click', subscribeToNewsletter);
