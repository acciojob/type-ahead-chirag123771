//your JS code here. If required.
document.addEventListener("DOMContentLoaded", function () {
    const typeaheadInput = document.getElementById("typeahead");
    const suggestionsList = document.getElementById("suggestions-list");
    let timeoutId;

    typeaheadInput.addEventListener("input", function () {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(function () {
            const searchText = typeaheadInput.value.trim();

            if (searchText.length === 0) {
                // Clear suggestions if input is empty
                suggestionsList.innerHTML = '';
                return;
            }

            // Make API request
            fetch(`https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${searchText}`)
                .then(response => response.json())
                .then(data => {
                    // Display suggestions
                    suggestionsList.innerHTML = '';
                    data.forEach(term => {
                        const listItem = document.createElement("li");
                        listItem.textContent = term;
                        listItem.addEventListener("click", function () {
                            // Fill typeahead on click and clear suggestions
                            typeaheadInput.value = term;
                            suggestionsList.innerHTML = '';
                        });
                        suggestionsList.appendChild(listItem);
                    });
                })
                .catch(error => console.error("Error fetching suggestions:", error));
        }, 500);
    });
});
