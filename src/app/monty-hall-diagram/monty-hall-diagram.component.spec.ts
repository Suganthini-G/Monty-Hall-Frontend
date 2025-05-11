import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontyHallDiagramComponent } from './monty-hall-diagram.component';

describe('MontyHallDiagramComponent', () => {
  let component: MontyHallDiagramComponent;
  let fixture: ComponentFixture<MontyHallDiagramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MontyHallDiagramComponent]
    });
    fixture = TestBed.createComponent(MontyHallDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
