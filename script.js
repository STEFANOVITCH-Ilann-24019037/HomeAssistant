var A_tempe = [];
var I_I = 0;
var A_TemperatureCategories = ["bleue", "vert", "orange", "rouge"];

function setup() {
  for (var i = 0; i < 20; i++) {
    I_t = Math.random() * (40 - -10) + -10; // car Math.random() génère entre 0 et 1 donc pour avoir entre -10 et 40
    I_t = Math.round(I_t);
    A_tempe.push(I_t);
  }
}

function AfficherLaTemperature() {
  ++I_I;
  if (I_I >= A_tempe.length) {
    I_I = 0;
  }

  var currentTemp = A_tempe[I_I];

  // Mise à jour sémantique
  var O_TempValue = document.getElementById("tempValue");
  var O_History = document.getElementById("history");

  O_TempValue.textContent = currentTemp;// Mise à jour du contenu textuel
  O_TempValue.setAttribute("value", currentTemp);// Mise à jour de l'attribut value
  O_History.textContent +=" "+ currentTemp+ "°C"; // Ajout de la température à l'historique

  var O_AfficheMesage = document.getElementById("message");

  if (currentTemp < 0) {
    O_AfficheMesage.textContent = "Brrrrrrr, un peu froid ce matin, mets ta cagoule !";
    O_TempValue.className = A_TemperatureCategories[0];
  }
  else if (currentTemp >= 0 && currentTemp <= 20) {
    O_AfficheMesage.textContent = "";
    O_AfficheMesage.
    O_TempValue.className = A_TemperatureCategories[1];
  }
  else if (currentTemp > 20 && currentTemp <= 30) {
    O_AfficheMesage.textContent = " ";
    O_TempValue.className = A_TemperatureCategories[2];
  }
  else {
    O_AfficheMesage.textContent = "Caliente ! Vamos a la playa, ho hoho hoho ";
    O_TempValue.className = A_TemperatureCategories[3];
  }
}

function AfficherHistorique() {

  O_History.innerHTML = ""; // On vide avant de remplir
  for (var i = 0; i < A_tempe.length; i++) {

  }
}

const intervalID = setInterval(AfficherLaTemperature, 500);

setup();
AfficherHistorique();
