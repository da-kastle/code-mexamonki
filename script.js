const questions = [
    // Industriousness Questions (+ keyed)
    { key: "IND1", text: "Carry out my plans.", positive: true },
    { key: "IND2", text: "Finish what I start.", positive: true },
    { key: "IND3", text: "Get things done quickly.", positive: true },
    { key: "IND4", text: "Always know what I am doing.", positive: true },
    
    // Industriousness Questions (- keyed)
    { key: "IND5", text: "Waste my time.", positive: false },
    { key: "IND6", text: "Find it difficult to get down to work.", positive: false },
    { key: "IND7", text: "Mess things up.", positive: false },
    { key: "IND8", text: "Don’t put my mind on the task at hand.", positive: false },
    { key: "IND9", text: "Postpone decisions.", positive: false },
    { key: "IND10", text: "Am easily distracted.", positive: false },

    // Orderliness Questions (+ keyed)
    { key: "ORD1", text: "Like order.", positive: true },
    { key: "ORD2", text: "Keep things tidy.", positive: true },
    { key: "ORD3", text: "Follow a schedule.", positive: true },
    { key: "ORD4", text: "Want everything to be “just right.”", positive: true },
    { key: "ORD5", text: "See that rules are observed.", positive: true },
    { key: "ORD6", text: "Want every detail taken care of.", positive: true },

    // Orderliness Questions (- keyed)
    { key: "ORD7", text: "Leave my belongings around.", positive: false },
    { key: "ORD8", text: "Am not bothered by messy people.", positive: false },
    { key: "ORD9", text: "Am not bothered by disorder.", positive: false },
    { key: "ORD10", text: "Dislike routine.", positive: false },
];

let responses = {};
let currentQuestionIndex = 0;

function selectAnswer(value) {
    let question = questions[currentQuestionIndex];
    responses[question.key] = question.positive ? value : (6 - value);

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        updateQuestion();
    } else {
        submitResults();
    }
}

function updateQuestion() {
    document.getElementById("question-text").innerText = questions[currentQuestionIndex].text;
    document.getElementById("current-question").innerText = currentQuestionIndex + 1;
    document.getElementById("total-questions").innerText = questions.length;
}

function submitResults() {
    let industriousnessScore = calculateAverage(Object.keys(responses).filter(k => k.startsWith("IND")).map(k => responses[k]));
    let orderlinessScore = calculateAverage(Object.keys(responses).filter(k => k.startsWith("ORD")).map(k => responses[k]));

    let queryParams = `industriousness=${industriousnessScore}&orderliness=${orderlinessScore}`;
    window.location.href = "results.html?" + queryParams;
}

function calculateAverage(scores) {
    return scores.reduce((a, b) => a + b, 0) / scores.length;
}

function displayResults() {
    let params = new URLSearchParams(window.location.search);
    document.getElementById("industriousness-score").innerText = params.get("industriousness") || "N/A";
    document.getElementById("orderliness-score").innerText = params.get("orderliness") || "N/A";
}

function restartTest() {
    window.location.href = "index.html";
}

if (window.location.pathname.includes("results.html")) {
    window.onload = displayResults;
} else if (window.location.pathname.includes("test.html")) {
    window.onload = updateQuestion;
}
