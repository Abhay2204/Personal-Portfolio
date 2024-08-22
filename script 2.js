document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('#contactForm'); // Assuming your form has an id of 'contactForm'

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);
        const message = formData.get('message').trim(); // Get the message input
        const contactNo = formData.get('contactNo').trim(); // Get the phone number input

        // Validate message
        if (!message) {
            alert('Message cannot be empty');
            return; // Prevent the form submission if the message is empty
        }

        // Validate phone number
        const phoneNumberPattern = /^\d{10}$/; // Regular expression for exactly 10 digits
        if (contactNo && !phoneNumberPattern.test(contactNo)) {
            alert('Phone number must be exactly 10 digits');
            return; // Prevent the form submission if the phone number is invalid
        }

        fetch('/submit-form', {
                method: 'POST',
                body: new URLSearchParams(formData) // Use URLSearchParams to send form data correctly
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                console.log('Success:', data);
                // Optionally show a success message to the user
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting the form. Please try again.'); // Optionally show an error message to the user
            });
    });
});