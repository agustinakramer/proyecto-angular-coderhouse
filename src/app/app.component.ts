import { Component, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'proyecto-angular-coder';
  
  opened = window.innerWidth > 768;
  hasActiveRoute = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.hasActiveRoute = event.url !== '/';
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.opened = window.innerWidth > 768;
  }
}
