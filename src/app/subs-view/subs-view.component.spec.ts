import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsViewComponent } from './subs-view.component';

describe('SubsViewComponent', () => {
  let component: SubsViewComponent;
  let fixture: ComponentFixture<SubsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
