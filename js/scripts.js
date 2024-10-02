document.addEventListener('DOMContentLoaded', function() {
    // Fetch restaurants and populate the table
    fetch('php/fetch_restaurants.php')
        .then(response => response.json())
        .then(data => {
            const table = document.getElementById('restaurantsTable').getElementsByTagName('tbody')[0];
            data.forEach(restaurant => {
                const row = table.insertRow();
                row.insertCell(0).textContent = restaurant.name;
                row.insertCell(1).textContent = restaurant.rating;
                row.insertCell(2).textContent = restaurant.location;
            });
        });

    // Funcționalitatea pentru căutarea și filtrarea restaurantelor în lista
    document.getElementById('search').addEventListener('keyup', filterRestaurants);
    document.getElementById('filter-rating').addEventListener('change', filterRestaurants);
    document.getElementById('filter-location').addEventListener('change', filterRestaurants);

    function filterRestaurants() {
        var input = document.getElementById('search').value.toLowerCase();
        var selectedRating = document.getElementById('filter-rating').value;
        var selectedLocation = document.getElementById('filter-location').value.toLowerCase();

        var restaurantRows = document.querySelectorAll('#restaurant-list tr');
        restaurantRows.forEach(function(row) {
            var restaurantName = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
            var restaurantRating = row.querySelector('td:nth-child(2)').textContent;
            var restaurantLocation = row.querySelector('td:nth-child(3)').textContent.toLowerCase();

            var matchesSearch = restaurantName.includes(input);
            var matchesRating = selectedRating === '' || restaurantRating === selectedRating;
            var matchesLocation = selectedLocation === '' || restaurantLocation === selectedLocation;

            if (matchesSearch && matchesRating && matchesLocation) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    // Form validation
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(event) {
            const comments = document.getElementById('comments').value;
            if (comments.length < 15) {
                alert('Comments must be at least 15 characters long.');
                event.preventDefault();
            }
        });
    }

    // Email and password validation
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    if (emailInput && passwordInput) {
        emailInput.addEventListener('blur', function() {
            const email = emailInput.value;
            const validDomains = ['gmail.com', 'yahoo.com'];
            const emailDomain = email.split('@')[1];
            if (!validDomains.includes(emailDomain)) {
                alert('Please use a valid email domain (gmail.com, yahoo.com).');
            }
        });

        passwordInput.addEventListener('blur', function() {
            const password = passwordInput.value;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasNumber = /\d/.test(password);
            if (!hasUpperCase || !hasNumber) {
                alert('Password must contain at least one uppercase letter and one number.');
            }
        });
    }
});

