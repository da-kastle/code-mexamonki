const questions = [ 
    // Enthusiasm
    { key: "ENT1", text: "Make friends easily.", positive: true },
    { key: "ENT2", text: "Am hard to get to know.", positive: false },
    { key: "ENT3", text: "Keep others at a distance.", positive: false },
    { key: "ENT4", text: "Reveal little about myself.", positive: false },
    { key: "ENT5", text: "Warm up quickly to others.", positive: true },
    { key: "ENT6", text: "Rarely get caught up in the excitement.", positive: false },
    { key: "ENT7", text: "Am not a very enthusiastic person.", positive: false },
    { key: "ENT8", text: "Show my feelings when I’m happy.", positive: true },
    { key: "ENT9", text: "Have a lot of fun.", positive: true },
    { key: "ENT10", text: "Laugh a lot.", positive: true },

    // Assertiveness
    { key: "ASS1", text: "Take charge.", positive: true },
    { key: "ASS2", text: "Have a strong personality.", positive: true },
    { key: "ASS3", text: "Lack the talent for influencing people.", positive: false },
    { key: "ASS4", text: "Know how to captivate people.", positive: true },
    { key: "ASS5", text: "Wait for others to lead the way.", positive: false },
    { key: "ASS6", text: "See myself as a good leader.", positive: true },
    { key: "ASS7", text: "Can talk others into doing things.", positive: true },
    { key: "ASS8", text: "Hold back my opinions.", positive: false },
    { key: "ASS9", text: "Am the first to act.", positive: true },
    { key: "ASS10", text: "Do not have an assertive personality.", positive: false },
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
    const entScores = Object.keys(responses)
        .filter(k => k.startsWith("ENT"))
        .map(k => responses[k]);

    const assScores = Object.keys(responses)
        .filter(k => k.startsWith("ASS"))
        .map(k => responses[k]);

    const entScore = average(entScores);
    const assScore = average(assScores);

    window.location.href = `results.html?ent=${entScore}&ass=${assScore}`;
}

// Calculate average of array
function average(arr) {
    return (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(2);
}

// Display results on results.html
function displayResults() {
    const params = new URLSearchParams(window.location.search);
    const entScore = params.get("ent") || "N/A";
    const assScore = params.get("ass") || "N/A";

    document.getElementById("enthusiasm-score").innerText = entScore;
    document.getElementById("assertiveness-score").innerText = assScore;
}

// Automatically update questions or results based on page
if (window.location.pathname.includes("results.html")) {
    window.onload = displayResults;
} else if (window.location.pathname.includes("test.html")) {
    window.onload = updateQuestion;
}
