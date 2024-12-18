// Sea// Footer Sign-Up Functionality
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

