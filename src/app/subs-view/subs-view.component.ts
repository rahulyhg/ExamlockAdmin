import { Component, OnInit } from '@angular/core';
import {  ActivatedRoute,Router } from '@angular/router';
import { Location } from '@angular/common';
import { RequestApi } from '../services/request.api';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-subs-view',
  templateUrl: './subs-view.component.html',
  styleUrls: ['./subs-view.component.css']
})
export class SubsViewComponent implements OnInit {

  onlyID;
  subscription;
  cardBlur;
  loaderShow:boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestApi: RequestApi,
    private location: Location
  ) { 
    this.onlyID = new data;
  }

  ngOnInit() {
    this.viewSubscription();
  }


  viewSubscription() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.onlyID.sub_id = id;
    this.requestApi.viewSubscriptions(this.onlyID)
      .subscribe(
        (response) =>{         
          //hiding loader
          this.loaderShow = false;

          this.subscription = response; 
        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;

          console.log('error viewing subscription', error);
        }
      );
  }

  goBack(): void {
    this.router.navigate(['subscription']);
   }

   CrdBlur(){
    if(this.loaderShow){
      this.cardBlur = { "blur" : true }
    }else{
      this.cardBlur = { "blur" : false }
    }
    return this.cardBlur;
  }
}

export class data{
  public sub_id: number ;
} 