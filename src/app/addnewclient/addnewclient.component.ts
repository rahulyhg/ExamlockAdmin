import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientModel } from './client.model';
import { RequestApi } from '../services/request.api';

@Component({
  selector: 'app-addnewclient',
  templateUrl: './addnewclient.component.html',
  styleUrls: ['./addnewclient.component.css']
})

export class AddnewclientComponent implements OnInit {

  public client;
  formError: boolean = false;
  formSuccess: boolean = false;
  formMessage: string;
  preAvail;
  prefix;
  PhoneNotValid = false;
  cardBlur;
  loaderShow:boolean = true;


  constructor(private requestApi: RequestApi, private route: Router) {
    this.client = new ClientModel;
    this.prefix = new preModel;
  }

  ngOnInit() {
    //hiding loader
    this.loaderShow = false;
  }

  CrdBlur(){
    if(this.loaderShow){
      this.cardBlur = { "blur" : true }
    }else{
      this.cardBlur = { "blur" : false }
    }
    return this.cardBlur;
  }

  onSave() {

    this.formError = false;

    //showing loader
    this.loaderShow = true;

    this.requestApi.addClient(this.client)
      .subscribe(
      (response) => {
        if (response.status=="success") {
          this.formSuccess = true;
          this.formError = false;
          this.formMessage = response.successMessage;

          setTimeout(() => {
            this.route.navigate(['client']);
          }, 1500);

          
        } else {
          //hiding loader
          this.loaderShow = false;
        
          this.formError = true;
          this.formSuccess = false;
          this.formMessage = response.msg;
        }
      },
      (error) => {
        //hiding loader
        this.loaderShow = false;

        this.formError = true;
        this.formMessage = "server return error. Please try again";
      });
  }
  

  checkPrefix(event){
    //removing error from top if true
    this.formError = false;

    this.prefix.pre = event.target.value;
    this.requestApi.checkPrefix(this.prefix)
      .subscribe((response : Response) =>{
        this.preAvail = response; 
        var stat = this.preAvail.status
        
        if(stat == 'failed'){
          this.formError = true;
          this.formSuccess = false;
          this.formMessage = this.preAvail.msg;
          this.client.prefix = '';
        }
      });
  }
}

export class preModel{
  pre;
}
