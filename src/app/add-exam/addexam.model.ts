export class ExamModel {
    public exam_name:any;
    public client_id:any;
    public exam_desc:any;
    public rule_id:any;
    public subs_id:any;
    public created_by:any;
    public billing_cycle:any;
    public bulk_discount:any;
    public amount:any;
    public access_token:any;
    public test_url;
    public inv_id;
     total_limit;
     exam_id;
     custom_plan;
    

    constructor(){
        this.exam_name =''
        this.client_id ='';
        this.exam_desc='';
        this.rule_id = '';
        this.subs_id ='';
        this.created_by ='';
        this.billing_cycle='';
        this.bulk_discount = '';
    }
}

