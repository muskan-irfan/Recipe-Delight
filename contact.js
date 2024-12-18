document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally
  
    // Collect form data
    const name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
  
    // Force lowercase email
    email = email.toLowerCase();
    document.getElementById('email').value = email;  // Update the email field to reflect the lowercase email
  
    // Validate email format (must contain @ and end with a valid domain like gmail.com, example.org, etc.)
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|edu|gov)$/;
    const feedback = document.getElementById('form-feedback');
  
    if (name && email && message) {
      // Check if email matches the pattern (it must contain @ and a valid domain ending with .com, .org, etc.)
      if (!emailPattern.test(email)) {
        feedback.innerHTML = "<p>Oops! Please enter a valid email address (e.g., example@gmail.com, example.org).</p>";
        feedback.style.color = "#e74c3c"; // Red error message
        return; // Stop further processing
      }
  
      // Simulate sending the message
      feedback.innerHTML = `<p>Thank you, ${name}! Your message has been sent successfully.</p>`;
      feedback.style.color = "#28a745"; // Green success message
      
      // Clear the form fields
      document.getElementById('contact-form').reset();
    } else {
      feedback.innerHTML = "<p>Oops! Please fill out all fields.</p>";
      feedback.style.color = "#e74c3c"; // Red error message
    }
  });
  
  // Listen for input in the email field and convert to lowercase
  document.getElementById('email').addEventListener('input', function(event) {
    // Get the input value, convert it to lowercase and set it back
    this.value = this.value.toLowerCase();
  });
  