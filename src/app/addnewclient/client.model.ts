export class ClientModel {
    public username:string;
    public email:string;
    public password:string;
    public prefix:string;
    public comp_name:string;
    public status:number;
    public is_deleted:number;

    constructor(){
        this.username =''
        this.password ='';
        this.email='';
        this.prefix = '';
        this.comp_name='';
        this.status=1;
        this.is_deleted=0;
    }
}