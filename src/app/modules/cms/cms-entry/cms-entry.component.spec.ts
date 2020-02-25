import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsEntryComponent } from './cms-entry.component';

describe('CmsEntryComponent', () => {
  let component: CmsEntryComponent;
  let fixture: ComponentFixture<CmsEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
