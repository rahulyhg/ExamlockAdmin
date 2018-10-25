import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { Router } from "@angular/router";
import { RequestApi } from '../services/request.api';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  id ;
  onlyID;
  onlyClient;
  examm;
  clientID;
  rule_id;
  rule_name;
  del;
  SearchInput;
  searchRes;
  cardBlur;
  loaderShow:boolean = true;
  AdminStatus;
  loginId;
  API_status;
  displayedColumns;
  dataSource;
  
  constructor(private router: Router, private requestApi:RequestApi, public dialog: MatDialog) {
    this.onlyID = new loginModel;
    this.del = new dele;
    this.id = new loginModel;
    this.rule_id = new RuleModel;
  }

  ngOnInit() {

    this.AdminStatus = localStorage.getItem('status').replace(/['"]+/g, '');
    this.loginId = localStorage.getItem('created_by');

    if(this.AdminStatus == '1'){
      this.loginId = this.loginId.replace(/['"]+/g, '');
      this.id.client_id = this.loginId;

      //defining columns to be visible in table //'billing_cycle',
      this.displayedColumns = [ 'position', 'exam_name', 'exam_desc', 'rule_id' , 'access_token',  'action'];

    }else {
      this.id="";

      //defining columns to be visible in table
      this.displayedColumns = [ 'position', 'exam_name', 'client_id', 'exam_desc', 'rule_id' , 'access_token', 'action'];

    }

    this.requestApi.getExams(this.id)
      .subscribe((response) =>{
        
        this.API_status = response.status;

        if(this.AdminStatus == '1'){
          if (response.status == "failed"){
            this.examm = response;

            //hiding loader
            this.loaderShow = false;

          }else{
            console.log('success');
            this.examm = response.exams;
            this.loopForNames();

            //hiding loader
            this.loaderShow = false;

            this.dataSource = new MatTableDataSource(response.exams);
            setTimeout(() => this.dataSource.paginator = this.paginator);
          }

        }else{

          this.examm = response.exams;
          this.loopForNames();

          //hiding loader
          this.loaderShow = false;

          this.dataSource = new MatTableDataSource(response.exams);
          setTimeout(() => this.dataSource.paginator = this.paginator);
        }  
      },
      (error) =>{
        //hiding loader
        this.loaderShow = false;

        console.log('error getting all exams', error);
      }
    );
  }

  CrdBlur(){
    if(this.loaderShow){
      this.cardBlur = { "blur" : true }
    }else{
      this.cardBlur = { "blur" : false }
    }
    return this.cardBlur;
  }

  loopForNames(){
    for(let i in this.examm){

      //for client name
      this.clientID = this.examm[i].client_id;
      this.clientName(this.clientID , i);

      //for for rule name
      this.rule_id.rule_id = this.examm[i].rule_id;
      this.RuleName(this.rule_id,i)
    }
  }

  clientName(id, n){
    this.onlyID.client_id = id;
    this.requestApi.viewClient(this.onlyID)
      .subscribe((response) =>{
        this.onlyClient = response.data;
        this.examm[n].client_name = this.onlyClient.username;
      },
      (error) =>{
        //hiding loader
        this.loaderShow = false;
        console.log('error viewing Client', error);
      }
    );
  }

  RuleName(id,n){


    this.requestApi.getRuleById(id)
    .subscribe((response) =>{

      this.rule_name = response[0].rule_name;

      this.examm[n].rule_name = this.rule_name;

    },
    (error) =>{
      //hiding loader
      this.loaderShow = false;
        console.log('error getting rules', error);
      }
    );
  }

  openDialog(id) {
    const dialogRef = this.dialog.open(AlertComponent, {
      height: '170px',
      width: '370px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteExam(id);
      }
    });
  }

  deleteExam(id){
    this.del.exam_id = id;
    this.requestApi.deleteExam(this.del)
    .subscribe(
      (data) =>{
          this.del = data;
          window.location.reload();
      },
      (error) =>{
        //hiding loader
        this.loaderShow = false;
        
        console.log('error delete exam', error);
      }
    );
  }

  newexam(){
    this.router.navigate(['/newexam']);
  }

  applyFilter() {
    let filterValue = this.SearchInput;
    this.searchRes = filterValue;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
}

export interface Element {
  exam_id: string;
  client_id: string;
  exam_name: string;
  exam_desc: string;
  rule_id: string;
  admin_id:string;
}


export class dele{
  exam_id;
}

export class loginModel{
  client_id;
}

export class RuleModel{
  rule_id;
}