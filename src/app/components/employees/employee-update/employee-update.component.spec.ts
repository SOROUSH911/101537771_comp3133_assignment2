import { TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { EmployeeUpdateComponent } from './employee-update.component';
import { EmployeeService } from '../../../services/employee.service';

describe('EmployeeUpdateComponent', () => {
  const mockEmployee = {
    _id: '1',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john@example.com',
    gender: 'Male' as const,
    designation: 'Developer',
    salary: 75000,
    date_of_joining: '2024-01-15',
    department: 'Engineering',
    employee_photo: null,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeUpdateComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideAnimationsAsync(),
        { provide: Apollo, useValue: { query: vi.fn(), mutate: vi.fn() } },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } },
        },
        {
          provide: EmployeeService,
          useValue: {
            getEmployeeById: vi.fn().mockReturnValue(of(mockEmployee)),
            updateEmployee: vi.fn().mockReturnValue(of(mockEmployee)),
          },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EmployeeUpdateComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load employee data into form', () => {
    const fixture = TestBed.createComponent(EmployeeUpdateComponent);
    fixture.detectChanges();
    const form = fixture.componentInstance.employeeForm;
    expect(form.get('first_name')?.value).toBe('John');
    expect(form.get('last_name')?.value).toBe('Doe');
    expect(form.get('email')?.value).toBe('john@example.com');
  });

  it('should have form validation', () => {
    const fixture = TestBed.createComponent(EmployeeUpdateComponent);
    fixture.detectChanges();
    const form = fixture.componentInstance.employeeForm;
    form.get('first_name')?.setValue('');
    expect(form.get('first_name')?.errors?.['required']).toBeTruthy();
  });
});
