document.addEventListener('DOMContentLoaded', function() {
    const restaurantInput = document.getElementById('restaurant');

    fetch('php/get_restaurants.php')
        .then(response => response.json())
        .then(data => {
            const restaurantNames = data.map(restaurant => restaurant.name);
            setupAutocomplete(restaurantInput, restaurantNames);
        });

    function setupAutocomplete(input, suggestions) {
        let currentFocus;

        input.addEventListener('input', function() {
            let a, b, i, val = this.value;
            closeAllLists();
            if (!val) return false;
            currentFocus = -1;

            a = document.createElement('div');
            a.setAttribute('id', this.id + 'autocomplete-list');
            a.setAttribute('class', 'autocomplete-items');
            this.parentNode.appendChild(a);

            for (i = 0; i < suggestions.length; i++) {
                if (suggestions[i].substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                    b = document.createElement('div');
                    b.innerHTML = '<strong>' + suggestions[i].substr(0, val.length) + '</strong>';
                    b.innerHTML += suggestions[i].substr(val.length);
                    b.innerHTML += '<input type="hidden" value="' + suggestions[i] + '">';
                    
                    b.addEventListener('click', function() {
                        input.value = this.getElementsByTagName('input')[0].value;
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });

        input.addEventListener('keydown', function(e) {
            let x = document.getElementById(this.id + 'autocomplete-list');
            if (x) x = x.getElementsByTagName('div');
            if (e.keyCode === 40) {
                currentFocus++;
                addActive(x);
            } else if (e.keyCode === 38) {
                currentFocus--;
                addActive(x);
            } else if (e.keyCode === 13) {
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        });

        function addActive(x) {
            if (!x) return false;
            removeActive(x);
            if (currentFocus >= x.length) currentFocus = 0;
            if (currentFocus < 0) currentFocus = x.length - 1;
            x[currentFocus].classList.add('autocomplete-active');
        }

        function removeActive(x) {
            for (let i = 0; i < x.length; i++) {
                x[i].classList.remove('autocomplete-active');
            }
        }

        function closeAllLists(elmnt) {
            const items = document.getElementsByClassName('autocomplete-items');
            for (let i = 0; i < items.length; i++) {
                if (elmnt !== items[i] && elmnt !== input) {
                    items[i].parentNode.removeChild(items[i]);
                }
            }
        }

        document.addEventListener('click', function(e) {
            closeAllLists(e.target);
        });
    }
});
