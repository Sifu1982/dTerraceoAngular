import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dTerraceoAngular';

  desHome: Boolean;
  constructor(private router: Router) {
    this.desHome = true;
  }
  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (this.router.url === '/home') {
          this.desHome = false;
        } else {
          this.desHome = true;
        }
      }
    })
  }
}
