import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessActivityComponent } from './access-activity.component';

describe('AccessActivityComponent', () => {
  let component: AccessActivityComponent;
  let fixture: ComponentFixture<AccessActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
