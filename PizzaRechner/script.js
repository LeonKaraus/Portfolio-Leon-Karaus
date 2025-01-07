document.getElementById("oilEnabled").addEventListener("change", function () {
  const oilPercentageContainer = document.getElementById(
    "oilPercentageContainer"
  );
  oilPercentageContainer.style.display = this.checked ? "block" : "none";
});

function calculateIngredients() {
  // Eingaben abrufen
  const numPizzas = parseInt(document.getElementById("numPizzas").value);
  const pizzaWeight = parseFloat(document.getElementById("pizzaWeight").value);
  const waterPercentage =
    parseFloat(document.getElementById("waterPercentage").value) / 100;
  const yeastType = document.getElementById("yeastType").value;
  const oilEnabled = document.getElementById("oilEnabled").checked;
  const oilPercentage = oilEnabled
    ? parseFloat(document.getElementById("oilPercentage").value) / 100
    : 0;

  const totalDoughWeight = numPizzas * pizzaWeight;
  const saltPercentage = 0.03; // Salzanteil: 3% des Mehls

  let flour, water, salt, oil, yeastAmount;

  if (yeastType === "sourdough") {
    // Sauerteig: 20% des gesamten Mehls, aufgeteilt in Mehl und Wasser
    const sourdoughRatio = 0.2;
    const totalRatio =
      1 + waterPercentage + saltPercentage + oilPercentage - sourdoughRatio;

    flour = totalDoughWeight / totalRatio;
    const sourdough = flour * sourdoughRatio;
    water = flour * waterPercentage + sourdough * 0.5; // 50% des Sauerteigs ist Wasser
    flour += sourdough * 0.5; // 50% des Sauerteigs ist Mehl
    salt = flour * saltPercentage;
    oil = flour * oilPercentage;
    yeastAmount = sourdough; // Sauerteigmenge direkt anzeigen
  } else {
    // Hefe: Normale Berechnung ohne Sauerteig
    const totalRatio = 1 + waterPercentage + saltPercentage + oilPercentage;

    flour = totalDoughWeight / totalRatio;
    water = flour * waterPercentage;
    salt = flour * saltPercentage;
    oil = flour * oilPercentage;

    // Hefe/Sauerteig berechnen
    switch (yeastType) {
      case "freshYeast":
        yeastAmount = flour * 0.01; // 1% des Mehls als frische Hefe
        break;
      case "dryYeast":
        yeastAmount = flour * 0.003; // 0.3% des Mehls als Trockenhefe
        break;
    }
  }

  // Ergebnisse auf eine Nachkommastelle runden
  flour = flour.toFixed(1);
  water = water.toFixed(1);
  salt = salt.toFixed(1);
  oil = oilEnabled ? oil.toFixed(1) : 0;
  yeastAmount = yeastAmount.toFixed(1);

  // Ergebnisse anzeigen
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = `
    <h2>Ergebnisse:</h2>
    <p><strong>Gesamtteigmenge:</strong> ${totalDoughWeight.toFixed(1)} g</p>
    <p><strong>Mehl:</strong> ${flour} g</p>
    <p><strong>Wasser:</strong> ${water} g</p>
    <p><strong>Salz:</strong> ${salt} g</p>
    ${oilEnabled ? `<p><strong>Öl:</strong> ${oil} g</p>` : ""}
    <p><strong>${
      yeastType === "sourdough" ? "Sauerteig" : "Hefe"
    }:</strong> ${yeastAmount} g</p>
  `;
}
