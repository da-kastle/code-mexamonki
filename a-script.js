const questions = [
    // Compassion
    { key: "COMP1", text: "Am not interested in other people’s problems.", positive: false },
    { key: "COMP2", text: "Feel others’ emotions.", positive: true },
    { key: "COMP3", text: "Inquire about others’ well-being.", positive: true },
    { key: "COMP4", text: "Can’t be bothered with other’s needs.", positive: false },
    { key: "COMP5", text: "Sympathize with others’ feelings.", positive: true },
    { key: "COMP6", text: "Am indifferent to the feelings of others.", positive: false },
    { key: "COMP7", text: "Take no time for others.", positive: false },
    { key: "COMP8", text: "Take an interest in other people’s lives.", positive: true },
    { key: "COMP9", text: "Don’t have a soft side.", positive: false },
    { key: "COMP10", text: "Like to do things for others.", positive: true },

    // Politeness
    { key: "POL1", text: "Respect authority.", positive: true },
    { key: "POL2", text: "Insult people.", positive: false },
    { key: "POL3", text: "Hate to seem pushy.", positive: true },
    { key: "POL4", text: "Believe that I am better than others.", positive: false },
    { key: "POL5", text: "Avoid imposing my will on others.", positive: true },
    { key: "POL6", text: "Rarely put people under pressure.", positive: true },
    { key: "POL7", text: "Take advantage of others.", positive: false },
    { key: "POL8", text: "Seek conflict.", positive: false },
    { key: "POL9", text: "Love a good fight.", positive: false },
    { key: "POL10", text: "Am out for my own personal gain.", positive: false },
];

let responses = {};
let currentQuestionIndex = 0;

// Answer selection and response recording
function selectAnswer(value) {
    const question = questions[currentQuestionIndex];
    responses[question.key] = question.positive ? value : (6 - value); // Reverse score if negative

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
    const compScores = Object.keys(responses)
        .filter(k => k.startsWith("COMP"))
        .map(k => responses[k]);

    const polScores = Object.keys(responses)
        .filter(k => k.startsWith("POL"))
        .map(k => responses[k]);

    const compScore = average(compScores);
    const polScore = average(polScores);

    window.location.href = `a-results.html?comp=${compScore}&pol=${polScore}`;
}

// Calculate average of array
function average(arr) {
    return (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(2);
}

// Display results on results.html
function displayResults() {
    const params = new URLSearchParams(window.location.search);
    const compScore = params.get("comp") || "N/A";
    const polScore = params.get("pol") || "N/A";

    document.getElementById("compassion-score").innerText = compScore;
    document.getElementById("politeness-score").innerText = polScore;
}

// Automatically update questions or results based on page
if (window.location.pathname.includes("a-results.html")) {
    window.onload = displayResults;
} else if (window.location.pathname.includes("test_A.html")) {
    window.onload = updateQuestion;
}
