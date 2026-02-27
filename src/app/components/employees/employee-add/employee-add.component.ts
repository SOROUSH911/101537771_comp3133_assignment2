import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss',
})
export class EmployeeAddComponent {
  private readonly fb = inject(FormBuilder);
  private readonly employeeService = inject(EmployeeService);
  private readonly router = inject(Router);
  private readonly snackBar = inject(MatSnackBar);

  employeeForm: FormGroup = this.fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    gender: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    salary: ['', [Validators.required, Validators.min(1000)]],
    date_of_joining: ['', [Validators.required]],
    department: ['', [Validators.required]],
    employee_photo: [''],
  });

  loading = false;
  imagePreview: string | null = null;
  genders = ['Male', 'Female', 'Other'];
  departments = ['Engineering', 'HR', 'Sales', 'Marketing', 'Finance', 'Operations', 'IT', 'Legal'];

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.snackBar.open('File size must be less than 5MB', 'Close', { duration: 3000 });
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.employeeForm.patchValue({ employee_photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  removePhoto(): void {
    this.imagePreview = null;
    this.employeeForm.patchValue({ employee_photo: '' });
  }

  onSubmit(): void {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formValue = { ...this.employeeForm.value };

    // Format date as ISO string
    if (formValue.date_of_joining instanceof Date) {
      formValue.date_of_joining = formValue.date_of_joining.toISOString().split('T')[0];
    }

    // Convert salary to number
    formValue.salary = parseFloat(formValue.salary);

    // Remove empty photo field
    if (!formValue.employee_photo) {
      delete formValue.employee_photo;
    }

    this.employeeService.addEmployee(formValue).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Employee added successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.loading = false;
        const message = err?.message || 'Failed to add employee';
        this.snackBar.open(message, 'Close', {
          duration: 5000,
          panelClass: ['error-snackbar'],
        });
      },
    });
  }
}
