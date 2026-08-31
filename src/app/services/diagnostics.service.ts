import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * TODO: this currently returns static mock data. Replace with real HTTP
 * calls to the diagnostics API once the backend endpoints/contracts are
 * available.
 */
@Injectable({
  providedIn: 'root',
})
export class DiagnosticsService {
  createNewTask(params: any): Observable<{ exception: null; data: any }> {
    return of({ exception: null, data: params?.data ?? [] });
  }
}
