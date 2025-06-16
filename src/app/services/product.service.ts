import { computed, Injectable, signal } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  #products = signal<Product[]>([]);
  #loading = signal(false);

  readonly products = this.#products.asReadonly();
  readonly loading = this.#loading.asReadonly();
  readonly count = computed(() => this.#products().length);

  constructor() {
    this.#loading.set(true);

    setTimeout(() => {
      this.#products.set([
        {
          id: 'p1',
          title: 'Demo Product',
          price: 99,
          imageUrl: '',
        },
      ]);

      this.#loading.set(false);
    }, 1000);
  }

  setLoading(isLoading: boolean) {
    this.#loading.set(isLoading);
  }
}
