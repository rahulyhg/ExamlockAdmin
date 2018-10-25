export class SubcriptionModel { 
    public sub_name:string;
    public sub_desc:string;
    public sub_cost:number;
    public validity;
    public devices;
    
    constructor(){
        this.sub_name = '';
        this.sub_desc ='';
    }
} 