import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef,} from '@angular/material';
import { Router } from '@angular/router';
import { RequestApi } from '../services/request.api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-rule',
  templateUrl: './add-rule.component.html',
  styleUrls: ['./add-rule.component.css']
})
export class AddRuleComponent implements OnInit {

  rule:any;
  output;
  Rules: {};
  Bookmarks :{};
  Port : {};
  control: {};
  website: {};
  applications:{};
  rule_controls: string[]=[];
  portsArray = [];
  created_by;
  rule_apps=[];
  rule_array=[];
  controlGet;
  checking=false;
  SelectAllApp;
  SelectAllControl;
  checkingControl
  bookmarkCheck;

  controlToChang;
  SelectAll;

  cardBlur;
  loaderShow:boolean = true;

  form: FormGroup;
  private formSubmitAttempt: boolean;
  formError: boolean = false;
  formSuccess: boolean = false;
  formMessage: string;

  checked: number = 1;
  disabled = false;
  device: any = [];


  isFieldInvalid(field: string) { // {6}
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).pristine && this.formSubmitAttempt)
    );
  }

  //when selectALL contrls is togggled off
  deSelectBook(value){
    let elements;
    let className;
    if (value.checked === false) {

      if(value.source.id == 'bookmarkID' ){
        elements = (document.getElementById("bookDropdown")) as HTMLSelectElement;
        className =  document.getElementsByClassName('bookmarkClass mat-checked');
      }

      // for(var i = 0; i < elements.length; i++){
      //   elements[i].selected = false;
      // }

      this.rule.rule_bookmarks = "";
    }
  }

  optionClick(){
    let divToChange = document.getElementById('bookmarkID');
    divToChange.classList.add('mat-checked');
    this.bookmarkCheck = true;
  }

  selectedFieldsControl(element,b){

    if(b.checked){

      if(element=='control'){

        this.checkingControl=true;

        //selecting all app
        this.rule_controls = [];
        for (let i in this.control){
          this.rule_controls.push(this.control[i].id);
        }
        
      }
      else{

        
        //pushing selected element
        this.rule_controls.push(element.id);
      }

    }else{

      if(element=='control'){

        this.checkingControl=false;
        this.rule_controls = [];
        
      }
      else{
        this.SelectAllControl=false;

        // let divToChang = document.getElementById('SelectAllControl');
        // divToChang.classList.remove('mat-checked');
        
        //removing seletted element
        var index = this.rule_controls.indexOf(element.id);
        this.rule_controls.splice(index,1);
      }

    }
  }


  selectedFields(element,b){

    
    console.log(b.checked);

      if(b.checked){

        if(element=='application'){

          this.checking=true;

          //selecting all app
          this.rule_apps = [];

          for (let i in this.applications){
            this.rule_apps.push(this.applications[i].id);
          }
         
        }
        else{

          
          //pushing selected element
          this.rule_apps.push(element.id);
        }

      }else{

        if(element=='application'){

          this.checking=false;

          //deselting all app
          this.rule_apps = [];
         
        }
        else{
          this.SelectAllApp=false;

          // let divToChang = document.getElementById('SelectAllApp');
          // divToChang.classList.remove('mat-checked');
          
          //removing seletted element
          var index = this.rule_apps.indexOf(element.id);
          this.rule_apps.splice(index,1);
        }

      }
    console.log(this.rule_apps);
  }

  CrdBlur(){
    if(this.loaderShow){
      this.cardBlur = { "blur" : true }
    }else{
      this.cardBlur = { "blur" : false }
    }
    return this.cardBlur;
  }

  //selecting values
  SelectingValues(values){

    let appLength =  values.length;

    for (let i = 0; i < appLength; i++) {
      let element1 =  values[i];
      let value1 = element1.getAttribute('ng-reflect-id');
      this.rule_array.push(value1);
    }
  }


  constructor(private requestApi: RequestApi, private route: Router, private fb: FormBuilder,
    public dialog: MatDialog,
  ) {
    this.rule = new Element;
    this.output = new Element;
  }
  
  onSave() {
    
    if(this.rule.rule_name == null || this.rule.rule_name == undefined ){
      this.openDialog('name');  
    }else{
      this.rule.rule_name = this.rule.rule_name.trim();

      if(this.rule.rule_name == ''){        
        this.openDialog('name');
      }else{
        this.rule.created_by = this.created_by;

        //for bookmark
        if(this.rule.rule_bookmarks){
          for(let i in this.rule.rule_bookmarks){
            this.rule_array.push(this.rule.rule_bookmarks[i]);
          }
        }

        this.rule_array.push.apply(this.rule_array, this.rule_controls);
        this.rule_array.push.apply(this.rule_array, this.rule_apps);

          //adding all ports id's to rule array if selected
          if(this.rule.rule_port){
            for(let i in this.Port){
              this.rule_array.push(this.Port[i].id);
            }
          }
          
          let strOfID = this.rule_array.toString();


          this.output.rule_name = this.rule.rule_name;
          this.output.rule_category_id = strOfID;
          this.output.created_by = this.created_by;

          if(this.output.rule_category_id == ""){
            // alert('Please select one option atleast')
            this.openDialog('option');
          }else{

          //showing loader
          this.loaderShow = true;

          this.requestApi.addRule(this.output)
          .subscribe(
          (response) => {
            if(response.status == 'failed'){
              
              //hiding loader
              this.loaderShow = false;

              this.formError = true;
              this.formSuccess = false;
              this.formMessage = response.msg;
            }
            else if(!response.errorMessage) {
              this.formSuccess = true;
              this.formError = false;
              this.formMessage = response.msg;
              setTimeout(() => {
                this.route.navigate(['accesscode']);
              }, 1500);
            }
            else {

              //hiding loader
              this.loaderShow = false;
              
              this.formError = true;
              this.formSuccess = false;
              this.formMessage = response.msg;
            }
            console.log(response);
        },
          (error) => {
            //hiding loader
            this.loaderShow = false;

            this.formError = true;
            this.formMessage = "server return error. Please try again";
        });
       }
      }
    }
  }

  goBack(): void {
    this.route.navigate(['accesscode']);
  }

  openDialog(val) {
    const dialogRef = this.dialog.open(RuleAlertDialog, {
      data: { name : val},
      height: '170px',
      width: '350px'
    });
  }


  ngOnInit() {

    this.created_by = localStorage.getItem("created_by").replace(/['"]+/g, '');

    this.form = this.fb.group({     // {5}
      rule_name: ['', Validators.required]
    });

    this.requestApi.getRulesCAT()
      .subscribe(
        (response) =>{
           //hiding loader
           this.loaderShow = false;

            this.Bookmarks = response.BOOKMARKS;
            this.Port = response.PORT;
            this.control = response.CONTROL;
            this.website = response.WEBSITE;
            this.applications = response.APPLICATION;

        },
        (error) =>{
           //hiding loader
           this.loaderShow = false;

          console.log('error getting rules', error);
        }
      );
  }

}

export class Element{
  rule_name: string;
  rule_category_id:number;
}

export class controlClass{
  public value:string;
}


@Component({
  selector: 'rule-alert',
  templateUrl: 'rule-alert.html',
  styleUrls:['rule_alert.css']
})
export class RuleAlertDialog {

  constructor(
    public dialogRef: MatDialogRef<RuleAlertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }   
  
}