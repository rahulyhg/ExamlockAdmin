import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator  } from '@angular/material';
import { RequestApi } from '../services/request.api';
import { AlertComponent } from '../alert/alert.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accesscode',
  templateUrl: './accesscode.component.html',
  styleUrls: ['./accesscode.component.css']
})

export class AccesscodeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  rulename: string;
  Rules: {};
  Bookmarks :{};
  Port : {};
  control: {};
  website: {};
  del;
  deleteitem;
  SelectInput;
  searchRes;
  cardBlur;
  loaderShow:boolean = true;
  clientID;
  API_status;
  dataSource;
  created_by;
  AdminStatus;
  ID;

  checked: number = 1;
  disabled = false;
  device: any = [];

  constructor(private route: Router, public dialog: MatDialog, private requestApi:RequestApi) {
    this.del = new rulDel;
    this.clientID = new RuleCliendModel
  }
  

  ngOnInit() {
    this.created_by = localStorage.getItem("created_by").replace(/['"]+/g, '');
    this.AdminStatus = localStorage.getItem('status').replace(/['"]+/g, '');
    
    if(this.AdminStatus == '1'){
      this.clientID.created_by = this.created_by;
      this.viewrulebyclientid();
    }else{
      
      this.getallrules();
    }
    
  }

  getallrules(){
    this.requestApi.getAllRules()
      .subscribe(
        (response) =>{ 

          this.API_status = response.status; 

          //hiding loader
          this.loaderShow = false;


          this.dataSource = new MatTableDataSource(response.rules);
          setTimeout(() => this.dataSource.paginator = this.paginator);
          
        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;

          console.log('error getting rules', error);
        }
      );
  }

  onChange(value) {
    if (value.checked === true) {
      this.checked = 1;
    } else {
      this.checked = 0;
    }
  }


  viewrulebyclientid(){
    this.requestApi.viewrulebyclientid(this.clientID)
      .subscribe(
        (response) =>{   
            
          //hiding loader
          this.loaderShow = false;

          this.API_status = response.status;    
          if( this.API_status == "success"){
            this.dataSource = new MatTableDataSource(response.rules);
            setTimeout(() => this.dataSource.paginator = this.paginator);
          }
          
        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;

          console.log('error getting rules', error);
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

  deleterule(id){
    this.del.rule_id = id;
    this.requestApi.deleterule(this.del)
    .subscribe(
      (data) =>{            
        this.del = data;
        window.location.reload();
      },
      (error) =>{
        console.log('error delete rule', error);
       }
     )
  }

  loginRedirect(){
    this.route.navigate[("new_rule")];
  }

  displayedColumns = ['position', 'name', 'action'];

  applyFilter() {

    let filterValue = this.SelectInput;
    this.searchRes = filterValue;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;

  }

  openDialog(id) {
    const dialogRef = this.dialog.open(AlertComponent, {
      height: '170px',
      width: '370px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleterule(id);
      }
    });
  }

}

export interface Element {
  rule_name: any;
  rule_id: any;
  access_token: any;
}

  
export class rulDel{
  access_token;
}

export class RuleCliendModel{
  created_by;
}
