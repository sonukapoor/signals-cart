import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CartSidebarComponent } from './components/cart-sidebar/cart-sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { UIService } from './services/ui.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, CartSidebarComponent],
  template: `
    <app-header />
    <router-outlet />
    @if (ui.isSidebarOpen()) {
    <app-cart-sidebar />
    }
  `,
})
export class AppComponent {
  readonly ui = inject(UIService);
}
