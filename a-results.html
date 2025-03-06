<!DOCTYPE html>  
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Personality Results</title>
    <style> 
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            background-color: #f0f8ff;
            color: #333;
        }
        .results-container {
            width: 80%;
            max-width: 700px;
            margin: 40px auto;
            padding: 20px;
            background: #fff;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            border-radius: 10px;
        }
        .bar-container {
            display: flex;
            align-items: center;
            margin: 20px 0;
        }
        .bar-label {
            width: 150px;
            text-align: right;
            padding-right: 10px;
        }
        .bar {
            height: 35px;
            background-color: #4682B4;
            color: #fff;
            position: relative;
            text-align: right;
            line-height: 35px;
            padding-right: 10%;
            border-radius: 5px;
        }
        button {
            padding: 8px 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-top: 25px;
        }
        button:hover {
            background-color: #45a049;
        }
    </style>
</head>
<body>

<div class="results-container">
    <h2>Your Personality Scores</h2>

    <div class="bar-container">
        <div class="bar-label">Agreeableness</div>
        <div class="bar" id="agreeableness-bar"></div>
    </div>

    <div class="bar-container">
        <div class="bar-label">Compassion</div>
        <div class="bar" id="compassion-bar"></div>
    </div>

    <div class="bar-container">
        <div class="bar-label">Politeness</div>
        <div class="bar" id="politeness-bar"></div>
    </div>

    <button onclick="window.location.href='index.html'">Retake Test</button>
</div>

<script>
const normData = {
    Agreeableness: { mean: 3.52, sd: 0.67 },
    Compassion: { mean: 3.87, sd: 0.65 },
    Politeness: { mean: 3.52, sd: 0.67 }
};

function percentile(z) {
    return Math.round(0.5 * (1 + erf(z / Math.sqrt(2))) * 100);
}

function erf(x) {
    let sign = Math.sign(x);
    x = Math.abs(x);
    let a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
    let t = 1 / (1 + p * x);
    let y = 1 - ((((a5*t + a4)*t + a3)*t + a2)*t + a1) * Math.exp(-x*x);
    return sign * y;
}

// Get user's raw scores from URL
const params = new URLSearchParams(window.location.search);
const agrScore = parseFloat(params.get("agr")) || normData.Agreeableness.mean;
const compScore = parseFloat(params.get("comp")) || normData.Compassion.mean;
const polScore = parseFloat(params.get("pol")) || normData.Politeness.mean;

// Calculate z-scores
const agrZ = (agrScore - normData.Agreeableness.mean) / normData.Agreeableness.sd;
const compZ = (compScore - normData.Compassion.mean) / normData.Compassion.sd;
const polZ = (polScore - normData.Politeness.mean) / normData.Politeness.sd;

// Calculate percentiles
const agrPercentile = percentile(agrZ);
const compPercentile = percentile(compZ);
const polPercentile = percentile(polZ);

// Adjust bars in increments of 0.05 SD
function adjustBar(barId, zScore, percentile) {
    let baseWidth = 50; // 50% width at z = 0
    let width = baseWidth + (Math.round(zScore / 0.05) * 1); // 1% bar width per 0.05 SD increment
    width = Math.min(Math.max(width, 10), 95); // Limit between 10% and 95%

    const bar = document.getElementById(barId);
    bar.style.width = width + '%';
    bar.textContent = `${percentile}th percentile (z = ${zScore.toFixed(2)})`;
}

// Update bars
adjustBar("agreeableness-bar", agrZ, agrPercentile);
adjustBar("compassion-bar", compZ, compPercentile);
adjustBar("politeness-bar", polZ, polPercentile);
</script>

</body>
</html>
