const questions = [ 
    // Volatility
    { key: "VOL1", text: "Get angry easily.", positive: true },
    { key: "VOL2", text: "Rarely get irritated.", positive: false },
    { key: "VOL3", text: "Get upset easily.", positive: true },
    { key: "VOL4", text: "Keep my emotions under control.", positive: false },
    { key: "VOL5", text: "Change my mood a lot.", positive: true },
    { key: "VOL6", text: "Rarely lose my composure.", positive: false },
    { key: "VOL7", text: "Am a person whose moods go up and down easily.", positive: true },
    { key: "VOL8", text: "Am not easily annoyed.", positive: false },
    { key: "VOL9", text: "Get easily agitated.", positive: true },
    { key: "VOL10", text: "Can be stirred up easily.", positive: true },

    // Withdrawal
    { key: "WIT1", text: "Seldom feel blue.", positive: false },
    { key: "WIT2", text: "Am filled with doubts about things.", positive: true },
    { key: "WIT3", text: "Feel comfortable with myself.", positive: false },
    { key: "WIT4", text: "Feel threatened easily.", positive: true },
    { key: "WIT5", text: "Rarely feel depressed.", positive: false },
    { key: "WIT6", text: "Worry about things.", positive: true },
    { key: "WIT7", text: "Am easily discouraged.", positive: true },
    { key: "WIT8", text: "Am not embarrassed easily.", positive: false },
    { key: "WIT9", text: "Become overwhelmed by events.", positive: true },
    { key: "WIT10", text: "Am afraid of many things.", positive: true },
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
    const volScores = Object.keys(responses)
        .filter(k => k.startsWith("VOL"))
        .map(k => responses[k]);

    const witScores = Object.keys(responses)
        .filter(k => k.startsWith("WIT"))
        .map(k => responses[k]);

    const volScore = average(volScores);
    const witScore = average(witScores);

    window.location.href = `n-results.html?vol=${volScore}&wit=${witScore}`;
}

// Calculate average of array
function average(arr) {
    return (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(2);
}

// Display results on results.html
function displayResults() {
    const params = new URLSearchParams(window.location.search);
    const volScore = params.get("vol") || "N/A";
    const witScore = params.get("wit") || "N/A";

    document.getElementById("volatility-score").innerText = volScore;
    document.getElementById("withdrawal-score").innerText = witScore;
}

// Automatically update questions or results based on page
if (window.location.pathname.includes("n-results.html")) {
    window.onload = displayResults;
} else if (window.location.pathname.includes("test_N.html")) {
    window.onload = updateQuestion;
}
