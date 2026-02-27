import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <h2 mat-dialog-title>
      <mat-icon class="warn-icon">warning</mat-icon>
      Confirm Delete
    </h2>
    <mat-dialog-content>
      <p>Are you sure you want to delete <strong>{{ data.name }}</strong>?</p>
      <p class="warn-text">This action cannot be undone.</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-raised-button color="warn" [mat-dialog-close]="true">
        <mat-icon>delete</mat-icon>
        Delete
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .warn-icon {
      color: #f44336;
      vertical-align: middle;
      margin-right: 8px;
    }
    .warn-text {
      color: #666;
      font-size: 13px;
      margin-top: 8px;
    }
    h2 {
      display: flex;
      align-items: center;
    }
  `],
})
export class ConfirmDialogComponent {
  readonly data = inject<{ name: string }>(MAT_DIALOG_DATA);
}
