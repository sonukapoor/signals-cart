import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartComponent } from '../../pages/cart/cart.component';
import { CartService } from '../../services/cart.service';
import { UIService } from '../../services/ui.service';

@Component({
  selector: 'app-cart-sidebar',
  standalone: true,
  imports: [CommonModule, CartComponent, RouterLink],
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.scss'],
})
export class CartSidebarComponent {
  readonly isEmpty = inject(CartService).isEmpty;
  readonly uiService = inject(UIService);

  @HostListener('document:keydown.escape', ['$event'])
  closeSidebar() {
    this.uiService.closeSidebar();
  }
}
