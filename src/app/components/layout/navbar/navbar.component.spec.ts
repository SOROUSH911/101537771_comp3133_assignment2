import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../../services/auth.service';

describe('NavbarComponent', () => {
  let mockAuthService: {
    isLoggedIn: ReturnType<typeof vi.fn>;
    getCurrentUser: ReturnType<typeof vi.fn>;
    logout: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    mockAuthService = {
      isLoggedIn: vi.fn().mockReturnValue(false),
      getCurrentUser: vi.fn().mockReturnValue(null),
      logout: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [NavbarComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: Apollo, useValue: { query: vi.fn(), mutate: vi.fn() } },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should show logged out state', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    expect(fixture.componentInstance.isLoggedIn).toBeFalsy();
  });

  it('should call logout', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    fixture.componentInstance.logout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});
