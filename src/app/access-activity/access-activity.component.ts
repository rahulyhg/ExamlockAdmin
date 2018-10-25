import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatDialog, MatPaginator } from '@angular/material';
import { ActivatedRoute } from "@angular/router";
import { RequestApi } from '../services/request.api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-access-activity',
  templateUrl: './access-activity.component.html',
  styleUrls: ['./access-activity.component.css']
})
export class AccessActivityComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  access_activity;
  onlyId;
  cardBlur;
  loaderShow:boolean = true;
  API_status;
  screenurl;

  constructor( private requestApi:RequestApi, public dialog: MatDialog, private route: ActivatedRoute,) { 
    this.onlyId = new model;
  }


  ngOnInit() {

    // setting timer to  perform every 15 seconds  with 0 seconds delay
    var timer = Observable.timer(0,15000);

    const id = +this.route.snapshot.paramMap.get('id');
    this.onlyId.access_log_id = id;

    // API will be called every 15 seconds  
    timer.subscribe(tick => {
 
      this.requestApi.viewActivity(this.onlyId)
      .subscribe(
        (response) =>{   
          
          this.API_status = response.status;

          //hiding loader
          this.loaderShow = false;

          this.dataSource = new MatTableDataSource(response.result);
          setTimeout(() => this.dataSource.paginator = this.paginator);
        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;
          
          console.log('error getting clients', error);
        }
      );
    });

  }

  getScreenshot(){
    console.log(this.onlyId.access_log_id);

    this.requestApi.getScreenshot(this.onlyId)
    .subscribe(
      (response) =>{   
        
        console.log(response);

        this.screenurl = response.


        //hiding loader
        this.loaderShow = false;
      },
      (error) =>{
        //hiding loader
        this.loaderShow = false;
        
        console.log('error getting clients', error);
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

  displayedColumns = ['position', 'type', 'access_activity', 'server_time', 'performed_on' ];
  dataSource = new MatTableDataSource(this.access_activity);

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

}

export class model{
  access_log_id;
}
