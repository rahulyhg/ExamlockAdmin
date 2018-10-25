import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from "@angular/router";
import { AuthService } from '../services/auth/auth.service';
import { RequestApi } from '../services/request.api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  
  @Output() NameToPublish  = new EventEmitter<any>();

  name;
  onlyID;
  admin_id:any;
  id;

  form: FormGroup;                    // {1}
  private formSubmitAttempt: boolean; // {2}
  private userData = { usertype: '', username: '', hide: '' };
  public formError: boolean = false;
  public formErrorMessage: string;
  constructor(
    private fb: FormBuilder,         // {3}
    private authService: AuthService, // {4}D
    private router: Router,
    private requestApi: RequestApi,
    private route: ActivatedRoute
    
  ) { 
    this.authService.logout();
    this.onlyID = new data;
    
  }

  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && !this.form.get(field).valid && this.formSubmitAttempt) ||
      (this.form.get(field).touched && !this.form.get(field).valid && this.formSubmitAttempt)
    );
  }

  ngOnInit() {
      this.form = this.fb.group({     // {5}
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.id = +this.route.snapshot.paramMap.get('id');
  
    if(this.id == 1){
      this.formError = true;
      this.formErrorMessage = 'Please enter the valid Username or Password !!'; 
    }else if(this.id == 2){
      this.formError = true;
      this.formErrorMessage = 'server return error';
    }
   
    
  }

  public onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value)
        .subscribe(
        (response) => {
          if (response.errorMessage ) {
            this.formError = true;
            this.formErrorMessage = response.errorMessage;
           
            this.router.navigate(["client"]).then(()=>{
              this.router.navigate(["login/1"]); 
            });

          } else if(response.status == 'failed'){
            this.formError = true;
            this.formErrorMessage = 'Please enter the valid Username or Password !!';

            this.router.navigate(["client"]).then(()=>{
              this.router.navigate(["login/1"]); 
            });

          }
          else {
            this.userData.username = response.username;
            this.userData.usertype = (response.status=='1') ? 'client' : 'admin';
            this.userData.hide = 'true';
            localStorage.setItem('users', JSON.stringify(this.userData));
           
            this.getClient(response.client_id);
          }
        },
        (error) => {
          this.formError = true;
          this.formErrorMessage = 'server return error';
         
          this.router.navigate(["login/2"])
        });; // {7}
    }
    this.formSubmitAttempt = true;
  }

  getClient(id){
    this.onlyID.client_id = id;
    this.requestApi.viewClient(this.onlyID)
      .subscribe(
        (response) =>{       

          this.NameToPublish.emit(response.data.username);
          
          localStorage.setItem('created_by', JSON.stringify(response.data.id));
          localStorage.setItem('status', JSON.stringify(response.data.status));
          localStorage.setItem('admin_name', JSON.stringify(response.data.username));
          
          if(response.data.status == 0){
            this.router.navigate(["client"]);
          }else{
            this.router.navigate(["exam"]);
          }
        },
        (error) =>{
          console.log('error subscription', error);
        }
      );
  }
}

export class data{
  public client_id: number ;
  
} 

