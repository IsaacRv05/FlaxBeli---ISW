import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAutenticated: boolean | undefined;
  currentUser: any;
  constructor() { }

  ngOnInit(): void {
    this.isAutenticated = true;
    let user = {
      nombre: 'Kevin',
      email: 'flaxbeliRestaunray@gmail.com'
    };
    this.currentUser = user;  
  }

}
