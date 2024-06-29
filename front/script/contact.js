document.getElementById('menu-toggle').addEventListener('click', function() {
    var navLinks = document.getElementById('nav-links');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
    }
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    var feedback = document.getElementById('feedback');
    feedback.textContent = 'Thank you, ' + name + '! Your message has been sent.';
    feedback.style.display = 'block';

    // Reset the form fields
    document.getElementById('contact-form').reset();
});

// Close the feedback message after a few seconds
setTimeout(function() {
    var feedback = document.getElementById('feedback');
    if (feedback.style.display === 'block') {
        feedback.style.display = 'none';
    }
}, 5000);
