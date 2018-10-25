import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import {Router } from "@angular/router";
import { RequestApi } from '../services/request.api';
import { saveAs } from 'file-saver';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { PaymentFormComponent } from '../payment-form/payment-form.component';
import { Element } from '../client/client.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  user: string;
  del ;
  invoiceName: string;
  date;
  SearchInput;
  searchRes;
  cardBlur;
  loaderShow:boolean = true;
  AdminStatus;
  client_id;
  API_status;
  pdfSrc;
  pdfURL;
  downloadID;
  displayedColumns;
  dataSource;
  URLpdf;

  newInvID;
  invoiceData;
  onlyClientID;
  sub_id;
  invoice;
  exam;

  constructor( private router: Router, private requestApi:RequestApi, private sanitizer:DomSanitizer,
    public dialog:MatDialog) {

    this.del = new DEL;
    this.downloadID = new DEL;
    this.client_id = new clientModel;
    this.newInvID = new DEL;
    this.invoiceData = new Element;
    this.onlyClientID = new clientModel;
    this.sub_id = new subModel;
    this.exam = new examModel;
    this.invoice = new INVmodel;
  }

  ngOnInit() {

    //displaying columns on the table    
    this.displayedColumns = ['position', 'inv_no', 'inv_date', 'exam', 'payable_amount', 'status',  'action'];

    this.AdminStatus = localStorage.getItem('status');
    var ID = localStorage.getItem('created_by').replace(/['"]+/g, '');

    if(this.AdminStatus == '"1"'){

      //displaying columns on the table    
      this.displayedColumns = ['position', 'inv_no', 'inv_date', 'exam', 'payable_amount', 'status',  'action', 'Pay'];
    
      this.client_id.client_id= ID;
     
      //if admin's client logins
      this.getInvloicebyClient();

    }else{
    
      //if admin logins
      this.viewallinvoices();
    }

     
  }


  //function called if admin logins
  viewallinvoices(){
    this.requestApi.getinvoices()
    .subscribe(
      (data) =>{       
          
        this.API_status = data.status;

        data = data.invoices;

        this.invoice = data;

          //adding 7 days to invoice created date in api response data
          for(let i in this.invoice){
            var date = new Date(this.invoice[i].inv_date);
            date.setDate(date.getDate() + 7);
            this.invoice[i].inv_date = date.getDate()+'-'+ (date.getMonth()+1) +'-'+date.getFullYear();

            //changing blob to url to view pdf in json itself
            var sourcePDFview = this.base64ToArrayBuffer(this.invoice[i].pdf);
            var mediaTypeview = 'application/pdf';
            var blobview = new Blob([sourcePDFview], {type: mediaTypeview});
 
            this.invoice[i].pdf = URL.createObjectURL(blobview);
            this.invoice[i].pdf = this.sanitizer.bypassSecurityTrustUrl(this.invoice[i].pdf);

            this.viewExam(this.invoice[i].exam_id, i)

          }

            //hiding loader
            this.loaderShow = false;

            this.dataSource = new MatTableDataSource(this.invoice);          
            setTimeout(() => this.dataSource.paginator = this.paginator);

      },
      (error) =>{
        //hiding loader
        this.loaderShow = false;

        console.log('error invoices', error);
      }
    );
  }

  //function called if admin's client logins
  getInvloicebyClient(){ 
    this.requestApi.getInvloicebyClient(this.client_id)
    .subscribe(
      (data) =>{            
          this.API_status = data.status;
          
          if(this.API_status == "success"){
            this.invoice = data.invoices; 

            for(let i in this.invoice){
              var date = new Date(this.invoice[i].inv_date);
              date.setDate(date.getDate() + 7);
              this.invoice[i].inv_date = date.getDate()+'-'+ (date.getMonth()+1) +'-'+date.getFullYear();
  
              //changing blob to url to view pdf in json itself
              var sourcePDFview = this.base64ToArrayBuffer(this.invoice[i].pdf);
              var mediaTypeview = 'application/pdf';
              var blobview = new Blob([sourcePDFview], {type: mediaTypeview});
   
              this.invoice[i].pdf = URL.createObjectURL(blobview);
              this.invoice[i].pdf = this.sanitizer.bypassSecurityTrustUrl(this.invoice[i].pdf);

              this.viewExam(this.invoice[i].exam_id, i)
  
            }

            //hiding loader
            this.loaderShow = false;

            this.dataSource = new MatTableDataSource(this.invoice);
            setTimeout(() => this.dataSource.paginator = this.paginator);
            
          }else{

            //hiding loader
            this.loaderShow = false;
          }
          
      },
      (error) =>{
        //hiding loader
        this.loaderShow = false;

        console.log('error invoices', error);
      }
    );

  }

  viewExam(onlyID, n) {
  
    if(onlyID == 0){
      this.invoice[n].exam_name = 'N/A' ;

    }else{

      this.exam.exam_id = onlyID;


      this.requestApi.viewExam(this.exam)
        .subscribe(
          (response) =>{     
            this.invoice[n].exam_name = response[0].exam_name;

          },
          (error) =>{
            //hiding loader
            this.loaderShow = false;

            console.log('error viewing exam', error);
        });
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

  applyFilter() {
    let filterValue = this.SearchInput;
    this.searchRes = filterValue;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  pdfViewer(){
    this.pdfSrc =  this.pdfURL;
  }

  deleteInvoice(id){

      this.del.inv_id = id;
      this.requestApi.deleteinvoice(this.del)
      .subscribe(
        (data) =>{            
            this.del = data;
            window.location.reload();
        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;
          
          console.log('error delete invoices', error);
        }
      );
    
  }



  downloadPdf(id){

    this.downloadID.inv_id = id;
    this.requestApi.downloadPDF(this.downloadID)
    .subscribe(
      (data) =>{

        // converting to blob by base 64 decoding   
        var sourcePDF = this.base64ToArrayBuffer(data.data);

        var mediaType = 'application/pdf';
        var blob = new Blob([sourcePDF], {type: mediaType});
        var filename = data.inv_no + '-inovice.pdf'; //defining name of the file

        saveAs(blob, filename);  //downloading the file
      },
      (error) =>{
        console.log('error getting PDF', error);
      }
    );
  }

 base64ToArrayBuffer(data) {
    var binaryString = window.atob(data);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);

    for (var i = 0; i < binaryLen; i++) {
      var ascii = binaryString.charCodeAt(i);
      bytes[i] = ascii;
    }
    return bytes;
};

openDialogue(id){

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
    
}

  getoneinvoice(inv_id){
    this.requestApi.getoneInvloice(inv_id)
    .subscribe(
      (data) =>{  

        data = data.invoices;

        this.invoiceData.InvoiceNumber = data.inv_no;     
        this.invoiceData.amount = data.payable_amount;
        this.invoiceData.inv_id = data.inv_id;
        this.invoiceData.pdf = data.pdf; 
        
        var client_ID = data.client_id;
        var sub_id = data.sub_id;

        this.viewclient(client_ID);
        this.SubscriptionName(sub_id);
      },
      (error) =>{
        //hiding loader
        this.loaderShow = false;

        console.log('error invoices', error);
      }
    );
  }

  viewclient(id){
    
    this.onlyClientID.client_id = id;
      this.requestApi.viewClient(this.onlyClientID)
        .subscribe(
          (response) =>{     
            
            this.invoiceData.Company = response.data.comp_name;
            this.invoiceData.Address = response.data.address;
            this.invoiceData.email = response.data.email;
          },
          (error) =>{
            //hiding loader
            this.loaderShow = false;

            console.log('error viewing Client', error);
          });
      
  }

  SubscriptionName(id){
    this.sub_id.sub_id = id;
    this.requestApi.viewSubscriptions(this.sub_id)
    .subscribe(
      (response) =>{   
        //hiding loader
        this.loaderShow = false;

        this.invoiceData.Description = response.sub_name;
      },
      (error) =>{
        //hiding loader
        this.loaderShow = false;

        console.log('error viewing subscription', error);
      }
    );
  }

  newinvoice(){
    this.router.navigate(["newinvoice"]);
  }
}

export interface Element {
  amount;
  InvoiceNumber;
  Description;
  Company;
  Address;
  inv_id;
  email;
}


export class DEL{
  public inv_id:number;
}

export class clientModel{
  client_id;
}

export class subModel{
  sub_id;
}

export class examModel{
  exam_id;
}

export class INVmodel{
  exam_id;
}