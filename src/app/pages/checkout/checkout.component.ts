import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
  private readonly cart = inject(CartService);
  private readonly router = inject(Router);

  readonly items = this.cart.items;
  readonly total = this.cart.totalPrice;
  readonly isEmpty = this.cart.isEmpty;
  readonly confirmed = signal(false);

  confirmOrder() {
    this.cart.clear();
    this.confirmed.set(true);

    // Optional: Navigate away after a few seconds
    // setTimeout(() => this.router.navigate(['/']), 3000);
  }
}
