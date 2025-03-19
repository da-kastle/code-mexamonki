const questions = [
    // Compassion
    { key: "COMP1", text: "Am not interested in other people’s problems.", positive: false, loading: -0.50 },
    { key: "COMP2", text: "Feel others’ emotions.", positive: true, loading: 0.60 },
    { key: "COMP3", text: "Inquire about others’ well-being.", positive: true, loading: 0.62 },
    { key: "COMP4", text: "Can’t be bothered with other’s needs.", positive: false, loading: -0.65 },
    { key: "COMP5", text: "Sympathize with others’ feelings.", positive: true, loading: 0.72 },
    { key: "COMP6", text: "Am indifferent to the feelings of others.", positive: false, loading: -0.51 },
    { key: "COMP7", text: "Take no time for others.", positive: false, loading: -0.59 },
    { key: "COMP8", text: "Take an interest in other people’s lives.", positive: true, loading: 0.70 },
    { key: "COMP9", text: "Don’t have a soft side.", positive: false, loading: -0.47 },
    { key: "COMP10", text: "Like to do things for others.", positive: true, loading: 0.60 },

    // Politeness
    { key: "POL1", text: "Respect authority.", positive: true, loading: 0.33 },
    { key: "POL2", text: "Insult people.", positive: false, loading: -0.58 },
    { key: "POL3", text: "Hate to seem pushy.", positive: true, loading: 0.42 },
    { key: "POL4", text: "Believe that I am better than others.", positive: false, loading: -0.51 },
    { key: "POL5", text: "Avoid imposing my will on others.", positive: true, loading: 0.55 },
    { key: "POL6", text: "Rarely put people under pressure.", positive: true, loading: 0.46 },
    { key: "POL7", text: "Take advantage of others.", positive: false, loading: -0.49 },
    { key: "POL8", text: "Seek conflict.", positive: false, loading: -0.52 },
    { key: "POL9", text: "Love a good fight.", positive: false, loading: -0.54 },
    { key: "POL10", text: "Am out for my own personal gain.", positive: false, loading: -0.50 },
];

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

// Calculate weighted averages and send scores to results.html
function submitResults() {
    const compScores = questions
        .filter(q => q.key.startsWith("COMP"))
        .map(q => responses[q.key] * q.loading); // Apply factor loading

    const polScores = questions
        .filter(q => q.key.startsWith("POL"))
        .map(q => responses[q.key] * q.loading); // Apply factor loading

    const compScore = weightedAverage(compScores);
    const polScore = weightedAverage(polScores);

    window.location.href = `a-results.html?comp=${compScore}&pol=${polScore}`;
}

// Calculate weighted average
function weightedAverage(arr) {
    const totalWeight = arr.reduce((sum, val) => sum + Math.abs(val), 0);
    return (arr.reduce((sum, val) => sum + val, 0) / totalWeight).toFixed(2);
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
