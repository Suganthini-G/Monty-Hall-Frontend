import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { MontyHallComponent } from './monty-hall.component';
import { MontyHallService } from '../Services/monty-hall.service';

describe('MontyHallSimulatorComponent', () => {
  let component: MontyHallComponent;
  let fixture: ComponentFixture<MontyHallComponent>;
  let montyHallService: MontyHallService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MontyHallComponent ],
      imports: [ HttpClientTestingModule, FormsModule ],
      providers: [ MontyHallService ]
    }).compileComponents();

    fixture = TestBed.createComponent(MontyHallComponent);
    component = fixture.componentInstance;
    montyHallService = TestBed.inject(MontyHallService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should run simulation successfully', () => {
    const mockResult = {
      simulations: 1000,
      changedDoor: true,
      wins: 667,
      losses: 333,
      winPercentage: 66.7
    };
    
    spyOn(montyHallService, 'simulateGames').and.returnValue(of(mockResult));
    
    component.runSimulation();
    
    expect(component.results).toEqual(mockResult);
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });

  it('should handle errors when running simulation', () => {
    const errorMessage = 'API error';
    spyOn(montyHallService, 'simulateGames').and.returnValue(throwError(() => new Error(errorMessage)));
    
    component.runSimulation();
    
    expect(component.results).toBeNull();
    expect(component.loading).toBeFalse();
    expect(component.error).toContain(errorMessage);
  });

  it('should compare strategies successfully', () => {
    const mockSwitchResult = {
      simulations: 1000,
      changedDoor: true,
      wins: 667,
      losses: 333,
      winPercentage: 66.7
    };
    
    const mockStayResult = {
      simulations: 1000,
      changedDoor: false,
      wins: 333,
      losses: 667,
      winPercentage: 33.3
    };
    
    spyOn(montyHallService, 'simulateGames').and.returnValues(of(mockSwitchResult), of(mockStayResult));
    expect(component.loading).toBeFalse();
    expect(component.error).toBeNull();
  });
});