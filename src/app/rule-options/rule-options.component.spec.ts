import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RuleOptionsComponent } from './rule-options.component';

describe('RuleOptionsComponent', () => {
  let component: RuleOptionsComponent;
  let fixture: ComponentFixture<RuleOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RuleOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RuleOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
