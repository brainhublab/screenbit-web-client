import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SofiaSvgMapComponent } from './sofia-svg-map.component';

describe('SofiaSvgMapComponent', () => {
  let component: SofiaSvgMapComponent;
  let fixture: ComponentFixture<SofiaSvgMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SofiaSvgMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SofiaSvgMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
