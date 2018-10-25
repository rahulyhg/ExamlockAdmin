export class EditClientModel {
    public client_id:string;
    public username:string;
    public email:string;
    public password:string;
    public prefix:string;
    public comp_name:string;

    constructor(){
        this.username ='';
        this.password='';
        this.email='';
        this.prefix = '';
        this.comp_name='';
       
    }
} 