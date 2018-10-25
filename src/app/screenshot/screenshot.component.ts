import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RequestApi } from '../services/request.api';
import { Http} from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-screenshot',
  templateUrl: './screenshot.component.html',
  styleUrls: ['./screenshot.component.css']
})
export class ScreenshotComponent implements OnInit {

  onlyId;
  loaderShow = true;
  APIresponse;
  screenurl;
  APIstatus;

  constructor( private http: Http, private requestApi:RequestApi, private sanitizer:DomSanitizer, private route: ActivatedRoute) {

    this.onlyId = new Model;
    this.screenurl = new UrlModel;
   }

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get('id');
    this.onlyId.access_log_id = id;
    
      console.log(this.onlyId.access_log_id);
  
      this.requestApi.getScreenshot(this.onlyId)
      .subscribe(
        (response) =>{   
          
          console.log(response);

          this.APIstatus = response.status;
          this.screenurl = response.screenshots;

          for(let i in this.screenurl){
 
            this.screenurl[i].screenshot = this.sanitizer.bypassSecurityTrustUrl(this.screenurl[i].screenshot);

          }
  
          //hiding loader
          this.loaderShow = false;
        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;
          
          console.log('error getting screenshots', error);
        }
      );
    }


  }


export class Model{
  access_log_id;
}

export class UrlModel{
  screenshot;
}
