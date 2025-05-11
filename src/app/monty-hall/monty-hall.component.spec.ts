import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MontyHallComponent } from './monty-hall.component';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { MontyHallService } from '../Services/monty-hall.service';
import { SimulationResult } from '../Model/simulation-result.module';
import { MontyHallDiagramComponent } from '../monty-hall-diagram/monty-hall-diagram.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MontyHallComponent', () => {
  let component: MontyHallComponent;
  let fixture: ComponentFixture<MontyHallComponent>;
  let mockService: jasmine.SpyObj<MontyHallService>;

  const mockResult: SimulationResult = {
    simulations: 100,
    wins: 60,
    losses: 40,
    winPercentage: 60,
    changedDoor: true
  };

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('MontyHallService', ['simulateGames']);

    await TestBed.configureTestingModule({
      declarations: [MontyHallComponent, MontyHallDiagramComponent],
      imports: [FormsModule],
      providers: [{ provide: MontyHallService, useValue: mockService }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MontyHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should not call simulateGames if strategy is not selected', () => {
    component.simulations = 100;
    component.changeDoor = undefined;
    component.runSimulation();

    expect(mockService.simulateGames).not.toHaveBeenCalled();
    expect(component.error).toBeNull(); 
  });

  it('should call simulateGames and update results on success', fakeAsync(() => {
    mockService.simulateGames.and.returnValue(of(mockResult));
    component.simulations = 100;
    component.changeDoor = true;

    component.runSimulation();
    tick(); 

    expect(mockService.simulateGames).toHaveBeenCalledWith(100, true);
    expect(component.results).toEqual(mockResult);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  }));

  it('should handle error from simulateGames', fakeAsync(() => {
    const errorMsg = 'Something went wrong';
    mockService.simulateGames.and.returnValue(throwError(() => ({ error: errorMsg })));

    component.simulations = 100;
    component.changeDoor = true;

    component.runSimulation();
    tick();

    expect(component.results).toBeNull();
    expect(component.error).toBe(errorMsg);
    expect(component.loading).toBeFalse();
  }));

  it('should reset the form on resetForm()', () => {
    component.simulations = 100;
    component.changeDoor = true;
    component.formSubmitted = true;
    component.results = mockResult;
    component.error = 'Some error';
    component.loading = true;

    const form = {
      resetForm: jasmine.createSpy('resetForm')
    } as any;

    component.resetForm(form);
    
    expect(component.simulations).toBe(0);
    expect(component.changeDoor).toBeUndefined();
    expect(component.formSubmitted).toBeFalse();
    expect(component.results).toBeNull();
    expect(component.error).toBeNull();
    expect(component.loading).toBeFalse();
    expect(form.resetForm).toHaveBeenCalled();
  });
});
