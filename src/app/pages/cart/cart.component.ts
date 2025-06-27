import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent {
  private readonly cart = inject(CartService);
  readonly items = this.cart.items;
  readonly total = this.cart.totalPrice;
  readonly isEmpty = this.cart.isEmpty;

  remove(productId: string) {
    this.cart.removeProduct(productId);
  }
}
