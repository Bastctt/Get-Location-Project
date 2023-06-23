const button = document.querySelector("button");
const resultDiv = document.getElementById("result");
resultDiv.classList.add("result-container");

button.addEventListener("click", () => {
  // Vérifier si l'élément resultDiv est déjà visible
  if (resultDiv.classList.contains("result-container")) {
    resultDiv.classList.remove("result-container");
    resultDiv.innerHTML = ""; // Effacer le contenu de resultDiv
  } else {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          // Clear previous results
          resultDiv.innerHTML = "";

          // Create and populate a table with the address data
          const table = document.createElement("table");
          for (const [key, value] of Object.entries(data.address)) {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = key;
            cell2.textContent = value;
          }

          // Append the table to the result div
          resultDiv.appendChild(table);

          // Ajouter à nouveau la classe pour afficher resultDiv
          resultDiv.classList.add("result-container");
        })
        .catch(() => {
          resultDiv.textContent = "Erreur lors de la récupération des données depuis l'API";
          resultDiv.classList.add("result-container"); // Ajouter la classe pour afficher resultDiv
        });
    });
  }
});


