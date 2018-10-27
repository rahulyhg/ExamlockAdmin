import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute } from "@angular/router";
import { RequestApi } from '../services/request.api';

@Component({
  selector: 'app-access-log',
  templateUrl: './access-log.component.html',
  styleUrls: ['./access-log.component.css']
})
export class AccessLogComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  access_log;
  filterVa;
  result;
  totalVal = 0;
  blankVALU;
  SearchInput;
  searchRes;
  AdminStatus;
  loginID;
  loaderShow:boolean = true;
  ClientID;
  accessToken=[];
  arr;
  cardBlur;
  API_status;
  token;
  tokenPost;
  client_post;
  APIresponse;
  onlyClient

  constructor( private requestApi:RequestApi, public dialog: MatDialog ) { 
   
      this.result= new resultmodel;
      this.ClientID = new clientModel;
      this.arr = new tokenArray;
      this.tokenPost = new resultmodel;
      this.client_post = new client_model;
  }

  ngOnInit() {

    this.AdminStatus = localStorage.getItem('status').replace(/['"]+/g, '');
    this.loginID = localStorage.getItem('created_by').replace(/['"]+/g, '');

    //getting token  if redirected from exam-view
    this.requestApi.RedirectValue.subscribe(token => this.filterVa = token);

    if(this.AdminStatus == '1'){
      this.ClientID.client_id = this.loginID;
      this.getAccessTokens();

    }else{

    this.getAllLogs();

    }
  } 
    //getting all data for admin
  getAllLogs(){
      this.requestApi.viewAccessLog()
      .subscribe(
        (response) =>{  
          
          this.API_status = response.status;

          this.APIresponse = response.logs;

              //hiding loader
               this.loaderShow = false;

               for(let i in this.APIresponse){
                this.token = this.APIresponse[i].access_token;
  
                this.tokenPost.access_token = this.token;
                this.examByToken(this.tokenPost, i);
              }

              
               this.dataSource = new MatTableDataSource(this.APIresponse );

               setTimeout(() => this.dataSource.paginator = this.paginator);
      
            //for showing "no records" text
            this.result = response;

            
           

            //filter using token coming from exam view
            this.filterFromExam();
        },
        (error) =>{
     
          //hiding loader
          this.loaderShow = false;

          console.log('error getting clients', error);
        }
      );
    }

    clientName(id, n){
      this.client_post.client_id = id;
      this.requestApi.viewClient(this.client_post)
        .subscribe((response) =>{
          this.onlyClient = response.data;
          this.APIresponse[n].client_name = this.onlyClient.username;

          

        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;
          console.log('error viewing Client', error);
        }
      );
    }

    examByToken(id,n){
      this.requestApi.examByToken(id)
      .subscribe(
        (response) =>{
          // console.log(response);
          if(response.status == 'success'){
            this.APIresponse[n]["exam_name"] = response.result[0].exam_name;
            this.APIresponse[n]["client_name"] = response.result[0].client_id;
            
          }
          else{
            this.APIresponse[n]["exam_name"] = 'N/A';
            this.APIresponse[n]["client_name"] = 'N/A';
          }
          //object["property"] = value;

          
        },
        (error) =>{

          //hiding loader
          this.loaderShow = false;

          console.log('error getting exam name', error);
        });
    }

    //getting token of clients
    getAccessTokens(){
      this.requestApi.viewAccessLogbyClientID(this.ClientID)
      .subscribe(
        (response) =>{

          this.API_status = response.status;
          var token = response.exams;
          if(this.API_status == 'success'){
            for(let i in token){
              this.accessToken.push(token[i].access_token) ;
              this.arr.access_token =  this.accessToken;
              this.getclientlogs(this.arr);
            }
          }else{
            //hiding loader
            this.loaderShow = false;
            
          } 
        },
        (error) =>{

          //hiding loader
          this.loaderShow = false;

          console.log('error getting clients', error);
        }
      );
      
    }

    //getting data based on token of clients
    getclientlogs(token){
      this.requestApi.viewAccessLogbyToken(token)
      .subscribe(
        (response) =>{

          this.API_status = response.status;
          
            
            if(this.API_status == 'success'){
              this.dataSource = new MatTableDataSource(response.logs);
              setTimeout(() => this.dataSource.paginator = this.paginator);
              //for showing "no records" text if required
              this.result = response;
            }

              //hiding loader
              this.loaderShow = false;
          
          //filter using token coming from exam view
          this.filterFromExam();

        },
        (error) =>{

          //hiding loader
          this.loaderShow = false;

          console.log('error getting clients', error);
        }
      );
    }
    
    //filter using token coming from exam view
    filterFromExam(){

      //if filter is coming from client view through request.service 
      // by default value=none is set in request.service 
      if(this.filterVa != 'none' ){
        this.SearchInput = this.filterVa;
        this.applyFilter();

        for(let i in this.result.logs){
          if( this.result.logs[i].access_token == this.filterVa){
            this.totalVal = 1;
          }
        }
      }else{
       //if no filter key is coming from client view through request.service 

        this.totalVal = 1;
        this.dataSource.filter = this.blankVALU;
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


  displayedColumns = ['position',  'exam_name', 'candidateName', 'candidateID', 'date', 'access_token', 'machine_type', 'machine_name', 'timezone', 'action'];
  dataSource = new MatTableDataSource(this.access_log);

  //method to filter data 
  applyFilter() {
    let filterValue = this.SearchInput;
    this.searchRes = filterValue;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export class resultmodel{
  access_token;
}

export class clientModel{
  client_model;
}

export class tokenArray{
  access_token =[];
}

export class client_model{
  clien_id;
}


