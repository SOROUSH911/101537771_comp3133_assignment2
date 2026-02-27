import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Apollo } from 'apollo-angular';
import { EmployeeAddComponent } from './employee-add.component';

describe('EmployeeAddComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeAddComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideAnimationsAsync(),
        { provide: Apollo, useValue: { query: vi.fn(), mutate: vi.fn() } },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EmployeeAddComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    const fixture = TestBed.createComponent(EmployeeAddComponent);
    expect(fixture.componentInstance.employeeForm.valid).toBeFalsy();
  });

  it('should require first_name', () => {
    const fixture = TestBed.createComponent(EmployeeAddComponent);
    const control = fixture.componentInstance.employeeForm.controls['first_name'];
    expect(control.errors?.['required']).toBeTruthy();
  });

  it('should require valid email', () => {
    const fixture = TestBed.createComponent(EmployeeAddComponent);
    const control = fixture.componentInstance.employeeForm.controls['email'];
    control.setValue('invalid');
    expect(control.errors?.['email']).toBeTruthy();
  });

  it('should enforce minimum salary of 1000', () => {
    const fixture = TestBed.createComponent(EmployeeAddComponent);
    const control = fixture.componentInstance.employeeForm.controls['salary'];
    control.setValue(500);
    expect(control.errors?.['min']).toBeTruthy();
  });

  it('should accept valid salary', () => {
    const fixture = TestBed.createComponent(EmployeeAddComponent);
    const control = fixture.componentInstance.employeeForm.controls['salary'];
    control.setValue(50000);
    expect(control.errors).toBeNull();
  });

  it('should have gender options', () => {
    const fixture = TestBed.createComponent(EmployeeAddComponent);
    expect(fixture.componentInstance.genders).toEqual(['Male', 'Female', 'Other']);
  });

  it('should have department options', () => {
    const fixture = TestBed.createComponent(EmployeeAddComponent);
    expect(fixture.componentInstance.departments.length).toBeGreaterThan(0);
  });

  it('should have no image preview initially', () => {
    const fixture = TestBed.createComponent(EmployeeAddComponent);
    expect(fixture.componentInstance.imagePreview).toBeNull();
  });
});
