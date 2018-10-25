import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from "@angular/router";
import { RequestApi } from '../services/request.api';
import { ExamModel } from './addexam.model';
import { TestUrlComponent } from '../alert/alert.component';

@Component({
  selector: 'app-add-exam',
  templateUrl: './add-exam.component.html',
  styleUrls: ['./add-exam.component.css'],
})

export class AddExamComponent implements OnInit {

  @Input() sidemenuActive: any;

  client;
  rules;
  subscriptions;
  public exam;
  formError: boolean = false; 
  formSuccess: boolean = false;
  formMessage: string;
  created_by:any;
  response :any;
  amount ;
  token:any;
  rule_value;
  SubID;
  subDetails;
  SubIDRes;
  pre;
  ClientID;
  ClientIdRes;
  invoice;
  invoiceValue;
  actual_amount;
  payable_amount;
  discount;
  uid;
  AddExamClient;
  defaultClientID; defaultRule; defaultSubID; defaultBilling_cycle;

  CUSTOM;
  NON_CUSTOM;
  customValues;

  cardBlur;
  loaderShow:boolean = true;
  loaderShow2nd:boolean;

  AdminStatus;
  ID;

  validity = ['30 days', '90 days', '180 days', '360 days'];

  constructor(private requestApi: RequestApi, private route: Router, public dialog: MatDialog,) {
    this.exam = new ExamModel;
    this.SubID = new SubscModel;
    this.SubIDRes = new subResultModel;
    this.ClientID = new ClientModel;
    this.ClientIdRes = new ClientResModel;
    this.invoice = new invoiceModel;
    this.customValues = new customValuesModel;
  }

