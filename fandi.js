// JavaScript to handle the form submission and display funding requests
const fundingRequestForm = document.getElementById('fundingRequestForm');
const fundingRequestsContainer = document.getElementById('fundingRequestsContainer');
const fundingRequests = [];

// Handle form submission
fundingRequestForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const amount = document.getElementById('amount').value.trim();
    const reason = document.getElementById('reason').value.trim();

    // Validate form data (optional but recommended)
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    if (!validatePhone(phone)) {
        alert('Please enter a valid phone number.');
        return;
    }

    if (amount <= 0) {
        alert('Amount must be greater than zero.');
        return;
    }

    // Create a new funding request object
    const newRequest = {
        name,
        email,
        phone,
        amount,
        reason
    };

    // Add the new request to the fundingRequests array
    fundingRequests.push(newRequest);

    // Clear the form
    fundingRequestForm.reset();

    // Display the new request
    displayFundingRequests();
});

// Function to validate email using regex
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}

// Function to validate phone number using regex
function validatePhone(phone) {
    const re = /^\+?[0-9]{7,15}$/;
    return re.test(phone);
}

// Function to display funding requests
function displayFundingRequests() {
    // Clear the container
    fundingRequestsContainer.innerHTML = '';

    if (fundingRequests.length === 0) {
        fundingRequestsContainer.innerHTML = '<p class="text-muted">No funding requests available at the moment.</p>';
        return;
    }

    // Iterate over each funding request and create HTML elements
    fundingRequests.forEach(function(request, index) {
        const requestElement = document.createElement('div');
        requestElement.className = 'fund-request';
        requestElement.innerHTML = `
            <h5>${sanitizeHTML(request.name)} - $${sanitizeHTML(request.amount)}</h5>
            <p>${sanitizeHTML(request.reason)}</p>
            <button class="btn btn-primary btn-contact" data-index="${index}">Contact</button>
            <div class="contact-details mt-3">
                <p><strong>Email:</strong> <a href="mailto:${sanitizeHTML(request.email)}">${sanitizeHTML(request.email)}</a></p>
                <p><strong>Phone:</strong> <a href="tel:${sanitizeHTML(request.phone)}">${sanitizeHTML(request.phone)}</a></p>
            </div>
        `;
        fundingRequestsContainer.appendChild(requestElement);
    });

    // Add event listeners for contact buttons
    const contactButtons = document.querySelectorAll('.btn-contact');
    contactButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            const contactDetails = this.nextElementSibling;

            // Toggle the display of contact details
            if (contactDetails.style.display === 'none' || contactDetails.style.display === '') {
                contactDetails.style.display = 'block';
                this.textContent = 'Hide Contact';
            } else {
                contactDetails.style.display = 'none';
                this.textContent = 'Contact';
            }
        });
    });
}

// Function to sanitize user input to prevent XSS
function sanitizeHTML(str) {
    var temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Initial display
displayFundingRequests();
