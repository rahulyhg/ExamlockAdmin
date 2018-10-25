import { Component, OnInit, Input } from '@angular/core';
import {  ActivatedRoute,Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Location } from '@angular/common';
import { RequestApi } from '../services/request.api';
import 'rxjs/add/operator/filter';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { TestUrlComponent } from '../alert/alert.component';

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.html',
  styleUrls: ['./exam-view.component.css']
})
export class ExamViewComponent implements OnInit {


  onlyExam;
  onlyID ;
  onlyClient;
  Exam;
  onlyClientID;
  cardBlur;
  loaderShow:boolean = true;

  Payment_status;
  limit_without_payment = 5; //user can use maximum this times without payment
  limit_reached = false;
  AdminStatus;clientLogin;
  newInvID;
  invoiceData;
  total_limit;
  available_limit;
  show_renew = false;
  Renew_limit = 3; //show renew if minimum renew_limit is left in available limit
  invoice;
  loginId;
  bulk_discount;
  created_invoiceID;
  renewStatus;
  all_invoices;

  //rule variables
  rule_ID;
  rule;
  rule_name;
  books;
  ctrl;
  app;
  portt;

  //subscription variable
  sub_id;
  subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestApi: RequestApi,
    private location: Location,
    public dialog:MatDialog
  ) {
    this.onlyID = new data;
    this.Exam = new Modelstr;
    this.onlyClientID = new client;
    this.rule_ID = new RuleIDModel;
    this.sub_id = new SubIdModel;
    this.subscription = new subIDRES;
    this.newInvID = new newInvModel;
    this.invoiceData = new invoiceDataModel;
    this.invoice = new InvoiceModel;
    this.created_invoiceID = new renewModel;
  }

  ngOnInit(): void {

    this.AdminStatus = localStorage.getItem('status').replace(/['"]+/g, '');
    this.loginId = localStorage.getItem('created_by').replace(/['"]+/g, '');

    this.invoice.created_by = this.loginId;

    if(this.AdminStatus == '1'){
      this.clientLogin = true;
    }

    this.viewExam();
  }

  viewExam() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.onlyID.exam_id = id;
    this.requestApi.viewExam(this.onlyID)
      .subscribe(
        (response) =>{     
          
          this.onlyExam = response;   
          let clientID= this.onlyExam[0].client_id;
          let RuleId = this.onlyExam[0].rule_id;
          let SubId = this.onlyExam[0].subs_id;

          this.all_invoices =  this.onlyExam[0].all_invoices;


          this.bulk_discount = this.onlyExam[0].bulk_discount;
         
          this.Payment_status = this.onlyExam[0].pay_status;
          this.total_limit = this.onlyExam[0].total_limit;
          this.available_limit = this.onlyExam[0].available_limit;

          this.renewStatus = this.onlyExam[0].renew_status;

          //show renew button if true
          if(this.available_limit <= this.Renew_limit){
            this.show_renew = true;
          }


          let limit = this.total_limit - this.available_limit;
          if(limit >= this.limit_without_payment){
            this.limit_reached = true;
          }

          this.invoice.exam_id = this.onlyExam[0].exam_id;

          this.created_invoiceID.exam_id =  this.onlyExam[0].exam_id;
          this.created_invoiceID.exam_name =  this.onlyExam[0].exam_name;
          
          this.clientName(clientID);
          this.RuleName(RuleId);
         
          this.SubscriptionName(SubId);
          
        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;

          console.log('error viewing exam', error);
        }
      );
  }
  
  clientName(id){
    this.onlyClientID.client_id = id;
      this.requestApi.viewClient(this.onlyClientID)
        .subscribe(
          (response) =>{     
            this.onlyClient = response.data; 
            this.onlyExam[0].client_name = this.onlyClient.username; 
            
            this.invoiceData.Company = response.data.comp_name;
            this.invoiceData.Address = response.data.address;
            this.invoiceData.email = response.data.email; 

            this.invoice.address =  response.data.address;
            this.invoice.phone_no =  response.data.phone_number;
            this.invoice.client_id =  response.data.id;
            this.invoice.email =  response.data.email;
            
          },
          (error) =>{
            //hiding loader
            this.loaderShow = false;

            console.log('error viewing Client', error);
          }
        );
  }

  SubscriptionName(id){
    this.sub_id.sub_id = id;
    this.requestApi.viewSubscriptions(this.sub_id)
    .subscribe(
      (response) =>{   
        //hiding loader
        this.loaderShow = false;

        this.invoiceData.Description = response.sub_name;

        this.invoice.sub_name =  response.sub_name;
        this.invoice.devices =  response.devices;
        this.invoice.validity =  response.validity;
        this.invoice.sub_id =  response.sub_id;
        this.invoice.actual_amount =  response.sub_cost;

        this.subscription = response;   
      },
      (error) =>{
        //hiding loader
        this.loaderShow = false;

        console.log('error viewing subscription', error);
      }
    );
  }
 
  RuleName(id){
    this.rule_ID.rule_id = id;
   
    this.requestApi.viewRuleCatById(this.rule_ID)
      .subscribe((response) =>{         
        this.rule = response.Restrictions;
        this.rule_name = response.rule_name;
        this.ctrl = this.rule.CONTROL;
        this.books = this.rule.BOOKMARKS;
        this.app = this.rule.APPLICATION;
        this.portt = this.rule.PORT;


      },
        
      (error) =>{
        //hiding loader
        this.loaderShow = false;
        
          console.log('error viewing rule', error);
        }
      );
  }

  goBack(): void {
    this.router.navigate(['exam']);
  }

  detailsRedirect(id){
    const RedirectID = this.onlyExam[0].access_token;    
    this.requestApi.filtervalue(RedirectID);
    this.router.navigate(['access_log']);
  }

  CrdBlur(){
    if(this.loaderShow){
      this.cardBlur = { "blur" : true }
    }else{
      this.cardBlur = { "blur" : false }
    }
    return this.cardBlur;
  }

  getoneinvoice(inv_id){
    this.requestApi.getoneInvloice(inv_id)
    .subscribe(
      (data) =>{  

        data = data.invoices;

        this.invoiceData.InvoiceNumber = data.inv_no;     
        this.invoiceData.amount = data.payable_amount;
        this.invoiceData.inv_id = data.inv_id; 

      },
      (error) =>{
        //hiding loader
        this.loaderShow = false;

        console.log('error invoices', error);
      }
    );
  }

  GoToInvoices(){
    this.router.navigate(['invoice']);
  }
  
  PaymentNow(id,comingFrom){

    //showing loader
    this.loaderShow = true;
    
    this.newInvID.inv_id = id;
  
    //getting required fields from invoices,client & subscripiton database
    this.getoneinvoice(this.newInvID);
  
    let dialogRef = this.dialog.open(PaymentFormComponent, {
              height: '480px',
              width: '700px',
            data: this.invoiceData
      });
      
      dialogRef.afterClosed().subscribe(result => {
        //hiding loader
        this.loaderShow = false;

        if (comingFrom =='editExam'){
          this.paymentCloseRenew();
        }
      });
      
  }

  paymentCloseRenew(){
    
    const dialogRef = this.dialog.open(TestUrlComponent, {
      height: '170px',
      width: '480px',
      data: {name: "ClosedRenew"}
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }

  //opening alert dialog
  RenewNow(valueID){
    this.viewExam();
   
    this.discountedAmount();
    
    //setting invouce number
    this.getinvoicenumber()
    
    const dialogRef = this.dialog.open(TestUrlComponent, {
      height: '170px',
      width: '480px',
      data: {name: "renew"}
    });

    dialogRef.afterClosed().subscribe(result => {
      
      
      if(result){

        //showing loader
        this.loaderShow = true;

        //generating invoice
        this.insertInvoice();
        

      }  
    });

  }

  insertInvoice(){
    this.requestApi.insertInvoices(this.invoice)
      .subscribe((response) => {

        this.created_invoiceID.renew_status = '1';
        this.created_invoiceID.pay_status = '0';
        this.created_invoiceID.inv_id =  response.inv_id;

        if(this.all_invoices == null){
          this.created_invoiceID.all_invoices = response.inv_id;
        }else {
          this.created_invoiceID.all_invoices = this.all_invoices+', '+response.inv_id;
        }

        //updating renew id in exams
        this.editExam(this.created_invoiceID);

     },
      (error) => {
        //hiding loader
        this.loaderShow = false;
        
        console.log("Server return error. Please try again");
      });
  }

  editExam(id){
    this.requestApi.editexam(id)
    .subscribe(
    (response) => {
      //hiding loader
      this.loaderShow = false;

      this.PaymentNow(this.created_invoiceID.inv_id,'editExam');
      
    },
    (error) => {
      //hiding loader
      this.loaderShow = false;
      
      console.log("server return error. Please try again");
    });
  }

  discountedAmount(){
    if(this.bulk_discount){
    
      this.invoice.discount = ((this.bulk_discount*this.invoice.actual_amount)/100);
      let newAmount = (this.invoice.actual_amount - this.invoice.discount);
      this.invoice.payable_amount = newAmount;
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

}

export class data{
  public exam_id: number ;
} 

export class Modelstr{
  client_name: string;
  exam_name: string;
  exam_desc: string;
  exam_created;
  billing_cycle: string;
}

export class client{
  client_id;
}

export class RuleIDModel{
  rule_id:number;
}

export class SubIdModel{
  sub_id: number;
}

export class subIDRES{
  devices;
}
export class newInvModel{
  inv_id;
}

export class invoiceDataModel{
  amount;
  InvoiceNumber;
  Description;
  Company;
  Address;
  inv_id;
}

export class InvoiceModel {
  exam_id;
  discount;
  
  inv_no:any;

  address;
  phone_no;
  client_id:number;
  email;

  sub_name;
  devices;
  validity;
  sub_id;
  payable_amount:number;
  actual_amount:number;

  created_by;
}

export class renewModel{
  renew_status;
  exam_id;
  exam_name;
  inv_id;
  pay_status;
  all_invoices;
}