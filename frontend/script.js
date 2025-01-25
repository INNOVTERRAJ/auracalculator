document.getElementById("auraForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const calculateButton = document.querySelector("#calculateButton");
  calculateButton.textContent = "Calculating...";
  calculateButton.disabled = true;

  // Hide previous results
  const resultDiv = document.querySelector(".result");
  const output = document.getElementById("auraOutput");
  const chartCanvas = document.getElementById("auraChart").getContext("2d");
  resultDiv.classList.add("hidden");
  output.innerHTML = "Calculating your aura...";

  // Gather form data
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    // Send data to the server
    const response = await fetch("https://auracalculator.onrender.com/api/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to calculate aura. Server returned ${response.status}`);
    }

    // Parse the server response
    const result = await response.json();

    // Display the results
    displayResult(result);

  } catch (error) {
    console.error("Error calculating aura:", error.message);
    output.innerHTML = `<span style="color: red;">Error: ${error.message}</span>`;
    resultDiv.classList.remove("hidden");
  } finally {
    calculateButton.textContent = "Calculate";
    calculateButton.disabled = false;
  }
});

function displayResult(result) {
  const resultDiv = document.querySelector(".result");
  const output = document.getElementById("auraOutput");

  // Update results with a fade-in effect
  setTimeout(() => {
    output.innerHTML = `
      Your aura is <strong>${result.aura}%</strong> and presence power is <strong>${result.presencePower}%</strong>.
      <br>
      Level: <strong>${result.level}</strong>
      <br>
      ${result.additionalMessage ? `<em>${result.additionalMessage}</em>` : ""}
    `;
    resultDiv.classList.remove("hidden");
    createChart(result.aura, result.presencePower);
  }, 300);
}

function createChart(aura, presencePower) {
  const existingChart = Chart.getChart("auraChart");
  if (existingChart) {
    existingChart.destroy();
  }

  // Create Chart.js bar chart
  new Chart(document.getElementById("auraChart").getContext("2d"), {
    type: "bar",
    data: {
      labels: ["Aura", "Presence Power"],
      datasets: [
        {
          label: "Score",
          data: [aura, presencePower],
          backgroundColor: ["#4A90E2", "#48C6EF"],
          borderRadius: 10,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 10,
          },
        },
      },
    },
  });
}

// Share Results on WhatsApp
document.getElementById("shareWhatsAppButton").addEventListener("click", function () {
  const auraResult = document.getElementById("auraOutput").innerText;
  const url = window.location.href;

  const shareText = `I discovered my aura: ${auraResult}. Check it out: ${url}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  window.open(whatsappUrl, '_blank');
});

// Share Results on LinkedIn
document.getElementById("shareLinkedInButton").addEventListener("click", function () {
  const auraResult = document.getElementById("auraOutput").innerText;
  const url = window.location.href;

  const shareText = `I discovered my aura: ${auraResult}. Check it out: ${url}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=My Aura&summary=${encodeURIComponent(shareText)}`;
  window.open(linkedinUrl, '_blank');
});
