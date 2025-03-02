// Conscientiousness (20 items from DeYoung et al.)
const questions = [
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

let responses = {};
let currentQuestionIndex = 0;

// Answer selection and response recording
function selectAnswer(value) {
    const question = questions[currentQuestionIndex];
    responses[question.key] = question.positive ? value : (6 - value); // reverse if negative

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        updateQuestion();
    } else {
        submitResults();
    }
}

// Update question text and progress dynamically
function updateQuestion() {
    document.getElementById("question-text").innerText = questions[currentQuestionIndex].text;
    document.getElementById("current-question").innerText = currentQuestionIndex + 1;
    document.getElementById("total-questions").innerText = questions.length;
}

// Calculate averages and send scores to results.html
function submitResults() {
    const indScores = Object.keys(responses)
        .filter(k => k.startsWith("IND"))
        .map(k => responses[k]);

    const ordScores = Object.keys(responses)
        .filter(k => k.startsWith("ORD"))
        .map(k => responses[k]);

    const indScore = average(indScores);
    const ordScore = average(ordScores);

    window.location.href = `results.html?ind=${indScore}&ord=${ordScore}`;
}

// Calculate average of array
function average(arr) {
    return (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(2);
}

// Display results on results.html (percentiles calculated separately)
function displayResults() {
    const params = new URLSearchParams(window.location.search);
    const indScore = params.get("ind") || "N/A";
    const ordScore = params.get("ord") || "N/A";

    document.getElementById("industriousness-score").innerText = indScore;
    document.getElementById("orderliness-score").innerText = ordScore;
}

// Automatically update questions or results based on page
if (window.location.pathname.includes("c-results.html")) {
    window.onload = displayResults;
} else if (window.location.pathname.includes("c-test.html")) {
    window.onload = updateQuestion;
}
