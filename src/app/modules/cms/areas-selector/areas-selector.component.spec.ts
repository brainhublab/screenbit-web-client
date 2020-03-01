import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasSelectorComponent } from './areas-selector.component';

describe('AreasSelectorComponent', () => {
  let component: AreasSelectorComponent;
  let fixture: ComponentFixture<AreasSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
