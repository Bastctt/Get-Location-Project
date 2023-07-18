const button = document.querySelector("button");
const resultDiv = document.getElementById("result");

button.addEventListener("click", () => {
  if (resultDiv.style.display === "none") {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          resultDiv.innerHTML = "";

          const table = document.createElement("table");
          for (const [key, value] of Object.entries(data.address)) {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = key;
            cell2.textContent = value;
          }

          resultDiv.appendChild(table);
          resultDiv.style.display = "block";
          setTimeout(() => {
            resultDiv.classList.add("show"); // Ajout de la classe "show" après un court délai
          }, 10);
        })
        .catch(() => {
          resultDiv.textContent = "Erreur lors de la récupération des données depuis l'API";
        });
    });
  } else {
    resultDiv.classList.remove("show"); // Suppression de la classe "show" pour masquer avec l'animation
    setTimeout(() => {
      resultDiv.style.display = "none";
      resultDiv.innerHTML = "";
    }, 500); // Temps correspondant à la durée de l'animation en millisecondes
  }
});
