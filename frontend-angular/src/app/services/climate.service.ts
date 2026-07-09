import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ClimateRecord } from '../models/climate-record';

@Injectable({
  providedIn: 'root',
})
export class ClimateService {
  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/climate';

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getAll(): Observable<ClimateRecord[]> {
    return this.http.get<ClimateRecord[]>(this.apiUrl, {
      headers: this.getHeaders(),
    });
  }

  getById(id: number): Observable<ClimateRecord> {
    return this.http.get<ClimateRecord>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  create(record: Omit<ClimateRecord, 'id'>): Observable<ClimateRecord> {
    return this.http.post<ClimateRecord>(this.apiUrl, record, {
      headers: this.getHeaders(),
    });
  }

  update(id: number, record: ClimateRecord): Observable<ClimateRecord> {
    return this.http.put<ClimateRecord>(`${this.apiUrl}/${id}`, record, {
      headers: this.getHeaders(),
    });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}