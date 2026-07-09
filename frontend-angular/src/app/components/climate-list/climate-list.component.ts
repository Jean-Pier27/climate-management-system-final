import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClimateFormComponent } from '../climate-form/climate-form.component';
import { ChangeDetectorRef } from '@angular/core';
import { ClimateService } from '../../services/climate.service';
import { ClimateRecord } from '../../models/climate-record';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { AlertsComponent } from '../alerts/alerts.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-climate-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DashboardComponent,
    ClimateFormComponent,
    AlertsComponent
  ],
  templateUrl: './climate-list.component.html',
})
export class ClimateListComponent implements OnInit {
  private climateService = inject(ClimateService);
  private cdr = inject(ChangeDetectorRef);

  records: ClimateRecord[] = [];
  selectedRecord: ClimateRecord | null = null;
  searchText = '';

  get filteredRecords(): ClimateRecord[] {
    return this.records.filter(record =>
      record.city.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
  this.climateService.getAll().subscribe({
    next: (data) => {
      this.records = data;
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error al cargar registros:', error);
    },
  });
}

createRecord(record: Omit<ClimateRecord, 'id'>): void {
    this.climateService.create(record).subscribe({
      next: () => {
        this.loadRecords(); // Recarga la tabla
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error al crear registro:', error);
      },
    });
  }

  editRecord(record: ClimateRecord): void {
  this.selectedRecord = { ...record };
}

updateRecord(record: ClimateRecord): void {
  this.climateService.update(record.id, record).subscribe({
    next: () => {
      this.selectedRecord = null;
      this.loadRecords();
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error al actualizar registro:', error);
    },
  });
}

  deleteRecord(id: number): void {
  const confirmDelete = confirm('¿Seguro que deseas eliminar este registro?');

  if (!confirmDelete) return;

  this.climateService.delete(id).subscribe({
    next: () => {
      this.records = this.records.filter(record => record.id !== id);
      this.cdr.detectChanges();
    },
    error: (error) => {
      console.error('Error al eliminar registro:', error);
    },
  });
}

}
