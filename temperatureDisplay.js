// Observer pour afficher la température actuelle
class TemperatureDisplay {
  constructor(O_eventManager) {
    this.O_eventManager = O_eventManager;
    this.O_tempElement = document.getElementById("tempList");
    this.O_messageElement = document.getElementById("message");
    this.A_categories = ["bleue", "vert", "orange", "rouge"];
    this.A_temperatureRanges = [
      { min: -Infinity, max: 0, S_message: "Brrrrrrr, un peu froid ce matin, mets ta cagoule !", S_category: "bleue" },
      { min: 0, max: 20, S_message: " ", S_category: "vert" },
      { min: 20, max: 30, S_message: " ", S_category: "orange" },
      { min: 30, max: Infinity, S_message: "Caliente ! Vamos a la playa, ho hoho hoho ", S_category: "rouge" }
    ];

    // S'abonner aux changements de température
    this.O_eventManager.subscribe(this.update.bind(this));
  }


  O_findTemperatureConfig(I_temperature) {
    return this.A_temperatureRanges.find(
      O_range => I_temperature >= O_range.min && I_temperature < O_range.max
    );
  }

  update(O_data) {
    const I_temperature = O_data.temperature;
    const O_config = this.O_findTemperatureConfig(I_temperature);

    // Afficher la température avec l'unité
    this.O_tempElement.textContent = `${I_temperature} °C`;
    
    // Appliquer le style CSS selon la catégorie
    this.O_tempElement.className = O_config.S_category;

    // Afficher ou masquer le message d'alerte
    this.O_messageElement.textContent = O_config.S_message;
  }
}