  ngOnInit() {

    this.exam.test_url = 'https://examroom.ai/candidate/';

    this.AdminStatus = localStorage.getItem('status').replace(/['"]+/g, '');
    this.ID = localStorage.getItem('created_by').replace(/['"]+/g, '');

    //setting invouce number
    this.getinvoicenumber();
    
    //getting client details if admin's client logins
    if(this.AdminStatus == "1"){

      this.invoice.client_id = this.ID;
      this.clientDetails(this.ID);
    }    

    //initiaitng dropdown values
    this.defaultClientID= "";
    this.defaultRule = "";
    this.defaultSubID="";
    this.defaultBilling_cycle="";

    this.exam.rule_id = "";
    this.exam.client_id="";
    this.exam.billing_cycle = '';
    this.exam.subs_id='';

    this.customValues.cus_validity = '';

    this.created_by = localStorage.getItem("created_by").replace(/['"]+/g, '');
  
    if(this.AdminStatus == "1"){
      this.exam.client_id = this.ID;
    }


    this.requestApi.currentId.subscribe(id => this.uid = id);
    
    if(this.uid != 'none'){
      this.exam.client_id = this.uid;
      
      //reseting value in requestAPI
      this.requestApi.client_id_addExam("none");
    }
    
    
    this.clientName();
    this.RuleName();
    this.SubName();
  }

  Billing_cycles = [
    "Daily", "Weekly", "Fortnightly", "Monthly", "Yearly"
  ];

  clientName(){
    this.requestApi.getClients()
      .subscribe(
        (response) =>{        
            this.client = response.clients;
        },
        (error) =>{
           //hiding loader
           this.loaderShow = false;

          console.log('error getting clients', error);
        }
      );
  }

  RuleName(){
    this.requestApi.getAllRules()
      .subscribe(
        (response) =>{   
          this.rules = response.rules;   
        },
        (error) =>{
           //hiding loader
           this.loaderShow = false;

          console.log('error getting rules', error);
        }
      );
  }

  SubName(){
    this.requestApi.getAllSubcriptions() 
    .subscribe(
      (response) =>{            
         //hiding loader
         this.loaderShow = false;
         
          this.subscriptions = response.subscriptions;
      },
      (error) =>{
         //hiding loader
         this.loaderShow = false;

        console.log('error getting subscription', error);
      }
    );
  }

  viewSubscription(event) {

    console.log(this.exam.subs_id);

    this.gettingDate();

    if(this.exam.subs_id == 0){
      this.CUSTOM = true;
      this.NON_CUSTOM = false;
      
    }else{

      this.NON_CUSTOM = true;
      this.CUSTOM = false;
   

    this.SubID.sub_id = event.target.value;
    this.requestApi.viewSubscriptions(this.SubID)
      .subscribe(
        (response) =>{      
           //hiding loader
           this.loaderShow = false;

          this.SubIDRes = response;   

          //getting discount and payable amount
          if(this.exam.bulk_discount){
            this.discountedAmount(this.exam.bulk_discount);
          }

          this.exam.available_limit = this.SubIDRes.devices;
          this.exam.total_limit = this.SubIDRes.devices;

         this.invoice.devices =  this.SubIDRes.devices;
         this.invoice.sub_name =  this.SubIDRes.sub_name;
         this.invoice.sub_id =  this.SubIDRes.sub_id;
         this.invoice.validity =  this.SubIDRes.validity;
         this.invoice.actual_amount =  this.SubIDRes.sub_cost;
         this.exam.custom_plan = 0;

        },
        (error) =>{
           //hiding loader
           this.loaderShow = false;

          console.log('error viewing subscription', error);
        }
      );
    }
  }

  discountedAmount(value){
    
    this.invoice.discount = ((value*this.invoice.actual_amount)/100);
    let newAmount = (this.invoice.actual_amount - this.invoice.discount);
    this.exam.amount = newAmount;
  }

  CrdBlur(){
    if(this.loaderShow){
      this.cardBlur = { "blur" : true }
    }else{
      this.cardBlur = { "blur" : false }
    }
    return this.cardBlur;
  }


  generate_token(length){

    if(this.exam.rule_id){

      // generating token
      var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
      var b = [];  
      for (var i=0; i<length; i++) {
          var j = (Math.random() * (a.length-1)).toFixed(0);
          b[i] = a[j];
      }
      this.token = b.join("");

      this.clientDetails(this.exam.client_id);
    }   
  }

  clientDetails(id){

   this.ClientID.client_id = id;
    this.requestApi.viewClient(this.ClientID)
    .subscribe(
      (response) =>{       
        //hiding loader
        this.loaderShow = false;

        this.ClientIdRes = response.data;

        //final prefix
        this.pre = response.data.prefix;
        
        this.invoice.address = this.ClientIdRes.address;
        this.invoice.email = this.ClientIdRes.email;
        this.invoice.phone_no = this.ClientIdRes.phone_number;

        // defining token
        this.exam.access_token =  this.pre + this.token;
          
      },
      (error) =>{
        //hiding loader
        this.loaderShow = false;

        console.log('error viewing Client', error);
      });
  }

  onSave() {

    if(this.exam.subs_id == 0){

      console.log(this.customValues.cus_cost);
      console.log(this.customValues.cus_devices);

      this.exam.bulk_discount = 0;
      this.exam.amount = this.customValues.cus_cost;
      this.exam.custom_plan = 1;

      console.log(this.customValues.cus_devices);

      //getting discount and payable amount
      if(this.exam.bulk_discount){
        this.discountedAmount(this.exam.bulk_discount);
      }

      this.exam.available_limit = this.customValues.cus_devices;
      this.exam.total_limit = this.customValues.cus_devices;

      this.invoice.devices =  this.customValues.cus_devices;
      this.invoice.sub_name =  'Custom Plan';
      this.invoice.sub_id =  0;
      this.invoice.validity =  this.customValues.cus_validity;
      this.invoice.actual_amount =  this.customValues.cus_cost;

    }

   console.log( this.customValues);
   console.log( this.exam);

    //showing loader
    this.loaderShow2nd = true;
    
    if(this.AdminStatus == "1"){
      this.exam.client_id = this.ID;
    }

   this.invoiceValue = this.exam;
   this.payable_amount = this.invoiceValue.amount;

    delete this.exam['amount'];
    this.exam.created_by = this.created_by;
    this.exam.inv_id = '0';
    this.exam.billing_cycle = "Monthly";

    this.insertExam();
    
  }

  insertExam(){

    this.requestApi.addExam(this.exam)
      .subscribe(
      (response) => {

        if (response.errorMessage){

          

          this.formError = true;
          this.formSuccess = false;
          this.formMessage = response.errorMessage;

          //hiding loader
          this.loaderShow = false;

        }else{
          this.formSuccess = true;
          this.formError = false;
          this.formMessage = response.msg;

          this.invoice.exam_id = response.exam_id;
          this.exam.exam_id = response.exam_id;

          //generating invoice
          this.insertinvoice();
        }
      },
      (error) => {
        //hiding loader
        this.loaderShow = false;

        this.formError = true;
        this.formMessage = "server return error. Please try again";
      });

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


  gettingDate(){
    var datetoday = new Date();
    var mm = datetoday.getMonth() + 1;
    var dd = datetoday.getDate();
    var yy = datetoday.getFullYear();
    this.invoice.dated = dd+ '-' +mm+ '-'+yy;
  }

  insertinvoice(){
    this.invoice.client_id = this.invoiceValue.client_id;
    this.invoice.payable_amount = this.payable_amount ;
    this.invoice.created_by = this.ID;

    //getting date
    this.gettingDate();

    this.requestApi.insertInvoices(this.invoice)
    .subscribe(
    (response) => {
      if (!response.errorMessage) {
        
        this.formSuccess = true;
        this.formError = false;
        this.formMessage = response.msg;

        this.exam.inv_id = response.inv_id;

        this.editExam( this.exam);
        
       
      } else {
        

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

  
  editExam(id){
    this.requestApi.editexam(id)
    .subscribe(
    (response) => {
     
      //hiding loader
      this.loaderShow = false;

      setTimeout(() => {
        this.route.navigate(['exam']);
      }, 1500);
      
    },
    (error) => {
      //hiding loader
      this.loaderShow = false;
      
      console.log("server return error. Please try again");
    });
  }


  openDialog() {
    const dialogRef = this.dialog.open(TestUrlComponent, {
      height: '170px',
      width: '480px',
      data: {name: "TestUrl"}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.onSave();
      }
      
    });
  }

  allExams(){
    this.route.navigate(['exam']);
  }
  
}

export class SubscModel{
  public sub_id: number ;
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
}

export class ClientModel{
  client_id;
}

export class ClientResModel{
  id;
  prefix;
}

export class invoiceModel{
  public inv_no:any;
  public client_id:number;
  public payable_amount:number;
  public actual_amount:number;
  address;
  phone_no;
  email;
  sub_name;
  discount;
  devices;
  validity;
  sub_id;
  dated;
  exam_id;
}

export class customValuesModel{
  cus_devices;
  cus_validity;
  cus_cost;
}

//{"exam_name":"get Exam","client_id":"52","exam_desc":"exam desc","rule_id":"51","subs_id":"0","created_by":"32","billing_cycle":"Monthly","bulk_discount":0,"test_url":"https://testconsole.provexam.com/#/pages/testconsole","access_token":"hhhQuo5Ov","available_limit":400,"total_limit":400,"inv_id":"0"}: 