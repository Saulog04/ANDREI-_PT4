const draggableElements = document.querySelectorAll('.box');
const droppableElements = document.querySelectorAll('.droppable');
let score = 0;

// DRAG START
draggableElements.forEach(element => {
    element.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text', event.target.id);
        event.currentTarget.classList.add('draggableFormat');
    });
});

// DROP EVENT
droppableElements.forEach(element => {
    element.addEventListener('drop', (event) => {
        event.preventDefault();

        // Retrieve the dragged element's ID
        const droppedElementId = event.dataTransfer.getData('text');
        const dropZoneId = event.currentTarget.getAttribute('data-draggable-id');
        const draggedElement = document.getElementById(droppedElementId);

        // Check if IDs match
        if (droppedElementId === dropZoneId) {
            // Correct match
            event.currentTarget.appendChild(draggedElement);
            score += 1;
            document.getElementById('remarks').innerText = "RIGHT!";
            document.getElementById('scores').innerText = score;

            // Check if score reaches 10
            if (score === 10) {
                clearInterval(timerInterval);
                document.getElementById('remarks').innerText = "Congratulations! You matched all sports!";
            }
        } else {
            // Incorrect match
            document.getElementById('remarks').innerText = "WRONG!";
        }
    });

    // DRAG OVER
    element.addEventListener('dragover', (event) => {
        event.preventDefault();
    });
});

// Initialize timer variables
let timeLeft = 60; // Time in seconds
let timerInterval;

// Start the timer function
function startTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `${timeLeft} seconds`;

    timerInterval = setInterval(() => {
        timeLeft--;

        // Update the timer display
        timerElement.textContent = `${timeLeft} seconds`;

        // Check if time is up
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = "Time's up!";
            endGame();
        }
    }, 1000);
}

// Function to end the game when time is up
function endGame() {
    document.getElementById('remarks').textContent = "Game Over!";
    document.getElementById('scores').textContent = `Final Score: ${score}`;
    // Disable all draggable elements when time is up
    draggableElements.forEach(element => element.setAttribute('draggable', 'false'));
}

// Call startTimer to begin countdown
startTimer();
