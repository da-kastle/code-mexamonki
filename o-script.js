const questions = [
    // Intellect
    { key: "INT1", text: "Am quick to understand things.", positive: true },
    { key: "INT2", text: "Have difficulty understanding abstract ideas.", positive: false },
    { key: "INT3", text: "Can handle a lot of information.", positive: true },
    { key: "INT4", text: "Like to solve complex problems.", positive: true },
    { key: "INT5", text: "Avoid philosophical discussions.", positive: false },
    { key: "INT6", text: "Avoid difficult reading material.", positive: false },
    { key: "INT7", text: "Have a rich vocabulary.", positive: true },
    { key: "INT8", text: "Think quickly.", positive: true },
    { key: "INT9", text: "Learn things slowly.", positive: false },
    { key: "INT10", text: "Formulate ideas clearly.", positive: true },

    // Aesthetics
    { key: "AES1", text: "Enjoy the beauty of nature.", positive: true },
    { key: "AES2", text: "Believe in the importance of art.", positive: true },
    { key: "AES3", text: "Love to reflect on things.", positive: true },
    { key: "AES4", text: "Get deeply immersed in music.", positive: true },
    { key: "AES5", text: "Do not like poetry.", positive: false },
    { key: "AES6", text: "See beauty in things that others might not notice.", positive: true },
    { key: "AES7", text: "Need a creative outlet.", positive: true },
    { key: "AES8", text: "Seldom get lost in thought.", positive: false },
    { key: "AES9", text: "Seldom daydream.", positive: false },
    { key: "AES10", text: "Seldom notice the emotional aspects of paintings and pictures.", positive: false },
];

let responses = {};
let currentQuestionIndex = 0;

function selectAnswer(value) {
    const question = questions[currentQuestionIndex];
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
    const intellectScores = Object.keys(responses)
        .filter(k => k.startsWith("INT"))
        .map(k => responses[k]);

    const aestheticsScores = Object.keys(responses)
        .filter(k => k.startsWith("AES"))
        .map(k => responses[k]);

    const intellectScore = average(intellectScores);
    const aestheticsScore = average(aestheticsScores);

    window.location.href = `o-results.html?int=${intellectScore}&aesthetics=${aestheticsScore}`;
}

function average(arr) {
    return (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(2);
}

function displayResults() {
    const params = new URLSearchParams(window.location.search);
    const intellectScore = params.get("int") || "N/A";
    const aestheticsScore = params.get("aesthetics") || "N/A";

    document.getElementById("intellect-score").innerText = intellectScore;
    document.getElementById("aesthetics-score").innerText = aestheticsScore;
}

if (window.location.pathname.includes("o-results.html")) {
    window.onload = displayResults;
} else if (window.location.pathname.includes("test_O.html")) {
    window.onload = updateQuestion;
}
