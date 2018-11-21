import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class RequestApi {

  Base_URL = "http://tachetechnologies.com/ExamlockApi/examConsole/api/v1";
  Payment_URL = 'http://tachetechnologies.com/ExamlockApi/examConsole/api/paymentAPI/index.php';

  private valurFilter = new BehaviorSubject<any>("none");
  RedirectValue = this.valurFilter.asObservable();
   
  filtervalue(id: any) {
    this.valurFilter.next(id);
  }

  private IDSource = new BehaviorSubject<any>("none");
  currentId = this.IDSource.asObservable();

  client_id_addExam(newId :any){
    this.IDSource.next(newId);
  }

  
  private headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private headers2 =  new Headers({ 'Content-Type': 'application/json' });

  constructor(private http: Http) {}

  addClient(client) {
   
    return this.http.post(this.Base_URL+ '/insertclient',
      JSON.stringify(client),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();

        let clients = JSON.parse(localStorage.getItem('clients'));
        if(clients == null || clients==''){
          clients=[];
        }
        let clientObj = {
          name: client.username,
          password: client.password,
          prefix: client.prefix,
          compName: client.comp_name,
          email :client.email,
          status: '1',
          position: Math.random,

        };
        clients.push(clientObj);
        localStorage.setItem('clients',JSON.stringify(clients));        
        return data;
      });
  };

  getClients() {
    return this.http.get(this.Base_URL+ '/viewallclient')
      .map((res: Response) => {
      const data = res.json();
      return data;
    });
    };

  viewClient(id) {
    return this.http.post(this.Base_URL+ '/viewclient',
      JSON.stringify(id),
      { headers: this.headers }).map((res: Response) =>{
        const dataa = res.json();
        return dataa;
    });
  }

    editClient(client) {
      return this.http.post(this.Base_URL+ '/updateclient',
      JSON.stringify(client),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();    
        return data;
      });
    }

    viewDeviceOfClient(client) {
      return this.http.post(this.Base_URL+ '/viewDeviceOfClient',
      JSON.stringify(client),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();  
        return data;
      });
    }

    deleteclient(client_id){
      return this.http.post(this.Base_URL+ '/deleteclient', 
      JSON.stringify(client_id),
          { headers: this.headers }).map((res: Response) => {
          const data = res.json();
          return data;
        });
    }
    
  addSubcription(subcript) {
    return this.http.post(this.Base_URL+ '/insertsubscription',
      JSON.stringify(subcript),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  // view all Subscription
  getAllSubcriptions() {
    return this.http.get(this.Base_URL+ '/viewallsubscription')
      .map((res: Response) => {
        const data = res.json();
        return data;
    });
  } 

  // view One Subscription
  viewSubscriptions(sub_id){
    return this.http.post(this.Base_URL+ '/viewsubscription',   
      JSON.stringify(sub_id),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json().subscriptions;
        return data;
      });
  }
  
  deleteSubcriptions(sub_id){
    return this.http.post(this.Base_URL+ '/deletesubscription',   
      JSON.stringify(sub_id),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  editSubsciption(subsc) {

    return this.http.post(this.Base_URL+ '/updatesubscription',
    JSON.stringify(subsc),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
    }

  getinvoices(){
    return this.http.get(this.Base_URL+ '/viewallinvoice')
      .map((res: Response) => {
      const data = res.json();
      return data;
    });
  }

  getoneInvloice(id) {
    return this.http.post(this.Base_URL+ '/viewinvoicebyinv_id',
      JSON.stringify(id),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

 

  getInvloicebyClient(id) {
    return this.http.post(this.Base_URL+ '/viewallinvoicebyclient',
    JSON.stringify(id),
    { headers: this.headers }).map((res: Response) => {
      const data = res.json();
      return data;
    });
  }

  deleteinvoice(invoice){
    return this.http.post(this.Base_URL+ '/deleteinvoice',   
    JSON.stringify(invoice),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  updateinvoice(invoice){
    return this.http.post(this.Base_URL+ '/updateinvoicestatus',   
    JSON.stringify(invoice),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  insertInvoices(invoice){
    return this.http.post(this.Base_URL+ '/insertinvoiceExamlock',  
    JSON.stringify(invoice),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        console.log(res);  
        return data;
    });
  }

  getInvoiceNumber(){
    return this.http.get(this.Base_URL+ '/getInvoiceNumber')
      .map((res: Response) => {
      const data = res.json();
      return data;
    });
  }

  downloadPDF(id){
    return this.http.post(this.Base_URL+ '/downloadPdf',  
    JSON.stringify(id),
        { headers: this.headers }).map((res: Response) => {
          const data = res.json();
          console.log(res);  
          return data;
      });
    }


  checkPrefix(pre){
    return this.http.post(this.Base_URL+ '/checkprefix',  
      JSON.stringify(pre),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }
  


  getExams(id) {
    return this.http.post(this.Base_URL+ '/viewallexam',
      JSON.stringify(id),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  addExam(exam) {
    return this.http.post(this.Base_URL+ '/insertexam',   
    JSON.stringify(exam),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();    
        return data;
      });
  }

  viewExam(id) {
    return this.http.post(this.Base_URL+ '/viewexam',   
      JSON.stringify(id),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json().exams;
        return data;
      });
    }; 

  editexam(exam) {
    return this.http.post(this.Base_URL+ '/editexam',   
      JSON.stringify(exam),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
    }
  
  deleteExam(exam){
    return this.http.post(this.Base_URL+ '/deleteExam',
      JSON.stringify(exam),
        { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  getRulesByToken(token) {
    return this.http.get(this.Base_URL+ '/viewrulebytoken?access_token=' +token)
      .map((res: Response) => res.json())
    }

    viewrulebyclientid(id) {
      return this.http.post(this.Base_URL+ '/viewrulebyclientid',
      JSON.stringify(id),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
    }
  
  getRulesCAT() {
    return this.http.get(this.Base_URL+ '/getallcategory')
      .map((res: Response) => {
        const data = res.json();
        return data;
      });

    }
  
  viewRuleCatById(id){
    return this.http.post(this.Base_URL+ '/viewRuleCatById',   
      JSON.stringify(id),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  viewRuleCatIdByruleId(id){
    return this.http.post(this.Base_URL+ '/viewRuleCatIdByruleId',   
      JSON.stringify(id),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  getAllRules(){
      return this.http.get(this.Base_URL+ '/viewrules')
      .map((res: Response) => {
        const data = res.json();
        return data;
      });
    }
  
  editrule(id){
    return this.http.post(this.Base_URL+ '/editrule',   
      JSON.stringify(id),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  addRule(subcript) {
    return this.http.post(this.Base_URL+ '/insertrule',
      JSON.stringify(subcript),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
    }
  
  deleterule(id){
    return this.http.post(this.Base_URL+ '/deleterule',   
      JSON.stringify(id),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  
  getRuleById(id){
    return this.http.post(this.Base_URL+ '/viewrulebyid',   
    JSON.stringify(id),
    { headers: this.headers }).map((res: Response) => {
      const data = res.json().rules;
      return data;
    });
  }

  viewAccessLog(){
    return this.http.get(this.Base_URL+ '/viewAccessLog')
      .map((res: Response) => {
        const data = res.json();
        return data;
    });
  }

  examByToken(id){
    return this.http.post(this.Base_URL+ '/examByToken',   
    JSON.stringify(id),
    { headers: this.headers }).map((res: Response) => {
      const data = res.json();
      return data;
    });
  }

  viewAccessLogbyClientID(id){
    return this.http.post(this.Base_URL+ '/viewAccessLogbyClientID',   
      JSON.stringify(id),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  viewAccessLogbyToken(token){
    return this.http.post(this.Base_URL+ '/viewAccessLogbyToken',   
      JSON.stringify(token),
      { headers: this.headers }).map((res: Response) => {
      const data = res.json();
      return data;
      });
  }

  viewActivity(id){
    return this.http.post(this.Base_URL+ '/viewActivity',   
      JSON.stringify(id),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  } 

  getScreenshot(id){
    return this.http.post(this.Base_URL+ '/getScreenshot',   
      JSON.stringify(id),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        console.log(data);
        return data;
      });
  }

  
  insertRuleOption(values){
    return this.http.post(this.Base_URL+ '/insertRuleOptions',   
      JSON.stringify(values),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }
  
  Payment(values){
    return this.http.post(this.Payment_URL ,   
      JSON.stringify(values),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }
  
  insertPayment(values){
    return this.http.post(this.Base_URL+ '/insertPayment',   
      JSON.stringify(values),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }
  
  valhalla_login(values){
    return this.http.post(this.Base_URL+ '/valhalla_login',   
      JSON.stringify(values),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  ViewCientbyExamCandidateID(values){
    return this.http.post(this.Base_URL+ '/ViewCientbyExamCandidateID',   
      JSON.stringify(values),
      { headers: this.headers }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  Generate_JWToken(values){
    return this.http.post('https://apis.examroom.ai/api/Test' ,   
      JSON.stringify(values),
      { headers: this.headers2 }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

  auto_login(values){
    return this.http.post('https://apis.examroom.ai/api/ExamLock' ,   
      JSON.stringify(values),
      { headers: this.headers2 }).map((res: Response) => {
        const data = res.json();
        return data;
      });
  }

}