import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  products = this.productService.products;
  loading = this.productService.loading;
  cartCount = this.cartService.totalItems;

  addToCart(productId: string) {
    const product = this.products().find((p) => p.id === productId);

    if (product) {
      this.cartService.addProduct(product);
    }
  }
}
