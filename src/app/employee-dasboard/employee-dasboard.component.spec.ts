import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDasboardComponent } from './employee-dasboard.component';

describe('EmployeeDasboardComponent', () => {
  let component: EmployeeDasboardComponent;
  let fixture: ComponentFixture<EmployeeDasboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDasboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeDasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
