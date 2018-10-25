import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from "@angular/router";
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { LoadersCssModule } from 'angular2-loaders-css';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { ExamComponent } from './exam/exam.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { AddsubscriptionComponent } from './addsubscription/addsubscription.component';
import { AccesscodeComponent } from './accesscode/accesscode.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { AddnewclientComponent } from './addnewclient/addnewclient.component';
import { AddinvoiceComponent } from './addinvoice/addinvoice.component';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { RequestApi } from './services/request.api';
import { AppRoutingModule } from './app-routing.module';
import { ClientViewComponent } from './client-view/client-view.component';
import { FilterPipe } from './filter.pipe';
import { EditClientComponent } from './edit-client/edit-client.component';
import { AddExamComponent } from './add-exam/add-exam.component';
import { EditSubscriptionComponent } from './edit-subscription/edit-subscription.component';
import { AddRuleComponent } from './add-rule/add-rule.component';
import { RuleAlertDialog } from './add-rule/add-rule.component';
import { RuleviewComponent, getnameDialog } from './ruleview/ruleview.component';
import { ExamViewComponent } from './exam-view/exam-view.component';
import { EditExamComponent } from './edit-exam/edit-exam.component';
import { RuleOptionsComponent, NoSpaceAlertDialog} from './rule-options/rule-options.component';
import { RlTagInputModule } from 'angular2-tag-input';
import { SubsViewComponent } from './subs-view/subs-view.component';
import { AlertComponent, TestUrlComponent } from './alert/alert.component';
import { AccessLogComponent } from './access-log/access-log.component';
import { AccessActivityComponent } from './access-activity/access-activity.component';
import { PaymentFormComponent, PaymentAertDialog } from './payment-form/payment-form.component';
import { EditRuleComponent } from './edit-rule/edit-rule.component';
import { ScreenshotComponent } from './screenshot/screenshot.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientComponent,
    ExamComponent,
    InvoiceComponent,
    SubscriptionComponent,
    AddsubscriptionComponent,
    AccesscodeComponent,
    SidemenuComponent,
    AddnewclientComponent,
    AddinvoiceComponent,
    ClientViewComponent,
    FilterPipe,
    EditClientComponent,
    AddExamComponent,
    EditSubscriptionComponent,
    AddRuleComponent,
    RuleviewComponent,
    ExamViewComponent,
    EditExamComponent,
    RuleOptionsComponent,
    SubsViewComponent,
    AlertComponent,
    AccessLogComponent,
    AccessActivityComponent,
    RuleAlertDialog,
    TestUrlComponent,
    NoSpaceAlertDialog,
    PaymentFormComponent,
    PaymentAertDialog,
    EditRuleComponent,
    getnameDialog,
    ScreenshotComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RlTagInputModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    ChartsModule,
    AppRoutingModule,
    LoadersCssModule,
    Ng4LoadingSpinnerModule.forRoot(), 
   
  ],
  providers: [AuthService, AuthGuard, RequestApi],
  bootstrap: [AppComponent],
  entryComponents: [
      RuleAlertDialog,
      TestUrlComponent,
      NoSpaceAlertDialog, 
      PaymentFormComponent,
      PaymentAertDialog,
      getnameDialog,
    ]
})
export class AppModule {}