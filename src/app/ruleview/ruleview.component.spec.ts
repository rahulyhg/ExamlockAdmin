import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleviewComponent } from './ruleview.component';

describe('RuleviewComponent', () => {
  let component: RuleviewComponent;
  let fixture: ComponentFixture<RuleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
