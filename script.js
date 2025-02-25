// Full set of questions categorized with factor loadings
const allQuestions = [
    // Industriousness (Loadings from University Sample)
    { key: "IND1", text: "Carry out my plans.", positive: true, loading: 0.54 },
    { key: "IND2", text: "Finish what I start.", positive: true, loading: 0.54 },
    { key: "IND3", text: "Get things done quickly.", positive: true, loading: 0.46 },
    { key: "IND4", text: "Always know what I am doing.", positive: true, loading: 0.49 },
    { key: "IND5", text: "Waste my time.", positive: false, loading: -0.62 },
    { key: "IND6", text: "Find it difficult to get down to work.", positive: false, loading: -0.64 },
    { key: "IND7", text: "Mess things up.", positive: false, loading: -0.54 },
    { key: "IND8", text: "Don’t put my mind on the task at hand.", positive: false, loading: -0.45 },
    { key: "IND9", text: "Postpone decisions.", positive: false, loading: -0.51 },
    { key: "IND10", text: "Am easily distracted.", positive: false, loading: -0.53 },

    // Orderliness (Loadings from University Sample)
    { key: "ORD1", text: "Like order.", positive: true, loading: 0.56 },
    { key: "ORD2", text: "Keep things tidy.", positive: true, loading: 0.60 },
    { key: "ORD3", text: "Follow a schedule.", positive: true, loading: 0.54 },
    { key: "ORD4", text: "Want everything to be 'just right.'", positive: true, loading: 0.56 },
    { key: "ORD5", text: "See that rules are observed.", positive: true, loading: 0.45 },
    { key: "ORD6", text: "Want every detail taken care of.", positive: true, loading: 0.52 },
    { key: "ORD7", text: "Leave my belongings around.", positive: false, loading: -0.47 },
    { key: "ORD8", text: "Am not bothered by messy people.", positive: false, loading: -0.26 },
    { key: "ORD9", text: "Am not bothered by disorder.", positive: false, loading: -0.31 },
    { key: "ORD10", text: "Dislike routine.", positive: false, loading: -0.41 },
];

// Shuffle questions randomly
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Randomized questions array
const questions = shuffleArray([...allQuestions]);

let responses = [];
let currentIndex = 0;

// Update the test interface with the current question
function updateQuestion() {
    document.getElementById("question-text").innerText = questions[currentIndex].text;
}

// Store answer and move to next question
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

// Compute weighted scores and navigate to results page
function submitResults() {
    const indScores = questions.filter(q => q.key.startsWith("IND")).map(q => responses[questions.indexOf(q)] * q.loading);
    const ordScores = questions.filter(q => q.key.startsWith("ORD")).map(q => responses[questions.indexOf(q)] * q.loading);
    const consScores = [...indScores, ...ordScores];

    const indMean = weightedAverage(indScores);
    const ordMean = weightedAverage(ordScores);
    const consMean = weightedAverage(consScores);

    window.location.href = `results.html?ind=${indMean}&ord=${ordMean}&cons=${consMean}`;
}

// Calculate the weighted mean
function weightedAverage(arr) {
    let totalWeight = arr.reduce((sum, val) => sum + Math.abs(val), 0);
    let weightedSum = arr.reduce((sum, val) => sum + val, 0);
    return (weightedSum / totalWeight).toFixed(2);
}

// Load the first question
window.onload = updateQuestion;
