import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewclientComponent } from './addnewclient.component';

describe('AddnewclientComponent', () => {
  let component: AddnewclientComponent;
  let fixture: ComponentFixture<AddnewclientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddnewclientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddnewclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
