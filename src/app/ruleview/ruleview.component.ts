import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RequestApi } from '../services/request.api';
import { FormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-ruleview',
  templateUrl: './ruleview.html',
  styleUrls: ['./ruleview.component.css']
})

export class RuleviewComponent implements OnInit {

  rule;
  rule_name;
  books;
  ctrl;
  app;
  portt;
  output;
  dialogRef;
  BOOKMARKS;
  PORT;
  CONTROL ;
  APPLICATION; 
  new_Rule_Name;
  rule_array=[];
  created_by;

  cardBlur;
  loaderShow:boolean = true;

  constructor(public dialog: MatDialog,public requestApi: RequestApi, private route: Router, public activate_route: ActivatedRoute) { 
    this.output = new Model;
  }

  ngOnInit() {
    this.created_by = localStorage.getItem("created_by").replace(/['"]+/g, '');

    this.getRulesById();
  }

  getRulename(val) {
    this.dialogRef = this.dialog.open(getnameDialog, {
      data: { name : val, array :  this.rule_array, created_by: this.created_by},
      height: 'auto',
      width: '440px'
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log(this.new_Rule_Name);
      console.log(result);
      data => console.log("Dialog output:", data)
    
    });

    
  }
 

  goBack(): void {
    this.route.navigate(['accesscode']);
   }

   importRule(){

          
      this.requestApi.viewRuleCatIdByruleId(this.output)
      .subscribe(
        (response) =>{
            //hiding loader
            this.loaderShow = false;

            this.BOOKMARKS = response.BOOKMARKS;
            this.PORT = response.PORT;
            this.CONTROL = response.CONTROL;
            this.APPLICATION = response.APPLICATION;

            if(this.BOOKMARKS != undefined){
              this.rule_array.push.apply(this.rule_array, this.BOOKMARKS);
            }
            
            if(this.PORT != undefined){
              this.rule_array.push.apply(this.rule_array, this.PORT);
            }
            
            if(this.CONTROL != undefined){
              this.rule_array.push.apply(this.rule_array, this.CONTROL);              
            }
           
            if(this.APPLICATION != undefined){
              this.rule_array.push.apply(this.rule_array, this.APPLICATION);
            }
           
            console.log( this.rule_array);
            this.getRulename(response.rule_name)
            
        },
        (error) =>{
            //hiding loader
            this.loaderShow = false;

          console.log('error getting rules', error);
        });
   }

  getRulesById(){

      const id = this.activate_route.snapshot.params.id;

      this.output.rule_id=id;

      this.requestApi.viewRuleCatById(this.output)
        .subscribe((response) =>{    
          
          console.log(response);
          
           //hiding loader
           this.loaderShow = false;

          this.rule = response;
          this.rule_name = response.rule_name;
          this.books = response.Restrictions.BOOKMARKS;
          this.ctrl = response.Restrictions.CONTROL;
          this.app = response.Restrictions.APPLICATION;
          this.portt = response.Restrictions.PORT;

        },
          
        (error) =>{
            //hiding loader
            this.loaderShow = false;

            console.log('error viewing rule', error);
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

}

export class Model{
  rule_id;
}


@Component({
  selector: 'get-name',
  templateUrl: 'get-name.html',
  styleUrls:['get-name.css']
})
export class getnameDialog {
  
  new_Rule_Name;
  output;
  loaderShow;
  cat_id ='';
  errorPresent;

  constructor(
    public dialogRef: MatDialogRef<getnameDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any, public requestApi: RequestApi, private router: Router) {

      this.output = new OUTPUTModel;

  }   

  close(){  


    for (let i in this.data.array){

      if(i == '0'){
        this.cat_id =  this.data.array[i]
      }else{
        this.cat_id =  this.cat_id + ',' +  this.data.array[i];
      }
    }

    if(this.new_Rule_Name == null || this.new_Rule_Name == undefined ){
      // this.openDialog();  
      this.errorPresent = 'Please enter the Rule Name';
    }else{
      this.new_Rule_Name = this.new_Rule_Name.trim();

      this.output.rule_name = this.new_Rule_Name;
      this.output.rule_category_id = this.cat_id;
      this.output.created_by = this.data.created_by;

      this.requestApi.addRule(this.output)
      .subscribe(
        (data) =>{  

          //showing loader
          this.loaderShow = true;
  

          if(data.status == 'failed'){
            //hiding loader
            this.loaderShow = false;

            this.errorPresent = data.msg;

          }else{

            this.dialogRef.close();

            setTimeout(() => {
              this.router.navigate(['accesscode']);
            }, 1500);
          }
        },
        (error) =>{
          //hiding loader
          this.loaderShow = false;

          this.errorPresent = 'Error adding rule';
  
          console.log('Error adding rule', error);
        }
      );
    }
  }




}

export class OUTPUTModel{
  rule_name;
  Rule_category_id;
  created_by;
}

