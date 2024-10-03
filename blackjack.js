let count = 0;
let totalCards = 0;

// Get the count display, buttons, and history elements
const countDisplay = document.getElementById('count');
const trueCountDisplay = document.getElementById('true-count');
const totalCardsDisplay = document.getElementById('total-cards');
const decksInput = document.getElementById('decks');
const buttons = document.querySelectorAll('.card-button');
const resetButton = document.getElementById('reset-button');
const historyList = document.getElementById('history');

// Define card values for blackjack counting
const cardValues = {
    '2': 1,
    '3': 1,
    '4': 1,
    '5': 1,
    '6': 1,
    '7': 0,
    '8': 0,
    '9': 0,
    '10': -1,
    'J': -1,
    'Q': -1,
    'K': -1,
    'A': -1
};

// Function to update the true count display
function updateTrueCount() {
    const decksRemaining = parseFloat(decksInput.value);
    if (decksRemaining > 0) {
        const trueCount = (count / decksRemaining).toFixed(2);
        trueCountDisplay.textContent = trueCount;
    } else {
        trueCountDisplay.textContent = "N/A";
    }
}

// Function to add to history
function addToHistory(card) {
    const li = document.createElement('li');
    li.textContent = `Card: ${card}`;
    
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
        count -= cardValues[card]; // Adjust the count
        countDisplay.textContent = count;
        totalCards--;
        totalCardsDisplay.textContent = totalCards;
        historyList.removeChild(li); // Remove from history
        updateTrueCount();
    });
    
    li.appendChild(removeButton);
    historyList.appendChild(li);
}

// Add event listeners for card buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const cardValue = button.dataset.value;
        count += cardValues[cardValue];
        totalCards++;
        countDisplay.textContent = count;
        totalCardsDisplay.textContent = totalCards;
        updateTrueCount();
        addToHistory(cardValue);
    });
});

// Update true count when the number of decks is changed
decksInput.addEventListener('input', updateTrueCount);

// Reset count functionality
resetButton.addEventListener('click', () => {
    count = 0;
    totalCards = 0;
    countDisplay.textContent = count;
    trueCountDisplay.textContent = "0";
    totalCardsDisplay.textContent = totalCards;
    decksInput.value = 1; // Reset decks to default
    updateTrueCount();
    historyList.innerHTML = ''; // Clear history
});
