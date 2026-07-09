import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClimateRecord } from '../../models/climate-record';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alerts.component.html',
})
export class AlertsComponent {
  @Input() records: ClimateRecord[] = [];

  get alerts(): string[] {
    const alerts: string[] = [];

    this.records.forEach((record) => {
      if (record.temperature >= 35) {
        alerts.push(`🔥 Temperatura alta en ${record.city}: ${record.temperature} °C`);
      }

      if (record.temperature <= 10) {
        alerts.push(`❄️ Temperatura baja en ${record.city}: ${record.temperature} °C`);
      }

      if (record.humidity >= 90) {
        alerts.push(`💧 Humedad alta en ${record.city}: ${record.humidity}%`);
      }

      if (record.humidity <= 30) {
        alerts.push(`🏜️ Humedad baja en ${record.city}: ${record.humidity}%`);
      }
    });

    return alerts;
  }
}