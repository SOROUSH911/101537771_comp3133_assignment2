import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';
import { SalaryPipe } from '../../../pipes/salary.pipe';
import { TruncatePipe } from '../../../pipes/truncate.pipe';
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    SalaryPipe,
    TruncatePipe,
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit {
  private readonly employeeService = inject(EmployeeService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  employees: Employee[] = [];
  displayedColumns = ['employee_photo', 'name', 'email', 'department', 'designation', 'salary', 'actions'];
  loading = false;

  searchTerm = '';
  searchType: 'department' | 'designation' = 'department';

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.employeeService.getAllEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open('Failed to load employees', 'Close', { duration: 5000 });
      },
    });
  }

  onSearch(): void {
    if (!this.searchTerm.trim()) {
      this.loadEmployees();
      return;
    }

    this.loading = true;
    const designation = this.searchType === 'designation' ? this.searchTerm : undefined;
    const department = this.searchType === 'department' ? this.searchTerm : undefined;

    this.employeeService.searchEmployees(designation, department).subscribe({
      next: (employees) => {
        this.employees = employees;
        this.loading = false;
        if (employees.length === 0) {
          this.snackBar.open('No employees found matching your search', 'Close', { duration: 3000 });
        }
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open('Search failed', 'Close', { duration: 5000 });
      },
    });
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.loadEmployees();
  }

  viewEmployee(id: string): void {
    this.router.navigate(['/employees/view', id]);
  }

  editEmployee(id: string): void {
    this.router.navigate(['/employees/update', id]);
  }

  confirmDelete(employee: Employee): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { name: `${employee.first_name} ${employee.last_name}` },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteEmployee(employee._id);
      }
    });
  }

  private deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.snackBar.open('Employee deleted successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.loadEmployees();
      },
      error: (err) => {
        this.snackBar.open('Failed to delete employee', 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
