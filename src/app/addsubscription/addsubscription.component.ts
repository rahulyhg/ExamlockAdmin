import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { SubcriptionModel } from './subcription.model';
import { RequestApi } from '../services/request.api';

@Component({
  selector: 'app-addsubscription',
  templateUrl: './addsubscription.component.html',
  styleUrls: ['./addsubscription.component.css']
})
export class AddsubscriptionComponent implements OnInit {
  public subcript;
  formError: boolean = false;
  formSuccess: boolean = false;
  formMessage: string;
  defaultValue : string;
  cardBlur;
  loaderShow:boolean = true;

  validity = ['30 days', '90 days', '180 days', '360 days'];

  constructor(private requestApi: RequestApi, private router: Router) {
    this.subcript = new SubcriptionModel;
    this.defaultValue = '';
  }
 
  ngOnInit() {
    //hiding loader
    this.loaderShow = false;
  }

  OnSave() {
     
    this.subcript.validity = this.defaultValue;
    this.requestApi.addSubcription(this.subcript).subscribe(
      (response) => {
        if ( response.msg == "Subscription name already taken."){
          //hiding loader
          this.loaderShow = false;

          this.formError = true;
          this.formSuccess = false;
          this.formMessage = response.msg;
        }
        else if (!response.errorMessage) {
          this.formSuccess = true;
          this.formError = false;
          this.formMessage = response.successMessage;

           setTimeout(()=>{
             this.router.navigate(['subscription']);
           },1000);
        } else {
          //hiding loader
          this.loaderShow = false;
          
          this.formError = true;
          this.formSuccess = false;
          this.formMessage = response.errorMessage;
        }
      },
      (error) => {
        //hiding loader
        this.loaderShow = false;

        this.formError = true;
        this.formMessage = "server return error. Please try again";
      });
  }

  CrdBlur(){
    if(this.loaderShow){
      this.cardBlur = { "blur" : true }
    }else{
      this.cardBlur = { "blur" : false }
    }
    return this.cardBlur;
  }

  goBack(): void {
    this.router.navigate(['subscription']);
  }
}
