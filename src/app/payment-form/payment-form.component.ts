import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { RequestApi } from '../services/request.api';
import { Router } from "@angular/router";

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})

export class PaymentFormComponent implements OnInit {

  payment;
  payInsert;
  inv_id;
  loaderShow=false;
  email;

  constructor(
    private requestApi:RequestApi, private route: Router, public dialog : MatDialog,
    public dialogRef: MatDialogRef<PaymentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.payment = new PayModel;
    this.payInsert = new InsertModel;
  } 

  ngOnInit() {}

  onSave(){

    //showing loader
    this.loaderShow = true;

    this.payment.Description = this.data.Description;
    this.payment.Company = this.data.Company;
    this.payment.Address = this.data.Address;
    this.payment.InvoiceNumber = this.data.InvoiceNumber;     
    this.payment.amount = this.data.amount;
    this.email = this.data.email; 
    this.inv_id = this.data.inv_id;
    
    this.requestApi.Payment(this.payment)
    .subscribe(
      (data) =>{   

        if (data.status == 'success'){
          delete data['status'];

          this.payInsert = data;
          this.payInsert.inv_id = this.inv_id;
          this.payInsert.email = this.email; 

          this.insertPayment(this.payInsert);

        }else {
          //hiding loader
          this.loaderShow = false;

          this.PaymentFailedAlert(data.Error_Message);
        }
      },
      (error) =>{

        //hiding loader
         this.loaderShow = false;

        console.log('error doing payment', error);
      });
  
  }

  //if successfull inserting transaction details in database
  insertPayment(values){
    this.requestApi.insertPayment(values)
    .subscribe(
      (data) =>{   
        
        //hiding loader
        this.loaderShow = false;
        
        window.location.reload();
      },
      (error) =>{

        //hiding loader
        this.loaderShow = false;

        console.log('error inserting payment', error);
      }
    );
  }

  //cardNumber must be of number
  cardNumber() {
    if(this.payment.CardNumber != undefined){
      var str =  this.payment.CardNumber.slice(-1); 
      var regex = /[0-9]|-/;
    
      if(!regex.test(str)) {
        this.payment.CardNumber =  this.payment.CardNumber.substring(0, this.payment.CardNumber.length-1)
      } 
    } 
  }

   //cvv must be of number only
   cvvValidationn(){
    if(this.payment.cvv != undefined){
      var str =  this.payment.cvv.slice(-1); 
      var regex = /[0-9]/;

      if(!regex.test(str)) {
        this.payment.cvv =  this.payment.cvv.substring(0, this.payment.cvv.length-1)
      } 
    }
    
  }

  //expiration date contanins either number or hyphen
  expiration_date(){
    if(this.payment.ExpirationDate != undefined){
      var str =  this.payment.ExpirationDate.slice(-1); 
      var regex = /-|[0-9]/;
      if(!regex.test(str)) {
        this.payment.ExpirationDate =  this.payment.ExpirationDate.substring(0, this.payment.ExpirationDate.length-1)
      } 
    }
  }

  //checking if number entered is only number or not
  numberCheck(){
    var regex = /^\d*$/;
    if(!regex.test(this.payment.CardNumber)) {
      this.payment.CardNumber = "";
    }

    if(!regex.test(this.payment.cvv)) {
      this.payment.cvv =  '';
    } 
  }

  //expiration date must be of format yyyy-mm
  DateCheck(){
    var regex = /^[0-9]{4}-[0-9]{2}$/;
    if(!regex.test(this.payment.ExpirationDate)) {
      this.payment.ExpirationDate =  '';
    } 
  }

  //alert method
  PaymentFailedAlert(val) {
    //closing payment form
    this.dialogRef.close(PaymentFormComponent);

    //opening alert
    const dialogRef = this.dialog.open(PaymentAertDialog, {
      data: { message : val},
      height: '185px',
      width: '440px'
    });

    dialogRef.afterClosed().subscribe(result => {
      //redireting to invoice page
      this.route.navigate(['invoice']);
    });
  }

}

export class PayModel{
  CardNumber;
  ExpirationDate;
  cvv;
  FirstName;
  LastName;
  City;
  State;
  Country;
  Zip;
  amount;
  InvoiceNumber;
  Description;
  Company;
  Address;
}

export class InsertModel{
  transaction_id;
  response_code;
  message;
  auth_code; 
  description;
  inv_id;
  email;
}

@Component({
  selector: 'payment-alert',
  templateUrl: 'payment-alert.html',
  styleUrls:['../rule-options/alert.css']
})
export class PaymentAertDialog {

  constructor(
    public dialogRef: MatDialogRef<PaymentAertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }   
}