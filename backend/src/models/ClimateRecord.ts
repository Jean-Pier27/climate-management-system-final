export interface ClimateRecordData {
  city: string;
  temperature: number;
  humidity: number;
  pressure: number;
  date: string;
}

export default class ClimateRecord {
  id: number;
  city: string;
  temperature: number;
  humidity: number;
  pressure: number;
  date: string;

  constructor(
    id: number,
    city: string,
    temperature: number,
    humidity: number,
    pressure: number,
    date: string
  ) {
    this.id = id;
    this.city = city;
    this.temperature = temperature;
    this.humidity = humidity;
    this.pressure = pressure;
    this.date = date;
  }
}