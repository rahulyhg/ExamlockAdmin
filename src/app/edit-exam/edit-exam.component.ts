import { Component, OnInit } from '@angular/core';
import { RequestApi } from '../services/request.api';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-exam',
  templateUrl: './edit-exam.component.html',
  styleUrls: ['./edit-exam.component.css']
})
export class EditExamComponent implements OnInit {

  public exam: any;
  formError: boolean = false;
  formSuccess: boolean = false;
  formMessage: string;
  onlyID;
  onlyExam;
  Billing_cycles = [
    "Daily", "Weekly", "Fortnightly", "Monthly", "Yearly"
  ];

  onlyClientID;
  rules;
  sub_id;
  subscription;
  client;
  rule_ID;
  clientNAME;
  rule_name;
  subscriptions;

  SubIDRes;
  SubID;
  amount;
  actual_amount;
  payable_amount;
  discount;
  bulk_discount;
  subCost;

  cardBlur;
  loaderShow:boolean = true;

  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private requestApi: RequestApi,
  ) {
    this.onlyID = new data;
    this.rule_ID = new RuleIDModel;
    this.sub_id = new SubIdModel;
    this.subscription = new subIDRES;
    this.SubIDRes = new subIDRES;
    this.SubID = new SubIdModel;
  }

  ngOnInit() {
    this.viewExam();
  }
  
  viewExam() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.onlyID.exam_id = id;
    this.requestApi.viewExam(this.onlyID)
      .subscribe(
        (response) =>{   

          //hiding loader
          this.loaderShow = false;

          this.onlyExam = response;

          // let clientID= this.onlyExam[0].client_id;
          // let rule_id = this.onlyExam[0].rule_id;
          let SubId = this.onlyExam[0].subs_id;
          this.bulk_discount = this.onlyExam[0].bulk_discount

          this.clientNameDrop();
          this.RuleDropdown();

          this.getSubscription(SubId);

        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;

          console.log('error subscription', error);
        }
      );
  }

  clientNameDrop(){
    this.requestApi.getClients()
      .subscribe(
        (response) =>{        
          this.client = response.clients;
        },
        (error) =>{
          console.log('error getting clients', error);
        }
      );
  }

  RuleDropdown(){
    this.requestApi.getAllRules()
      .subscribe(
        (response) =>{   
          this.rules = response.rules;   
        },
        (error) =>{
          console.log('error getting rules', error);
        }
      );
  }

  RulebyID(id){
    this.requestApi.viewRuleCatById(this.rule_ID)
      .subscribe((response) =>{         

        this.rule_name = response.rule_name;
      },
        
      (error) =>{
          console.log('error viewing rule', error);
        }
      );
  }

  viewSubscription(event) {
    this.getSubscription(event.target.value);
  }

  getSubscription(id){
    this.SubID.sub_id=id;
    this.requestApi.viewSubscriptions( this.SubID)
    .subscribe(
      (response) =>{            
        this.SubIDRes = response;   
        this.amount = this.SubIDRes.sub_cost;
        this.actual_amount =  this.SubIDRes.sub_cost;

        this.discountedAmount(this.bulk_discount);

      },
      (error) =>{
        console.log('error viewing subscription', error);
      }
    );
  }

  discountedAmount(value){
    this.discount = ((value*this.amount)/100);
    let newAmount = (this.amount - this.discount);
    this.payable_amount = newAmount;
  }


  onSave() {
    //showing loader
    this.loaderShow = true;

    const id = +this.route.snapshot.paramMap.get('id');

    this.requestApi.editexam(this.onlyExam[0])
      .subscribe(
      (response) => {
        if (!response.errorMessage) {
          this.formSuccess = true;
          this.formError = false;
          this.formMessage = response.successMessage;
          setTimeout(() => {
            this.router.navigate(['exam']);
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
     }

    goBack(): void {
      this.router.navigate(['exam']);
     }

     
  CrdBlur(){
    if(this.loaderShow){
      this.cardBlur = { "blur" : true }
    }else{
      this.cardBlur = { "blur" : false }
    }
    return this.cardBlur;
  }

}

export class data{
  exam_id: number;
}

export class subResultModel{
  sub_cost;
  sub_created;
  sub_desc;
  sub_expiry;
  sub_id;
  sub_name;
  validity;
  devices;
  amount;
}

export class RuleIDModel{
  rule_id:number;
}

export class SubIdModel{
  sub_id: any;
}

export class subIDRES{
  devices;
  sub_name;
  validity;
}

export class examRes{
  client_id;
}