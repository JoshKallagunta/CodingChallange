import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from "@angular/router"
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  skipLinkPath: string;

  constructor(public router : Router) { }

  ngOnInit() {

    this.skipNav();

  }

  skipNav() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      if( ! this.router.url.endsWith('#main-content')) {
          this.skipLinkPath = `${this.router.url}#main-content`;
      }
   });
  }

}
