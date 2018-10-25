import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

}

@Component({
  selector: 'test_url_alert',
  templateUrl: './test_url_alert.html',
  styleUrls: ['./alert.component.css']
})
export class TestUrlComponent {
  constructor(
    public dialogRef: MatDialogRef<TestUrlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any){}

}
