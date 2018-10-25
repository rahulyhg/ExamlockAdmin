import { Component, OnInit } from '@angular/core';
import { RequestApi } from '../services/request.api';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-subscription',
  templateUrl: './edit-subscription.component.html',
  styleUrls: ['./edit-subscription.component.css']
})
export class EditSubscriptionComponent implements OnInit {

  Subsc:any;
  subscription:any;
  formError: boolean = false;
  formSuccess: boolean = false;
  formMessage: string;
  onlyID;

  cardBlur;
  loaderShow:boolean = true;

  validity = ['30 days', '90 days', '180 days', '360 days'];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestApi: RequestApi,
  ) { 
    this.Subsc = new subsc; 
    this.onlyID = new data;
  }

  ngOnInit() {
    this.getSubscription();
  }

  getSubscription() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.onlyID.sub_id = id;
    this.requestApi.viewSubscriptions(this.onlyID)
      .subscribe(
        (response) =>{    
          //hiding loader
          this.loaderShow = false;

          this.subscription = response;

      },
      (error) =>{
          //hiding loader
          this.loaderShow = false;
          
        console.log('error subscription', error);
      }
    );
  }

  goBack(): void {
    this.router.navigate(['subscription']);
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

    //showing loader
    this.loaderShow = true;

    this.route.params.subscribe((params: Params) => {
      let name = params['name'];
      
      delete this.subscription['sub_created'];
      delete this.subscription['sub_expiry'];

      this.requestApi.editSubsciption(this.subscription)
      .subscribe(
      (response) => {
        if (!response.errorMessage) {
          this.formSuccess = true;
          this.formError = false;
          this.formMessage = response.successMessage;
          setTimeout(() => {
            this.router.navigate(['subscription']);
          }, 1500);
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
    });    
  }
}

export class subsc{
  sub_name:string;
  sub_desc:string;
  sub_cost:number;
  sub_id:number;
  validity:any;
  devices: number;
}

export class data{
  public sub_id: number ;
} 