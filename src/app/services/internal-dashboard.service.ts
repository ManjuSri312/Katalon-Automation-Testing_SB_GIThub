import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**
 * TODO: this currently returns static mock data. Replace with real HTTP
 * calls to the internal dashboard API once the backend endpoints/contracts
 * are available.
 */
@Injectable({
  providedIn: 'root',
})
export class InternalDashboardService {
  private readonly mockUsers = [
    { Email: 'alex.morgan@example.com', Name: 'Alex Morgan' },
    { Email: 'jordan.lee@example.com', Name: 'Jordan Lee' },
    { Email: 'sam.patel@example.com', Name: 'Sam Patel' },
  ];

  getUsers(): Observable<{ data: Array<{ Email: string; Name: string }>; exception: null }> {
    return of({ data: this.mockUsers, exception: null });
  }

  updateTaskRows(params: any): Observable<{ exception: null; data: any }> {
    return of({ exception: null, data: params?.data ?? [] });
  }
}
