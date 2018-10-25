import { Component, OnInit} from '@angular/core';
import { MatDialog, MatTabChangeEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestApi } from '../services/request.api';
import { RuleAlertDialog } from '../add-rule/add-rule.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-edit-rule',
  templateUrl: './edit-rule.component.html',
  styleUrls: ['./edit-rule.component.css']
})
export class EditRuleComponent implements OnInit {

  rule:any;
  output;
  Rules: {};
  Bookmarks :{};
  Port : {};
  control:[{id:'32', value:'string', checked:boolean}];
  applications:[{id:'32', value:'string', checked:boolean}];
  portCheck;
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
  ruleID;
  controlToChang;
  SelectAll;
  bookmarkCheck;


  BOOKMARKS;
  PORT;
  CONTROL;
  APPLICATION;

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
    console.log(b);

    if(b.checked){
      

      if(element=='control'){
        console.log('control checked select all');

        for(let i in this.control){        
          this.control[i].checked=true;
        }

        // this.checkingControl=true;

        //selecting all app
        this.rule_controls = [];
        for (let i in this.control){
          this.rule_controls.push(this.control[i].id);
        }
        
      }
      else{
        

        console.log('control checked');
        
        //pushing selected element
        this.rule_controls.push(element.id);
      }

    }else{

      
      if(element=='control'){

        console.log('control deselect all');

        for(let i in this.control){        
          this.control[i].checked=false;
        }
        // this.checkingControl=false;

        this.rule_controls = [];
        
      }
      else{

        console.log('control unchecked');
        this.SelectAllControl=false;
        
        //removing seletted element
        var index = this.rule_controls.indexOf(element.id);
        this.rule_controls.splice(index,1);
      }

    }
  }


  selectedFields(element,b){
    console.log(b);

      if(b.checked){

        if(element=='application'){

          // this.checking=true;
          for(let i in this.applications){        
            this.applications[i].checked=true;
          }

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

          for(let i in this.applications){        
            this.applications[i].checked=false;
          }
          // this.checking=false;

          //deselting all app
          this.rule_apps = [];
         
        }
        else{
          this.SelectAllApp=false;
          
          //removing seletted element
          var index = this.rule_apps.indexOf(element.id);
          this.rule_apps.splice(index,1);
        }

      }
    
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
    public dialog: MatDialog, public activatedRoute:ActivatedRoute, private elf:ElementRef, 
  ) {
    this.rule = new Element;
    this.output = new Element;
    this.ruleID = new RuleModel;
    // this.control = new ControlModel;
  }

  // //tab change event
  // onLinkClick(event: MatTabChangeEvent) {
  

  //   if(event.index == 2){
  //     for (let i in this.rule_apps){
  //       var elemt = this.FindByAttributeValue('ng-reflect-id', this.rule_apps[i], 'mat-slide-toggle');
  //       // var elemt_input = this.FindByAttributeValue('id', this.rule_apps[i]+'-input', 'input');
  //       // elemt_input.toggle();
  //       // elemt.classList.add('mat-checked');
  //       // elemt.setAttribute("checked", true);
  //     }
  //   }

  //   if(event.index == 1){

      
  //     for (let i in this.rule_controls){
  //       var elemt = this.FindByAttributeValue('ng-reflect-id', this.rule_controls[i], 'mat-slide-toggle');
  //       console.log(elemt);
        
  //       // elemt.classList.add('mat-checked');
  //     }

  //     if(this.PORT != undefined && this.PORT != null){
  //       var elemt = this.FindByAttributeValue('id', 'portD', 'mat-slide-toggle');
  //       console.log(elemt.event);
  //       elemt.classList.add('mat-checked');
  //     }
  //   }

  // }  



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


          // this.output.rule_name = this.rule.rule_name;
          this.output.rule_category_id = strOfID;
          this.output.created_by = this.created_by;

          if(this.output.rule_category_id == ""){
            // alert('Please select one option atleast')
            this.openDialog('option');
          }else{

          

          //showing loader
          this.loaderShow = true;

          this.requestApi.editrule(this.output)
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

  FindByAttributeValue(attribute, value, element_type)    {

    element_type = element_type || "*";
    var All = document.getElementsByTagName(element_type);
    
    for (var i = 0; i < All.length; i++)       {
      if (All[i].getAttribute(attribute) == value) { return All[i]; }
    }
  }


  ngOnInit() {

    this.created_by = localStorage.getItem("created_by").replace(/['"]+/g, '');

    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.ruleID.rule_id = id; 
    this.output.rule_id = id;

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
            this.applications = response.APPLICATION;
           
          this.viewRuleCatIdByruleId();

        },
        (error) =>{
           //hiding loader
           this.loaderShow = false;

          console.log('error getting rules', error);
        }
      );

     
  }

  viewRuleCatIdByruleId(){
    this.requestApi.viewRuleCatIdByruleId(this.ruleID)
    .subscribe(
      (response) =>{
         //hiding loader
         this.loaderShow = false;
         this.BOOKMARKS = response.BOOKMARKS;
          this.PORT = response.PORT;
          this.CONTROL = response.CONTROL;
          this.APPLICATION = response.APPLICATION;

          this.rule.rule_bookmarks = this.BOOKMARKS;
          this.rule.rule_name = response.rule_name;

   
        //toggling on control keys toggle
        if(this.CONTROL != undefined && this.control != undefined){
            let pos1 =  this.control.map(function(e) { return e.id; }) ;
          for(let i in this.CONTROL){

            //adding value in array
            this.rule_controls.push(this.CONTROL[i]);
            
            let pos = pos1.indexOf(this.CONTROL[i]);
            this.control[pos].checked=true;

          }
        }

        //toggling on applications toggle
        if(this.APPLICATION != undefined && this.applications != undefined){
          let pos_App1 =  this.applications.map(function(e) { return e.id; }) ;
          for(let i in this.APPLICATION){

            //adding value in array
            this.rule_apps.push(this.APPLICATION[i]);
            
            let pos_APP = pos_App1.indexOf(this.APPLICATION[i]);
            this.applications[pos_APP].checked=true;
          }
        }
          //toggling on bookmark toggle
          if(this.BOOKMARKS != undefined){
            this.optionClick();
          }

          if(this.PORT != undefined){
            this.portCheck = true;
          }

          // for (let i in this.APPLICATION){
          //   this.rule_apps.push(this.APPLICATION[i]);
          // }

          // for (let i in this.CONTROL){
          //   this.rule_controls.push(this.CONTROL[i]);
          // }
          
        
          
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

export class RuleModel{
  rule_id:number;
}

export class ControlModel{
  id:number;
  value:string;
  checked:Boolean;
}
