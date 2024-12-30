document.addEventListener('DOMContentLoaded', () => {
    const voteForm = document.getElementById('vote-form');
    const optionList = document.getElementById('option-list');
    const addOptionBtn = document.getElementById('add-option-btn');

    // Function to add a new option
    function addOption() {
        const newOption = document.createElement('div');
        newOption.className = 'option-item';
        newOption.innerHTML = `
            <input type="text" class="form-input option-input" placeholder="Option ${optionList.children.length + 1}" required>
            <button type="button" class="remove-option-btn" onclick="removeOption(this)">Remove</button>
        `;
        optionList.appendChild(newOption);
    }

    // Function to remove an option
    window.removeOption = function (button) {
        const optionItem = button.parentElement;
        optionList.removeChild(optionItem);
    };

    // Function to handle form submission
    voteForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const voteTitle = document.getElementById('vote-title').value.trim();
        const voteDescription = document.getElementById('vote-description').value.trim();
        const options = Array.from(optionList.querySelectorAll('.option-input')).map(input => input.value.trim());

        if (!voteTitle || !voteDescription || options.some(option => !option)) {
            alert('Please fill out all fields.');
            return;
        }

        // Create a vote object
        const vote = {
            title: voteTitle,
            description: voteDescription,
            options: options
        };

        // Display the vote in the vote list
        displayVote(vote);

        // Reset the form
        voteForm.reset();
        while (optionList.children.length > 2) {
            optionList.removeChild(optionList.lastChild);
        }
    });

    // Function to display a vote in the vote list
    function displayVote(vote) {
        const votesContainer = document.getElementById('votes-container');
        const voteItem = document.createElement('div');
        voteItem.className = 'vote-item';
        voteItem.innerHTML = `
            <h3>${vote.title}</h3>
            <p>${vote.description}</p>
            <ul>
                ${vote.options.map(option => `<li>${option}</li>`).join('')}
            </ul>
        `;
        votesContainer.appendChild(voteItem);
    }

    // Event listener for the add option button
    addOptionBtn.addEventListener('click', addOption);
});
