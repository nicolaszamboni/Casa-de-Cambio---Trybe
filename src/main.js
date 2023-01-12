import "./style.css";
import Swal from "sweetalert2";

function apiFetch(moeda) {
  fetch(`https://api.exchangerate.host/latest?base=${moeda}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.base === "EUR" && moeda !== "EUR") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Moeda não existente!",
          background: "#282c33",
          color: "white",
        });
      } else {
        const span = document.createElement("span");
        span.innerHTML = `Valores referentes a 1 ${moeda.toUpperCase()}`;
        document.querySelector(".moedas-container").appendChild(span);
        Object.entries(data.rates).forEach((cambio) => {
          const cambioElement = document.querySelector(".cambio-container");
          const clone = cambioElement.cloneNode(true);
          clone.style.display = "flex";
          clone.querySelector(".nome-moeda").innerHTML = cambio[0];
          clone.querySelector(".valor-moeda").innerHTML = cambio[1].toFixed(3);
          document.querySelector(".moedas-container").appendChild(clone);
        });
      }
    });
}

const btnSearch = document.querySelector("#btn-pesquisar");

btnSearch.addEventListener("click", () => {
  document.querySelector(".moedas-container").innerHTML = "";
  const moeda = document.querySelector("#input-moeda").value;
  if (moeda === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Você precisa passar uma moeda!",
      background: "#282c33",
      color: "white",
    });
  } else {
    apiFetch(moeda);
  }
});
