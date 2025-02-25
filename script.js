// Full set of questions categorized
const allQuestions = [
    // Industriousness
    { key: "IND1", text: "Carry out my plans.", positive: true },
    { key: "IND2", text: "Finish what I start.", positive: true },
    { key: "IND3", text: "Get things done quickly.", positive: true },
    { key: "IND4", text: "Always know what I am doing.", positive: true },
    { key: "IND5", text: "Waste my time.", positive: false },
    { key: "IND6", text: "Find it difficult to get down to work.", positive: false },
    { key: "IND7", text: "Mess things up.", positive: false },
    { key: "IND8", text: "Don’t put my mind on the task at hand.", positive: false },
    { key: "IND9", text: "Postpone decisions.", positive: false },
    { key: "IND10", text: "Am easily distracted.", positive: false },

    // Orderliness
    { key: "ORD1", text: "Like order.", positive: true },
    { key: "ORD2", text: "Keep things tidy.", positive: true },
    { key: "ORD3", text: "Follow a schedule.", positive: true },
    { key: "ORD4", text: "Want everything to be 'just right.'", positive: true },
    { key: "ORD5", text: "See that rules are observed.", positive: true },
    { key: "ORD6", text: "Want every detail taken care of.", positive: true },
    { key: "ORD7", text: "Leave my belongings around.", positive: false },
    { key: "ORD8", text: "Am not bothered by messy people.", positive: false },
    { key: "ORD9", text: "Am not bothered by disorder.", positive: false },
    { key: "ORD10", text: "Dislike routine.", positive: false },
];

// Shuffle questions to randomize order
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Randomized questions array
const questions = shuffleArray([...allQuestions]);

let responses = [];
let currentIndex = 0;

// Likert scale options with colors
const likertOptions = [
    { value: 1, text: "Strongly Disagree", color: "#d9534f" },
    { value: 2, text: "Disagree", color: "#f0ad4e" },
    { value: 3, text: "Neutral", color: "#5bc0de" },
    { value: 4, text: "Agree", color: "#5cb85c" },
    { value: 5, text: "Strongly Agree", color: "#0275d8" }
];

// Update question display
function updateQuestion() {
    document.getElementById("question-text").innerText = questions[currentIndex].text;

    // Render Likert buttons with colors
    document.getElementById("answers").innerHTML = likertOptions.map(option =>
        `<button onclick="recordAnswer(${option.value})" style="background-color: ${option.color}; color: white; padding: 10px; border-radius: 5px; margin: 5px;">
            ${option.text}
        </button>`
    ).join("");

    // Update progress bar
    let progressPercent = ((currentIndex + 1) / questions.length) * 100;
    document.getElementById("progress-bar").style.width = progressPercent + "%";
    document.getElementById("progress-text").innerText = `Question ${currentIndex + 1} of ${questions.length}`;
}

// Store response and move to next question
function recordAnswer(value) {
    responses[currentIndex] = questions[currentIndex].positive ? value : (6 - value); // Reverse if needed
    nextQuestion();
}

// Move to next question
function nextQuestion() {
    if (currentIndex < questions.length - 1) {
        currentIndex++;
        updateQuestion();
    } else {
        submitResults();
    }
}

// Go back one question
function goBack() {
    if (currentIndex > 0) {
        currentIndex--;
        updateQuestion();
    }
}

// Compute scores and navigate to results page
function submitResults() {
    const indScores = questions
        .filter(q => q.key.startsWith("IND"))
        .map(q => responses[questions.indexOf(q)]);

    const ordScores = questions
        .filter(q => q.key.startsWith("ORD"))
        .map(q => responses[questions.indexOf(q)]);

    const consScores = [...indScores, ...ordScores];

    const indMean = average(indScores);
    const ordMean = average(ordScores);
    const consMean = average(consScores);

    // Get the 3 lowest-scoring questions
    let lowestScored = questions.map((q, index) => ({ text: q.text, score: responses[index] }))
        .sort((a, b) => a.score - b.score)
        .slice(0, 3);

    // Redirect to results.html with all necessary data
    window.location.href = `results.html?ind=${indMean}&ord=${ordMean}&cons=${consMean}&all=${JSON.stringify(responses)}&lowest=${encodeURIComponent(JSON.stringify(lowestScored))}`;
}

// Calculate mean
function average(arr) {
    return (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(2);
}

// Load the first question
window.onload = updateQuestion;
