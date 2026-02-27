import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Apollo } from 'apollo-angular';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideAnimationsAsync(),
        { provide: Apollo, useValue: { query: vi.fn(), mutate: vi.fn(), use: vi.fn() } },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    expect(fixture.componentInstance.signupForm.valid).toBeFalsy();
  });

  it('should require username', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const control = fixture.componentInstance.signupForm.controls['username'];
    expect(control.errors?.['required']).toBeTruthy();
  });

  it('should require valid email', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const control = fixture.componentInstance.signupForm.controls['email'];
    control.setValue('invalid');
    expect(control.errors?.['email']).toBeTruthy();
  });

  it('should require password', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const control = fixture.componentInstance.signupForm.controls['password'];
    expect(control.errors?.['required']).toBeTruthy();
  });

  it('should detect password mismatch', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    const form = fixture.componentInstance.signupForm;
    form.controls['password'].setValue('password123');
    form.controls['confirmPassword'].setValue('different');
    form.updateValueAndValidity();
    expect(form.errors?.['passwordMismatch']).toBeTruthy();
  });

  it('should be valid with matching passwords', () => {
    const fixture = TestBed.createComponent(SignupComponent);
    fixture.componentInstance.signupForm.setValue({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });
    expect(fixture.componentInstance.signupForm.valid).toBeTruthy();
  });
});
