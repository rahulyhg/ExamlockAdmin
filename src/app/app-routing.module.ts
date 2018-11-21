import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { ExamComponent } from './exam/exam.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AddsubscriptionComponent } from './addsubscription/addsubscription.component';
import { AccesscodeComponent } from './accesscode/accesscode.component';
import { AddnewclientComponent } from './addnewclient/addnewclient.component';
import { AddinvoiceComponent } from './addinvoice/addinvoice.component';
import { AuthGuard } from './services/auth/auth.guard';
import { ClientViewComponent } from './client-view/client-view.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { EditSubscriptionComponent } from './edit-subscription/edit-subscription.component';
import { AddRuleComponent } from './add-rule/add-rule.component';
import { RuleviewComponent } from './ruleview/ruleview.component';
import { ExamViewComponent } from './exam-view/exam-view.component';
import { EditExamComponent } from './edit-exam/edit-exam.component';
import { AppComponent } from './app.component';
import { RuleOptionsComponent } from './rule-options/rule-options.component';
import { SubsViewComponent } from './subs-view/subs-view.component';
import { AccessLogComponent } from './access-log/access-log.component';
import { AlertComponent } from './alert/alert.component';
import { AccessActivityComponent } from './access-activity/access-activity.component';
import { EditRuleComponent } from './edit-rule/edit-rule.component';
import { ScreenshotComponent } from './screenshot/screenshot.component';

const appRoutes: Routes = [ 
    { path: '', redirectTo:'login', pathMatch:'full' },
    { path: 'login/:id', component: LoginComponent },
    { path: 'login', component: LoginComponent },    
    { path: 'app/:id', component: AppComponent },
    { path: 'client', component: ClientComponent, canActivate: [AuthGuard] },
    { path: 'newclient', component: AddnewclientComponent, canActivate: [AuthGuard] },
    { path: 'exam', component: ExamComponent, canActivate: [AuthGuard] },
    { path: 'accesscode', component: AccesscodeComponent, canActivate: [AuthGuard] },
    { path: 'subscription', component: SubscriptionComponent, canActivate: [AuthGuard] },
    { path: 'addsubscription', component: AddsubscriptionComponent, canActivate: [AuthGuard] },
    { path: 'invoice', component: InvoiceComponent, canActivate: [AuthGuard] },
    { path: 'newinvoice', component: AddinvoiceComponent, canActivate: [AuthGuard] },
    { path: 'view_client/:id', component: ClientViewComponent, canActivate: [AuthGuard]  },
    { path: 'edit_client/:id', component: EditClientComponent, canActivate: [AuthGuard]  },
    { path: 'newexam', component: AddExamComponent, canActivate: [AuthGuard] },   
    { path: 'edit_subscription/:id', component: EditSubscriptionComponent, canActivate: [AuthGuard] },
    { path: 'view_subscription/:id', component: SubsViewComponent, canActivate: [AuthGuard] },    
    { path: 'rule_options', component: RuleOptionsComponent, canActivate: [AuthGuard] },                     
    { path: 'new_rule', component: AddRuleComponent, canActivate: [AuthGuard] },       
    { path: 'rule_view/:id', component: RuleviewComponent, canActivate: [AuthGuard] },   
    { path: 'exam_view/:id', component: ExamViewComponent, canActivate: [AuthGuard] },
    { path: 'edit_exam/:id', component: EditExamComponent, canActivate: [AuthGuard] },  
    { path: 'edit_rule/:id', component: EditRuleComponent, canActivate: [AuthGuard] },    
    { path: 'rule_options', component: RuleOptionsComponent, canActivate: [AuthGuard] },                 
    { path: 'alert', component: AlertComponent, canActivate: [AuthGuard] },                 
    { path: 'access_log', component: AccessLogComponent, canActivate: [AuthGuard] },                 
    { path: 'activity/:id', component: AccessActivityComponent, canActivate: [AuthGuard] },   
    { path: 'Screenshot/:id', component: ScreenshotComponent, canActivate: [AuthGuard] },      
    { path: 'logout', component: LoginComponent },            
];

@NgModule({
    imports:[RouterModule.forRoot(appRoutes,{useHash:true})],
    exports:[RouterModule]
})
export class AppRoutingModule {}