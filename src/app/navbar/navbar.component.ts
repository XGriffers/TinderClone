// navbar.component.ts

import { Component } from '@angular/core';

@Component({
  // component code
})
export class NavbarComponent {

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

}