import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let cartService: CartService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        CartService,
        AuthService,
        RouterLink,
        { provide: ActivatedRoute, useValue: {} },
      ],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
    authService = TestBed.inject(AuthService);

    // triggers initial view rendering
    fixture.detectChanges();
  });

  it('should show login button when not logged in', () => {
    const header = fixture.nativeElement as HTMLElement;
    const loginButton = header.querySelector('button[routerLink="/login"]');
    expect(loginButton).toBeTruthy();
  });

  it('should displays total items from CartService signal', () => {
    const header = fixture.nativeElement as HTMLElement;

    authService.login('testuser'); // simulate login
    fixture.detectChanges(); // update the view

    // Initial state: cart is empty
    expect(component.totalItems()).toBe(0);

    // Mutate state via the service
    cartService.addProduct({
      id: 'p1',
      title: 'Signals Book',
      price: 50,
    });

    fixture.detectChanges(); // ensure the view reflects the signal change

    // Updated state: should reflect 1 item
    expect(header.textContent).toContain('1 items');
  });
});
