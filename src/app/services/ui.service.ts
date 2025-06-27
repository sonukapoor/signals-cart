import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UIService {
  readonly isSidebarOpen = signal(false);

  openSidebar() {
    this.isSidebarOpen.set(true);
  }

  closeSidebar() {
    this.isSidebarOpen.set(false);
  }
}
