import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestApi } from '../services/request.api';
import 'rxjs/add/operator/filter';
import {data} from './client-view.model'

@Component({
  selector: 'app-client-view',
  templateUrl: './client-view.component.html',
  styleUrls: ['./client-view.component.css']
})
export class ClientViewComponent implements OnInit {

  clientList: Element[];
  onlyClient;
  onlyID ;
  examm;
  id;
  SelectedCleint =[];
  cardBlur;
  Client_id;
  sum_total_limit;
  sum_available_limit;
  msg;
  loaderShow:boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private requestApi: RequestApi,
  ) {
    this.onlyID = new data;
    this.onlyClient = new clientModel;
  }

  ngOnInit(): void {
    this.getClient();
  }

  getClient(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.onlyID.client_id = this.id;
    this.requestApi.viewClient(this.onlyID)
      .subscribe(
        (response) =>{       
          //hiding loader
          this.loaderShow = false;

          this.onlyClient = response.data;  
        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;

          console.log('error viewing Client', error);
        }
      );

      this.getExams();
      this.viewDeviceOfClient(this.onlyID);
  }

  getExams(){

    this.requestApi.getExams(' ')
    .subscribe(
      (response) =>{
        
        this.examm = response.exams;
        
        for (let i in this.examm){
          if(this.examm[i].client_id == this.id){
            this.SelectedCleint.push(this.examm[i]);
          }
        }

      },
      (error) =>{
        //hiding loader
        this.loaderShow = false;
        
        console.log('error subscription', error);
      }
    );

  }


  viewDeviceOfClient(id){

    this.requestApi.viewDeviceOfClient(id)
    .subscribe(
      (response) =>{

        this.sum_total_limit = response.sum_total_limit;
        this.sum_available_limit = response.sum_available_limit; 

        if(response.status == 'failed'){
          this.msg = response.msg;
        }
        

      },
      (error) =>{
        //hiding loader
        this.loaderShow = false;
        
        console.log('error getting devices', error);
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

  goBack(): void {
    this.router.navigate(['client']);
  }

  AddExamRedirect(input){
    this.requestApi.client_id_addExam(input);
    this.router.navigate(['newexam']);
  }
}

export class clientModel{
  id;
}

export class Model{
  client_id;
}