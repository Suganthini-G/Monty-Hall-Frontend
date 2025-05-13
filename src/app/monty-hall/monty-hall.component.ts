import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SimulationResult } from '../Model/simulation-result.module';
import { MontyHallService } from '../Services/monty-hall.service';

@Component({
  selector: 'app-monty-hall',
  templateUrl: './monty-hall.component.html',
  styleUrls: ['./monty-hall.component.css']
})
export class MontyHallComponent {
  simulations?: number;
  changeDoor?: boolean;
  formSubmitted: boolean = false;
  results: SimulationResult | null = null;
  loading: boolean = false;
  error: string | null = null;
  showToast: boolean = false;

  constructor(private montyHallService: MontyHallService) { }

  runSimulation(): void {
    this.formSubmitted = true;

    if (this.changeDoor === undefined || this.changeDoor === null) {
      this.error = null;
      this.loading = false;
      return;
    }

    this.loading = true;
    this.error = null;

    this.montyHallService.simulateGames(this.simulations ?? 0, this.changeDoor)
      .subscribe({
        next: (data) => {
          this.results = data;
          this.loading = false;
        },
        error: (err) => {
          let errorMsg = 'Error running simulation';
          if (typeof err.error === 'string') {
            errorMsg = err.error;
          } else if (err.error?.message) {
            errorMsg = err.error.message;
          } else if (err.message) {
            errorMsg = err.message;
          }
          this.error = errorMsg;
          this.loading = false;
        }
      });
      if (this.simulations && this.simulations < 1000) {
        this.showToast = true;
        setTimeout(() => {
          this.showToast = false;
        }, 5000);
      }
  }

  closeToast() {
    this.showToast = false;
  }

  resetForm(form: NgForm): void {
    this.simulations = 0;
    this.changeDoor = undefined;
    this.formSubmitted = false;
    this.results = null;
    this.error = null;
    this.loading = false;
  
    if (form) {
      form.resetForm();
    }
  }  
}