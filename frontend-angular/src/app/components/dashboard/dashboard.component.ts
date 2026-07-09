import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClimateRecord } from '../../models/climate-record';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  @Input() records: ClimateRecord[] = [];

  get totalRecords(): number {
    return this.records.length;
  }

  get averageTemperature(): number {
    if (this.records.length === 0) return 0;

    const total = this.records.reduce(
      (sum, record) => sum + record.temperature,
      0
    );

    return total / this.records.length;
  }

  get averageHumidity(): number {
    if (this.records.length === 0) return 0;

    const total = this.records.reduce(
      (sum, record) => sum + record.humidity,
      0
    );

    return total / this.records.length;
  }
}