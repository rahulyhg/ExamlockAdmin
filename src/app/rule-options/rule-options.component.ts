import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef,} from '@angular/material';
import { Router } from "@angular/router";
import { RequestApi } from '../services/request.api';


@Component({
  selector: 'app-rule-options',
  templateUrl: './rule-options.component.html',
  styleUrls: ['./rule-options.component.css']
})

export class RuleOptionsComponent implements OnInit {

  public data=[];
  selectedValue;
  length=0;
  final = 0;
  lastURL;
  cardBlur;
  loaderShow:boolean = true;
  output;
  APPLICATION;
  items=[];

  formError: boolean = false;
  formSuccess: boolean = false;
  formMessage: string;

  constructor(private router: Router, private requestApi:RequestApi, public dialog: MatDialog) {
    this.output = new Model;
    this.APPLICATION = new appModel;
  }

  ngOnInit() {

    this.selectedValue = '';

     //hiding loader
     this.loaderShow = false;
  }

  Categories = [  'BOOKMARKS', 'APPLICATION' ];

  selectedValueChanged(cat){

    if(cat == 'BOOKMARKS'){

      delete this.output['windows'];
      delete this.output['mac'];
      delete this.output['linux'];
      this.data = [];
      this.output.value;


    }else if(cat == 'APPLICATION'){
      this.data = [];
      this.output.value;
    }
    
  }

   nospaces(t){
     if(t){
      if(t.match(/\s/g)){   
        

        if(this.output.windows) this.output.windows = this.output.windows.replace(/\s/g,'');
        if(this.output.mac) this.output.mac = this.output.mac.replace(/\s/g,'');
        if(this.output.linux) this.output.linux = this.output.linux.replace(/\s/g,'');

        this.NoSpaceDialog('NoSpace');
        }      
      }
    }

    checkBlank(cat){

      if(cat == 'BOOKMARKS'){

        if(this.output.value == ''){
          this.NoSpaceDialog('Fields');
          return false;
        }else this.saveInDb();
        
      }else if(cat == 'APPLICATION'){

        if(this.output.windows=='' || this.output.mac=='' || this.output.linux=='' || this.output.windows==undefined || this.output.mac==undefined || this.output.linux==undefined ){
          this.NoSpaceDialog('Fields');
          return false;
        }else this.saveInDb(); 
       
      }
      
    }
    
  onSave(){
    for (let i in this.items){
      this.data.push(this.items[i].value);
    }

    if(this.selectedValue == 'BOOKMARKS'){

      for (let i in this.data){
        this.data[i] = "http://" + this.data[i];
      }

      this.output.value = this.data;
      this.checkBlank('BOOKMARKS');

     

    }else if(this.selectedValue == 'APPLICATION'){
      this.output.value.push(this.data);

      this.checkBlank('APPLICATION')
    }

   
  }

  saveInDb(){
    this.output.type = this.selectedValue;


    //showing loader
    this.loaderShow = true;

    this.requestApi.insertRuleOption(this.output)
      .subscribe(
      (response) => {
        if(response.status == 'failed'){

          //resetting values
          this.formMessage = '';
          this.data = [];

          for (let i in this.items){
             this.data.push(this.items[i].value);
           }

          //hiding loader
          this.loaderShow = false;

          this.formError = true;
          this.formSuccess = false;
          let BookVal = [];

          if(response.DuplicateEntries){
            for (let l in response.DuplicateEntries){
              BookVal.push(response.DuplicateEntries[l]);
            }

            if(response.DuplicateEntries.length == 1){
              this.formMessage = response.msg + '. ' + BookVal + ' is already added';
            }else  this.formMessage = response.msg + '. ' + BookVal + ' are already added';
          }else  this.formMessage = response.msg;
        }
        else if(!response.errorMessage) {
          //hiding loader
          this.loaderShow = false;

          this.formSuccess = true;
          this.formError = false;
          this.formMessage = response.msg;

          setTimeout(() => {
            this.router.navigate(['accesscode']);
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

  ValidURL(str) {
    
    //  var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    var regex = /\b(?:(?:https?|ftp):\/\/|www\.)[-a-z0-9+&@#\/%?=~_|!:,.;]*[-a-z0-9+&@#\/%=~_|]/;

    if(!regex .test(str)) {
      return false;
    } else {
      return true;
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

  NoSpaceDialog(val) {
      const dialogRef = this.dialog.open(NoSpaceAlertDialog, {
        data: { name : val, URL: this.lastURL.value},
        height: '185px',
        width: '440px'
      });

    // dialogRef.afterClosed().subscribe(result => {
    // });
  }

  allRULES(){
    this.router.navigate(['accesscode']);
  }
  
  
  chck($scope){
    
    if(this.items.length == $scope.length ){

      this.lastURL = $scope[$scope.length-1];
      let res = this.ValidURL(this.lastURL.value);
      
      //if  ValidURL() return false
      if (res == false && this.lastURL != undefined){

        //deleting lastURL invalid entry
        $scope.splice($scope.length-1); 
        
        this.NoSpaceDialog('BookmarkNotValid');
        return false;

      } else{

        let max_limit = 5;
        this.length = $scope.length;
        this.final = $scope.length;

        //if reached max limit
        if($scope.length > max_limit){

          //deleting last displaying element
          $scope.splice(-1);

          //deleting last element to save in database 
          this.data.splice(max_limit);

        }
      }
    }
  }

}

export class Model{
  type;
  value=[];
  windows;
  mac;
  linux;
}

export class appModel{
  windows;
  mac;
  linux;
  app_name;
  type;
}

@Component({
  selector: 'nospace-alert',
  templateUrl: 'nospace-alert.html',
  styleUrls:['alert.css']
})
export class NoSpaceAlertDialog {

  constructor(
    public dialogRef: MatDialogRef<NoSpaceAlertDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }   
}

