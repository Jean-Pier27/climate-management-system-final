import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClimateRecord } from '../../models/climate-record';

@Component({
  selector: 'app-climate-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './climate-form.component.html',
})
export class ClimateFormComponent implements OnChanges {
  @Input() selectedRecord: ClimateRecord | null = null;

  @Output() recordCreated = new EventEmitter<Omit<ClimateRecord, 'id'>>();
  @Output() recordUpdated = new EventEmitter<ClimateRecord>();

  city = '';
  temperature = 0;
  humidity = 0;
  pressure = 0;

  ngOnChanges(): void {
    if (this.selectedRecord) {
      this.city = this.selectedRecord.city;
      this.temperature = this.selectedRecord.temperature;
      this.humidity = this.selectedRecord.humidity;
      this.pressure = this.selectedRecord.pressure;
    }
  }

  saveRecord(): void {
    if (this.selectedRecord) {
      const updatedRecord: ClimateRecord = {
        ...this.selectedRecord,
        city: this.city,
        temperature: this.temperature,
        humidity: this.humidity,
        pressure: this.pressure,
      };

      this.recordUpdated.emit(updatedRecord);
    } else {
      const newRecord: Omit<ClimateRecord, 'id'> = {
        city: this.city,
        temperature: this.temperature,
        humidity: this.humidity,
        pressure: this.pressure,
        date: new Date().toISOString(),
      };

      this.recordCreated.emit(newRecord);
    }

    this.clearForm();
  }

  clearForm(): void {
    this.city = '';
    this.temperature = 0;
    this.humidity = 0;
    this.pressure = 0;
  }
}