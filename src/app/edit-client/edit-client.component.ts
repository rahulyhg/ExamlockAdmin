import { Component, OnInit } from '@angular/core';
import { RequestApi } from '../services/request.api';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { EditClientModel } from './edit-client.model';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
 
export class EditClientComponent implements OnInit {

  public client: any;
  formError: boolean = false;
  formSuccess: boolean = false;
  formMessage: string;
  onlyID;
  cardBlur;
  loaderShow:boolean = true;
  onlyClient: {};

  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private requestApi: RequestApi,
  ) {
    this.client = new EditClientModel;
    this.onlyID = new data;
   }



  ngOnInit() {
    this.getOneClient();
  }

  getOneClient() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.onlyID.client_id = id;

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

          console.log('error editting client', error);
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

  onSave() {

    //showing loader
    this.loaderShow = true;

    const id = +this.route.snapshot.paramMap.get('id');
    this.client = this.onlyClient;
    this.client.client_id = id;
    delete this.client.status;
    delete this.client.is_deleted;
    delete this.client.id;

    this.requestApi.editClient(this.client)
      .subscribe(
      (response) => {
        if (!response.errorMessage) {
          this.formSuccess = true;
          this.formError = false;
          this.formMessage = response.successMessage;
          setTimeout(() => {
            this.router.navigate(['view_client/'+id]);
          }, 1500);
        } else {
          //hiding loader
          this.loaderShow = false;
          
          this.formError = true;
          this.formSuccess = false;
          this.formMessage = response.errorMessage;
        }
      },
      (error) => {
        //hiding loader
        this.loaderShow = false;
        
        this.formError = true;
        this.formMessage = "server return error. Please try again";
      });
    }

}

export class data{
  client_id: number;
}
