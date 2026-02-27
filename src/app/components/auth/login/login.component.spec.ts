import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Apollo } from 'apollo-angular';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideAnimationsAsync(),
        { provide: Apollo, useValue: { query: vi.fn(), mutate: vi.fn(), use: vi.fn() } },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should have invalid form when empty', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    expect(fixture.componentInstance.loginForm.valid).toBeFalsy();
  });

  it('should require usernameOrEmail', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const control = fixture.componentInstance.loginForm.controls['usernameOrEmail'];
    expect(control.errors?.['required']).toBeTruthy();
  });

  it('should require password', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const control = fixture.componentInstance.loginForm.controls['password'];
    expect(control.errors?.['required']).toBeTruthy();
  });

  it('should enforce minimum length on usernameOrEmail', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const control = fixture.componentInstance.loginForm.controls['usernameOrEmail'];
    control.setValue('ab');
    expect(control.errors?.['minlength']).toBeTruthy();
  });

  it('should enforce minimum length on password', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    const control = fixture.componentInstance.loginForm.controls['password'];
    control.setValue('abc');
    expect(control.errors?.['minlength']).toBeTruthy();
  });

  it('should be valid with correct inputs', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    fixture.componentInstance.loginForm.setValue({
      usernameOrEmail: 'admin',
      password: 'password123',
    });
    expect(fixture.componentInstance.loginForm.valid).toBeTruthy();
  });

  it('should have loading set to false initially', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    expect(fixture.componentInstance.loading).toBeFalsy();
  });

  it('should have hidePassword set to true initially', () => {
    const fixture = TestBed.createComponent(LoginComponent);
    expect(fixture.componentInstance.hidePassword).toBeTruthy();
  });
});
