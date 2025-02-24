// script.js

// Array of test questions (Conscientiousness – Industriousness and Orderliness)
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
  window.location.href = "test.html";
}

// Record an answer; reverse score if the item is negatively keyed
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

// Update the displayed question and progress information
function updateQuestion() {
  document.getElementById("question-text").innerText =
    questions[currentQuestionIndex].text;
  document.getElementById("current-question").innerText =
    currentQuestionIndex + 1;
  document.getElementById("total-questions").innerText = questions.length;
}

// Utility: calculate average of an array of numbers
function average(arr) {
  return (arr.reduce((sum, val) => sum + val, 0) / arr.length).toFixed(2);
}

// When the test is complete, calculate subscale averages, store results, and redirect
function submitResults() {
  const indScores = Object.keys(responses)
    .filter((k) => k.startsWith("IND"))
    .map((k) => responses[k]);
  const ordScores = Object.keys(responses)
    .filter((k) => k.startsWith("ORD"))
    .map((k) => responses[k]);

  const indScore = average(indScores);
  const ordScore = average(ordScores);

  // Save test results to localStorage for later syncing
  const testResults = {
    responses: responses,
    indScore: indScore,
    ordScore: ordScore,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem("testResults", JSON.stringify(testResults));

  window.location.href = `results.html?ind=${indScore}&ord=${ordScore}`;
}

// Generic sync function that sends data to the backend
async function syncData(data) {
  try {
    const response = await fetch("/api/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Sync failed: " + response.statusText);
    }
    const result = await response.json();
    console.log("Sync successful:", result);
    return result;
  } catch (error) {
    console.error("Error syncing data:", error);
    return null;
  }
}

// Called from index.html to sync any locally stored test data
async function syncLocalData() {
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

// Optionally callable from results.html (does essentially the same thing)
async function syncResults() {
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

// Auto-run updateQuestion on the test page once loaded
if (window.location.pathname.includes("test.html")) {
  window.onload = updateQuestion;
}
