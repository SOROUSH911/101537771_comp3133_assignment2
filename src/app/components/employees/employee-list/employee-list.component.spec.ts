import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Apollo } from 'apollo-angular';
import { EmployeeListComponent } from './employee-list.component';
import { EmployeeService } from '../../../services/employee.service';
import { of } from 'rxjs';

describe('EmployeeListComponent', () => {
  let mockEmployeeService: {
    getAllEmployees: ReturnType<typeof vi.fn>;
    searchEmployees: ReturnType<typeof vi.fn>;
    deleteEmployee: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockEmployeeService = {
      getAllEmployees: vi.fn().mockReturnValue(of([])),
      searchEmployees: vi.fn().mockReturnValue(of([])),
      deleteEmployee: vi.fn().mockReturnValue(of({ message: 'Deleted' })),
    };

    await TestBed.configureTestingModule({
      imports: [EmployeeListComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideAnimationsAsync(),
        { provide: Apollo, useValue: { query: vi.fn(), mutate: vi.fn() } },
        { provide: EmployeeService, useValue: mockEmployeeService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should load employees on init', () => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    fixture.detectChanges();
    expect(mockEmployeeService.getAllEmployees).toHaveBeenCalled();
  });

  it('should have correct displayed columns', () => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    expect(fixture.componentInstance.displayedColumns).toContain('name');
    expect(fixture.componentInstance.displayedColumns).toContain('email');
    expect(fixture.componentInstance.displayedColumns).toContain('department');
    expect(fixture.componentInstance.displayedColumns).toContain('actions');
  });

  it('should default search type to department', () => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    expect(fixture.componentInstance.searchType).toBe('department');
  });

  it('should clear search and reload', () => {
    const fixture = TestBed.createComponent(EmployeeListComponent);
    fixture.componentInstance.searchTerm = 'Engineering';
    fixture.componentInstance.clearSearch();
    expect(fixture.componentInstance.searchTerm).toBe('');
    expect(mockEmployeeService.getAllEmployees).toHaveBeenCalled();
  });
});
