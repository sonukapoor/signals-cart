import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  #items = signal<CartItem[]>([]);

  readonly items = this.#items.asReadonly();

  readonly totalItems = computed(() =>
    this.#items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly totalPrice = computed(() =>
    this.#items().reduce(
      (sum, item) => sum + item.quantity * item.product.price,
      0
    )
  );

  readonly isEmpty = computed(() => this.#items().length === 0);

  addProduct(product: Product) {
    const current = this.#items();
    const index = current.findIndex((i) => i.product.id === product.id);
    if (index >= 0) {
      const updated = [...current];
      updated[index] = {
        ...updated[index],
        quantity: updated[index].quantity + 1,
      };
      this.#items.set(updated);
    } else {
      this.#items.set([...current, { product, quantity: 1 }]);
    }
  }

  removeProduct(productId: string) {
    this.#items.set(this.#items().filter((i) => i.product.id !== productId));
  }

  clear() {
    this.#items.set([]);
  }
}
