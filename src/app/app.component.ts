import { Observable } from 'rxjs/Observable';
import { AuthService } from './services/auth/auth.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ISubscription } from "rxjs/Subscription";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { RequestApi } from './services/request.api';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  }
})


export class AppComponent implements OnInit, OnDestroy{
  @ViewChild('sidenav') sidenav: any;

  classShow;
  uname = '"Admin"';
  dd:string;
  user:string;
  hide:boolean;
  opened: any = false;
  isLoggedIn$: Observable<boolean> | Promise<boolean> | boolean;
  title = 'app';
  sidemenuActive;
  colorChange= { "redColor" : false };
  presentOn;
  clientTrue;
  inRule=false; inExam=false; inClient=false;
  inSubscription=false; inInvoice=false; inActivity=false;
  private logSubcription: ISubscription;
  id;
  doSearch;

  constructor(public router: Router, private authService: AuthService, private requestApi: RequestApi,      private spinnerService: Ng4LoadingSpinnerService,  private route: ActivatedRoute) {  }

  ngOnInit() {

    // if(localStorage.getItem('users')  != ''){
    // }else{

    //  // this.router.navigate(['/logout']);
    // }

    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
     this.logSubcription =  this.isLoggedIn$.subscribe((logged: boolean) => {
          if (logged) {
            if (localStorage.getItem('users') != '' && localStorage.getItem('users') != null && JSON.parse(localStorage.getItem('users')) !== null) {

              var data = JSON.parse(localStorage.getItem('users'));
              this.dd = data.username;
              this.user = data.usertype;
              this.hide = data.hide;
              this.admin();
            }
          }
        });
      this.admin();
  }

  ngOnDestroy() {
    this.logSubcription.unsubscribe();
  }

  changecolour(){
    this.colorChange = { "redColor" : true };
  }

  getTheme(){
    return this.classShow;
  }

  admin(){
    this.uname = localStorage.getItem("admin_name");
    if(this.uname != null){
      this.uname = this.uname.replace(/['"]+/g, '');
    }else{
      this.uname = 'Admin';
    }
  }

  //keeping the sidenav active on inner pages
  onClick(){

    var valu = this.router.url;
    if(valu.indexOf('exam') + 1){

      this.doingFalse();
      this.inExam = true;

    }else if(valu.indexOf('client') + 1){

      this.doingFalse();
      this.inClient=true;

    }else if((valu.indexOf('code') + 1) || (valu.indexOf('rule') + 1)){

      this.doingFalse();
      this.inRule=true;

    }else if(valu.indexOf('subscription') + 1){

      this.doingFalse();
      this.inSubscription=true;

    }else if(valu.indexOf('invoice') + 1){

      this.doingFalse();
      this.inInvoice=true;

    }else if((valu.indexOf('log') + 1) || (valu.indexOf('activity') + 1)) {


      this.doingFalse();
      this.inActivity=true;
    }
  }

  doingFalse(){
    this.inRule=this.inExam=this.inClient=false;
    this.inSubscription=this.inInvoice=this.inActivity=false;
  }
  
}
