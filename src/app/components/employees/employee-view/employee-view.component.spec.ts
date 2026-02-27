import { TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Apollo } from 'apollo-angular';
import { of } from 'rxjs';
import { EmployeeViewComponent } from './employee-view.component';
import { EmployeeService } from '../../../services/employee.service';

describe('EmployeeViewComponent', () => {
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
      imports: [EmployeeViewComponent],
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
          useValue: { getEmployeeById: vi.fn().mockReturnValue(of(mockEmployee)) },
        },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EmployeeViewComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load employee on init', () => {
    const fixture = TestBed.createComponent(EmployeeViewComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.employee).toEqual(mockEmployee);
    expect(fixture.componentInstance.loading).toBeFalsy();
  });
});
