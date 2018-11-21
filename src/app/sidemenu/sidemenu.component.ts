import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  AdminStatus;

  constructor() {}

  ngOnInit() {
    this.AdminStatus = localStorage.getItem('status').replace(/['"]+/g, '');
  }

}
