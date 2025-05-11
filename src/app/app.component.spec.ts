import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MontyHallComponent } from './monty-hall/monty-hall.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MontyHallDiagramComponent } from './monty-hall-diagram/monty-hall-diagram.component';
import { FormsModule } from '@angular/forms'; 

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [RouterTestingModule, HttpClientTestingModule, FormsModule],
    declarations: [AppComponent, MontyHallComponent, MontyHallDiagramComponent]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
