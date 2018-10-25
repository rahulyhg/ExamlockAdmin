import { Component } from '@angular/core';
import {Router } from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent{

  constructor(public router:Router) {
    localStorage.setItem('isLoggedIn','F');
    localStorage.clear();
    this.router.navigate(["login/0"]);   
  }

}
