import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { UIService } from '../../services/ui.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  #cart = inject(CartService);
  #auth = inject(AuthService);
  #router = inject(Router);
  #ui = inject(UIService);

  readonly totalItems = this.#cart.totalItems;
  readonly totalPrice = this.#cart.totalPrice;
  readonly isEmpty = this.#cart.isEmpty;
  readonly username = this.#auth.username;
  readonly isLoggedIn = this.#auth.isLoggedIn;

  openCart() {
    this.#ui.openSidebar();
  }

  logout() {
    this.#auth.logout();
    this.#router.navigateByUrl('/');
  }

  login() {
    this.#auth.login(this.#auth.username() || 'Guest');
  }
}
