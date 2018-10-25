import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceModel } from './invoive.model';
import { RequestApi } from '../services/request.api';

@Component({
  selector: 'app-addinvoice',
  templateUrl: './addinvoice.component.html',
  styleUrls: ['./addinvoice.component.css']
})

export class AddinvoiceComponent implements OnInit {
  
  client;
  AdminStatus;
  ID;
  discount;
  bulk_discount;
  onlyID;
  SubID;
  subscriptions;
  SubIDRes;

  cardBlur;
  loaderShow:boolean = true;
  
  public invoice:any;
  formError: boolean = false;
  formSuccess: boolean = false;
  formMessage: string;

  constructor(private requestApi: RequestApi, private route: Router) {
    this.invoice = new InvoiceModel;
    this.onlyID = new ClientModel;
    this.SubID = new SubModel;
    this.SubIDRes = new SubModel;  
  }

  

  ngOnInit() {

    //setting default value for dropdowns 
    this.invoice.client_id = '';
    this.invoice.sub_id = '';

    //getting client and subscription details 
    this.clientName();
    this.SubName();

    this.AdminStatus = localStorage.getItem('status').replace(/['"]+/g, '');
    this.ID = localStorage.getItem('created_by').replace(/['"]+/g, '');


    //setting invouce number
    this.getinvoicenumber();

    //getting client details if admin's client logins
    if(this.AdminStatus == "1"){

      this.invoice.client_id = this.ID;
      this.clientDetails(this.ID);
    }
     
  }

  getinvoicenumber(){
    this.requestApi.getInvoiceNumber()
      .subscribe(
        (response) =>{ 

          

          var date = new Date();
          var str = date.getFullYear() + "-" + (date.getMonth() + 1);
        
          var input = response.inv_id ;

          //increasing number by one
          ++input;

          this.invoice.inv_no = 'INV/' + str + '/' + input;
          
        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;
           console.log('error getting clients', error);
        }
      );  
  }

  clientName(){
    this.requestApi.getClients()
      .subscribe(
        (response) =>{   
          //hiding loader
          this.loaderShow = false;

          this.client = response.clients;
        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;

          console.log('error getting clients', error);
        }
      );
  }

  SubName(){
    this.requestApi.getAllSubcriptions() 
    .subscribe(
      (response) =>{            
         
        this.subscriptions = response.subscriptions;
      },
      (error) =>{
         //hiding loader
         this.loaderShow = false;

        console.log('error getting subscription', error);
      }
    );
  }

  clientDetails(id){
    this.onlyID.client_id = id;

    
    this.requestApi.viewClient(this.onlyID)
      .subscribe(
        (response) =>{       
          
          var details = response.data;
          this.invoice.address = details.address;
          this.invoice.email = details.email;
          this.invoice.phone_no = details.phone_number;


        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;

          console.log('error getting client details', error);
        }
      );
  }

  SubscriptionDetails(id) {

    this.gettingDate();
    
    this.SubID.sub_id = this.invoice.sub_id;

    this.requestApi.viewSubscriptions(this.SubID)
     .subscribe(
       (response) =>{      


         this.SubIDRes = response; 
         this.invoice.devices =  this.SubIDRes.devices;
         this.invoice.sub_name =  this.SubIDRes.sub_name;
         this.invoice.validity =  this.SubIDRes.validity;
         this.invoice.actual_amount =  this.SubIDRes.sub_cost;

         this.discountedAmount();
       },
       (error) =>{
          //hiding loader
          this.loaderShow = false;

          console.log('error getting subscription details', error);
       }
     );
 }

  goBack(): void {
    this.route.navigate(['invoice']);
  }

  discountedAmount(){
    if(this.bulk_discount){  
      this.invoice.discount = ((this.bulk_discount*this.invoice.actual_amount)/100);
      let newAmount = (this.invoice.actual_amount - this.invoice.discount);
      this.invoice.payable_amount = newAmount;
    }
  }

  CrdBlur(){
    if(this.loaderShow){
      this.cardBlur = { "blur" : true }
    }else{
      this.cardBlur = { "blur" : false }
    }
    return this.cardBlur;
  }

  gettingDate(){
    var datetoday = new Date();
    var mm = datetoday.getMonth() + 1;
    var dd = datetoday.getDate();
    var yy = datetoday.getFullYear();
    this.invoice.dated  = dd+ '-' +mm+ '-'+yy; 
  }

  

  onSave() {

    //showing loader
    this.loaderShow = true;

    if(this.AdminStatus == "1"){
      this.invoice.client_id = this.ID;
    }

    this.invoice.created_by = this.ID;

    //getting date
    this.gettingDate();

    this.requestApi.insertInvoices(this.invoice)
      .subscribe(
      (response) => {
        if (!response.errorMessage) {
          this.formSuccess = true;
          this.formError = false;
          this.formMessage = response.successMessage;

          setTimeout(() => {
            this.route.navigate(['invoice']);
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
  
}

export class ClientModel{
  client_id;
}

export class SubModel{
  sub_id;
  sub_name;
  devices;
  validity;
}