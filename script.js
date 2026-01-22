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
  if (I_I >= A_tempe.length - 1) {
    I_I = 0;
  }

  var O_AfficheTemp = document.getElementById("tempList");
  O_AfficheTemp.textContent = A_tempe[I_I];

  var O_AfficheMesage = document.getElementById("message");

  if (A_tempe[I_I] < 0) {
    O_AfficheMesage.textContent = "Brrrrrrr, un peu froid ce matin, mets ta cagoule !";
    O_AfficheTemp.className = A_TemperatureCategories[0];
  } else if (A_tempe[I_I] >= 0 && A_tempe[I_I] <= 20) {
    O_AfficheMesage.textContent = "";
    O_AfficheTemp.className = A_TemperatureCategories[1];
  } else if (A_tempe[I_I] > 20 && A_tempe[I_I] <= 30) {
    O_AfficheMesage.textContent = "";
    O_AfficheTemp.className = A_TemperatureCategories[2];
  } else {
    O_AfficheMesage.textContent = "Caliente ! Vamos a la playa, ho hoho hoho ";
    O_AfficheTemp.className = A_TemperatureCategories[3];
  }
}

const intervalID = setInterval(AfficherLaTemperature, 500);

setup();
