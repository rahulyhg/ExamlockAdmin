import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { Router } from "@angular/router";
import { RequestApi } from '../services/request.api';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})

export class ClientComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  user: string;
  clientList;
  response;
  del;
  deleteitem;
  SearchInput;
  searchRes;
  cardBlur;
  loaderShow:boolean = true;
  API_status;

  constructor(private router: Router, private requestApi:RequestApi, public dialog: MatDialog) {

    this.response  = new Element;
    this.del = new delClient;

  }

  ngOnInit() {
      
      this.requestApi.getClients()
      .subscribe(
        (response) =>{  
          
          this.API_status = response.status; 

          //hiding loader
          this.loaderShow = false;
               
          this.dataSource = new MatTableDataSource(response.clients);
          setTimeout(() => this.dataSource.paginator = this.paginator);

        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;

          console.log('error getting clients', error);
        }
      );  
    
  }

  //blurring the background when loader is active
  CrdBlur(){
    if(this.loaderShow){
      this.cardBlur = { "blur" : true }
    }else{
      this.cardBlur = { "blur" : false }
    }
    return this.cardBlur;
  }

  displayedColumns = ['position', 'name', 'email', 'compName', 'prefix', 'action'];
  dataSource = new MatTableDataSource(this.clientList);

  applyFilter(filterValue:any) {
    filterValue = this.SearchInput;
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
        this.deleteClient(id);
        
      }
      
    });
  }


  newclient(){
    this.router.navigate(["newclient"]);
  }



  deleteClient(id){
      this.del.id = id;
      this.requestApi.deleteclient(this.del)
      .subscribe(
        (data) =>{            
          this.del = data;
          window.location.reload();
        },
        (error) =>{

          //hiding loader
         this.loaderShow = false;
         
          console.log('error delete client', error);
        }
      );
  }

}

export class Element {
  name: string;
  position: number;
  id: number;
  email: string;
  compName: string;
  action: string;
  index;
}

export class delClient{
  id;
}



