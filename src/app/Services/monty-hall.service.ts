import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SimulationResult } from '../Model/simulation-result.module';

@Injectable({
  providedIn: 'root'
})
export class MontyHallService {
    private apiUrl = 'https://localhost:44378/api/MontyHall';

  constructor(private http: HttpClient) { }

  simulateGames(simulations: number, changeDoor: boolean): Observable<SimulationResult> {
    return this.http.get<SimulationResult>(`${this.apiUrl}/simulate`, {
      params: {
        simulations: simulations.toString(),
        changeDoor: changeDoor.toString()
      }
    });
  }
}
