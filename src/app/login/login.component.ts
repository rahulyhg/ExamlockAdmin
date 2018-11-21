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
  token;
  input;
  token_input;
  token_validate_input;
  client_input;
  client_exist_input;
  password;
  username;
  param1;

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

    
    this.id = +this.route.snapshot.paramMap.get('id');

  

    this.authService.logout(this.id);
    this.onlyID = new data;
    this.input = new valhalla_input;
    this.token_input = new Generate_Token;
    this.token_validate_input = new validate_token;
    this.client_input = new ClientModel;
    this.client_exist_input = new checkClientExistence;
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

   
    this.route.params.subscribe((params: Params) => {
      if (params['id'] !== undefined) {
    
        // Get the param straight
         let mparam = params['id'];

         this.id= params['id'];

        

        if(this.id == '0'){
      
          this.formError = false;
            
        }else if(this.id == 'err1' || this.id == 'NaN'){
          this.formError = true;
          this.formErrorMessage = 'Please enter the valid Username or Password !!'; 
        }else if(this.id == 'err2'){
          this.formError = true;
          this.formErrorMessage = 'server return error';
        }else {
            this.token_input.username =  this.id;
            this.Generate_JWToken();

        }
 
      }
    });


    
    
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
              this.router.navigate(["login/err1"]); 
            });

          } else if(response.status == 'failed'){
            this.formError = true;
            this.formErrorMessage = 'Please enter the valid Username or Password !!';

            this.router.navigate(["client"]).then(()=>{
              this.router.navigate(["login/err1"]); 
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
         
          this.router.navigate(["login/err2 "])
        });; // {7}
    }
    this.formSubmitAttempt = true;
  }

  public Generate_JWToken(){
    this.requestApi.Generate_JWToken(this.token_input)
      .subscribe(
        (response) =>{       


          
          if(response.Result){


          
            this.token_validate_input.JToken = response.Token;
            this.Auto_login();

          
           }
        },
        (error) =>{
          console.log('error subscription', error);
        }
      );
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

  Auto_login(){
    
    this.requestApi.auto_login(this.token_validate_input)
    .subscribe(
      (response) =>{       
        if(response.Result == 'true'){


         this.client_input.username = response.Username; 
         this.client_input.email = response.Email;
         this.client_input.password = response.Password;
         this.client_input.prefix = response.Prefix;
         this.client_input.comp_name = response.Company;
         this.client_input.address = response.Address;
         this.client_input.phone_number = response.Phone;
         this.client_input.Exam_candidateID = response.ClientID;

         this.generate_prefix(3);

         this.client_input.username =  this.client_input.username + '_' +this.client_input.prefix;
         
         this.client_exist_input.Exam_candidateID = response.ClientID;

         this.ViewCientbyExamCandidateID(this.client_exist_input);
         
         
        
          }else{
            this.username =   '';          
            this.password = '';
  
            this.form.value.username =   '';        
            this.form.value.password ='';
          }
      },
      (error) =>{
        console.log('error subscription', error);
      }
    );
  }

  ViewCientbyExamCandidateID(input){
    this.requestApi.ViewCientbyExamCandidateID(input)
      .subscribe(
        (response) =>{       


        

        if(response.data){

          this.username =   response.data.username;    
          this.password = '';   

          this.form.value.username =   response.data.username; 
          this.form.value.password = '';   



        }else {
          this.addNewClient();
        }
         
        },
        (error) =>{
          console.log('error subscription', error);
        }
      );
  }


  //{"Result":"true","Status":"Success : Client profile found","ClientID":"57","Username":"bhargav@provexam.com","Password":"iw+UW6sf9uqXrHOi20JcEQ311F98R3SiQlt97Us77Pc=","Prefix":"","Email":"bhargav@provexam.com","Address":"BTM Karnataka,india,123456","Phone":"9234567891","Company":"AAPC"}

  addNewClient() {

    this.requestApi.addClient(this.client_input)
      .subscribe(
      (response) => {

        if (response.status=="success") {
          this.formError = false;
  

          this.username =   this.client_input.username; 
          this.password = '';

          this.form.value.username =   this.client_input.username; 
          this.form.value.password = '';

      
        } else {   
  
          this.formError = true;

          this.formErrorMessage = response.msg;

        }
      },
      (error) => {
        this.formError = true;
      });
  } 

  generate_prefix(length){


      // generating token
      var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
      var b = [];  
      for (var i=0; i<length; i++) {
          var j = (Math.random() * (a.length-1)).toFixed(0);
          b[i] = a[j];
      }
      this.client_input.prefix = b.join("");


      
  //  }   
  }

}


export class data{
  public client_id: number ;
  
} 

export class valhalla_input{
  candidate_id;
  token;
  validity;
}

export class Generate_Token{
  username;
}

export class validate_token{
  JToken;
}

export class ClientModel {
  public username;
  public email;
  public password;
  public prefix;
  public comp_name;
  public status;
  public is_deleted = 0;
  address;
  phone_number;
}

export class checkClientExistence{
  Exam_candidateID;
}