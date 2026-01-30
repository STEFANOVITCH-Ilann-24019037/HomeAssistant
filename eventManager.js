class EventManager {
  constructor() {
    this.A_tempe = [];
    this.A_HistoireTemperatures = [];
    var I_t;
    this.A_subscribers = [];

      for (var I_i = 0; I_i < 20; I_i++) {
        I_t = Math.random() * (40 - -10) + -10; // car Math.random() génère entre 0 et 1 donc pour avoir entre -10 et 40
        I_t = Math.round(I_t);
        this.A_tempe.push(I_t);
      }
  }

  subscribe(O_callback) {
    this.A_subscribers.push(O_callback);
  }

  notify(O_data) {
    this.A_subscribers.forEach(O_callback => O_callback(O_data));
  }

  unsubscribe(O_callback) {
    this.A_subscribers = this.A_subscribers.filter(O_sub => O_sub !== O_callback);
  }

  getTemperature(I_index) {
    return this.A_tempe[I_index];
  }

  addToHistory(I_temperature) {
    this.A_HistoireTemperatures.push(I_temperature);
  }

  getHistory() {
    return this.A_HistoireTemperatures;
  }


}


