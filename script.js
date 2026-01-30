// Application principale avec architecture Observer
var I_currentIndex = 0;
var O_eventManager;
var O_temperatureDisplay;
var O_historyManager;
var I_intervalID;
const I_UPDATE_INTERVAL = 500; // Millisecondes entre chaque mise à jour

window.addEventListener("load", function () {
  // Initialiser les tabs selon ARIA Authoring Practices
  var A_tablists = document.querySelectorAll("[role=tablist].manual");
  for (var I_i = 0; I_i < A_tablists.length; I_i++) {
    new TabsManual(A_tablists[I_i]);
  }

  // Initialiser le EventManager (Subject/Observable pattern)
  O_eventManager = new EventManager();

  // Créer les observateurs (Observers)
  O_temperatureDisplay = new TemperatureDisplay(O_eventManager);
  O_historyManager = new HistoryManager(O_eventManager);

  // Démarrer la boucle de mise à jour automatique
  I_intervalID = setInterval(afficherTemperatureSuivante, I_UPDATE_INTERVAL);
});


function afficherTemperatureSuivante() {
  // Passer à la température suivante
  I_currentIndex++;
  if (I_currentIndex >= O_eventManager.A_tempe.length) {
    I_currentIndex = 0;
  }

  // Récupérer la température actuelle
  const I_temperature = O_eventManager.getTemperature(I_currentIndex);

  // Ajouter à l'historique interne
  O_eventManager.addToHistory(I_temperature);

  // Notifier tous les observateurs avec les données
  O_eventManager.notify({ 
    temperature: I_temperature, 
    index: I_currentIndex 
  });
}
function envoyerDonneesServeur() {
	fetch("http://api.hothothot.dog/",
		{
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: "POST",
		    body: JSON.stringify({param1: 'valeur'})
	})
	.then(function(response) {
		//S'il s'agit de JSON nous pouvons l'exploiter à l'aide de json()
		return response.json().then(function(O_json) {  
			//traitement de notre objet en provenance du Json
		});	
	})
	.catch(function() {

	});
}

function arreterMiseAJour() {
  if (I_intervalID) {
    clearInterval(I_intervalID);
  }
}
