import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { Router } from "@angular/router";
import { RequestApi } from '../services/request.api';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  del:any;
  subs : any;
  deleteitem;
  SearchInput;
  searchRes;
  cardBlur;
  loaderShow:boolean = true;
  API_status
  dataSource;
  AdminStatus;
  loginId;

  constructor(private router: Router, private requestApi:RequestApi, public dialog: MatDialog) { 
    this.del = new subClass;
  }

  ngOnInit() {

    this.AdminStatus = localStorage.getItem('status').replace(/['"]+/g, '');
    this.loginId = localStorage.getItem('created_by').replace(/['"]+/g, '');


    this.requestApi.getAllSubcriptions() 
      .subscribe(
        (response) =>{     
          
          this.API_status = response.status; 

          //hiding loader
          this.loaderShow = false;
        
          this.dataSource = new MatTableDataSource(response.subscriptions);
          setTimeout(() => this.dataSource.paginator = this.paginator);
          this.subs = response;
        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;

          console.log('error viewing subscription', error);
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

  displayedColumns = [ 'position', 'name', 'cost', 'description', 'validity', 'devices', 'action'];

  applyFilter(filterValue:any) {
    filterValue = this.SearchInput;
    this.searchRes = filterValue;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  newsubscription(){
    this.router.navigate(["addsubscription"]);
  }


  openDialog(id) {
    const dialogRef = this.dialog.open(AlertComponent, {
      height: '170px',
      width: '370px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteSubcription(id);
      }
    });
  }

  deleteSubcription(id){
    this.del.sub_id = id;
    this.requestApi.deleteSubcriptions(this.del)
      .subscribe(
        (data) =>{            
            this.del = data;
            window.location.reload();
        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;
          
          console.log('error delete subscribtion', error);
        }
      );
  }  
}

export interface Element {
  position: number;
  name: string;
  cost: number;
  description: string;
  created: string;
  action: string;
}


export class subClass{
  sub_id : number;
} 