"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClimateRecord {
    constructor(id, city, temperature, humidity, pressure, date) {
        this.id = id;
        this.city = city;
        this.temperature = temperature;
        this.humidity = humidity;
        this.pressure = pressure;
        this.date = date;
    }
}
exports.default = ClimateRecord;
