// script.js

// Conscientiousness questions array
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

// Navigate to the test page
function startTest() {
  console.log("startTest called");
  window.location.href = "test.html";
}

// Record an answer; reverse score if necessary
function selectAnswer(value) {
  const question = questions[currentQuestionIndex];
  responses[question.key] = question.positive ? value : (6 - value);
  console.log(`Answer recorded for ${question.key}:`, responses[question.key]);

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    updateQuestion();
  } else {
    submitResults();
  }
}

// Update the question display and progress
function updateQuestion() {
  document.getElementById("question-text").innerText = questions[currentQuestionIndex].text;
  document.getElementById("current-question").innerText = currentQuestionIndex + 1;
  document.getElementById("total-questions").innerText = questions.length;
  console.log(`Displaying question ${currentQuestionIndex + 1} of ${questions.length}`);
}

// Calculate average of an array
function average(arr) {
  return (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(2);
}

// Submit results: store data and redirect to results page
function submitResults() {
  const indScores = Object.keys(responses).filter(k => k.startsWith("IND")).map(k => responses[k]);
  const ordScores = Object.keys(responses).filter(k => k.startsWith("ORD")).map(k => responses[k]);
  const indScore = average(indScores);
  const ordScore = average(ordScores);

  const testResults = {
    responses: responses,
    indScore: indScore,
    ordScore: ordScore,
    timestamp: new Date().toISOString(),
  };
  console.log("Test complete, storing results:", testResults);
  localStorage.setItem("testResults", JSON.stringify(testResults));
  window.location.href = `results.html?ind=${indScore}&ord=${ordScore}`;
}

// Generic sync function with debug logging
async function syncData(data) {
  console.log("syncData called with data:", data);
  try {
    const response = await fetch('/api/sync', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    console.log("Response received from /api/sync:", response);
    if (!response.ok) {
      throw new Error("Sync failed: " + response.statusText);
    }
    const result = await response.json();
    console.log("Parsed JSON response:", result);
    return result;
  } catch (error) {
    console.error("Error in syncData:", error);
    return null;
  }
}

// Sync function for index.html (sync local data)
async function syncLocalData() {
  console.log("syncLocalData triggered");
  const testResults = localStorage.getItem("testResults");
  if (testResults) {
    const data = JSON.parse(testResults);
    const result = await syncData(data);
    if (result) {
      alert("Data synced successfully!");
    } else {
      alert("Data sync failed. Please try again later.");
    }
  } else {
    alert("No test data available to sync.");
  }
}

// Sync function for results.html (sync results data)
async function syncResults() {
  console.log("syncResults triggered");
  const testResults = localStorage.getItem("testResults");
  if (testResults) {
    const data = JSON.parse(testResults);
    const result = await syncData(data);
    if (result) {
      alert("Results synced successfully!");
    } else {
      alert("Results sync failed. Please try again later.");
    }
  } else {
    alert("No test results available to sync.");
  }
}

// If on test.html, automatically update question display on load
if (window.location.pathname.includes("test.html")) {
  window.onload = updateQuestion;
}
