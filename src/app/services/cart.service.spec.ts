// src/app/services/cart.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { Product } from '../models/product.model';
import { CartService } from './cart.service';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    TestBed.configureTestingModule({
      providers: [CartService],
    });
    service = TestBed.inject(CartService);
  });

  it('adds products to the cart', () => {
    const product: Product = {
      id: 'p1',
      title: 'Laptop',
      price: 1200,
    };
    service.addProduct(product);
    expect(service.totalItems()).toBe(1);
    expect(service.items()).toEqual([{ product, quantity: 1 }]);
  });

  it('clears the cart', () => {
    const product: Product = {
      id: 'p1',
      title: 'Laptop',
      price: 1200,
    };
    service.addProduct(product);
    service.clear();
    expect(service.totalItems()).toBe(0);
  });

  it('persists updated cart on removeProduct()', () => {
    const product: Product = {
      id: 'abc',
      title: 'Signal Hoodie',
      price: 65,
    };

    service.addProduct(product);
    service.removeProduct(product.id);

    TestBed.tick();

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[]');
  });
});
