**Recipe Delight**
Recipe Delight is a dynamic and interactive platform for exploring, searching, and filtering a wide range of recipes. Whether you're looking for the latest dishes, vegetarian options, seafood delights, or a hearty breakfast, Recipe Delight has you covered. Powered by TheMealDB API, the website ensures real-time access to fresh and delicious recipe ideas.

**Features**
Search Functionality: Users can search for recipes by name using the search bar.
Latest Recipes: Displays three randomly selected recipes in the "Latest and Greatest" section.
Category Filters:
Vegetarian
Seafood
Breakfast
Each category dynamically displays three recipes.
Newsletter Subscription: Users can subscribe with their name and email to receive updates.

**Technologies Used**
HTML: For structuring the web pages.
CSS: For styling and responsive design.
JavaScript: For interactivity and API integration.
API: TheMealDB for fetching real-time recipe data.

**Usage**

Search for Recipes:

Enter a recipe name in the search bar and click the search icon to find relevant recipes.
Explore Categories:

Click on a category (e.g., Vegetarian, Seafood, Breakfast) to see three recipes from that category.
View Recipe Details:

Click on any recipe to view its details on a dedicated page.
Subscribe:

Enter your name and email in the footer section to receive a subscription acknowledgment message

**Project Structure**

Recipe Delight/
│
├── index.html         # Main HTML file
├── index.css          # Styling for the main page
├── index.js           # JavaScript for interactivity and API integration
├── category.html      # Category-based recipe page
├── recipe-details.html # Detailed view of individual recipes
├── assets/            # Images and assets for the website
└── README.md          # Project documentation

**API Integration**
The website uses TheMealDB API to fetch recipe data. Key endpoints used include:

Search: https://www.themealdb.com/api/json/v1/1/search.php?s={query}
Categories: https://www.themealdb.com/api/json/v1/1/filter.php?c={category}
Random Recipes: https://www.themealdb.com/api/json/v1/1/random.php

**Contributing**
Contributions are welcome! Follow these steps:

Fork the repository.
Create a new branch:
git checkout -b feature-name

Commit your changes:
git commit -m "Add your message"

Push to your branch:
git push origin feature-name

Submit a pull request.

License
This project is licensed under the MIT License. See the LICENSE file for details.

Contact
For questions or suggestions, please contact:

Email: muskanirfan1374@gmail.com
GitHub: github.com/muskan-irfan
