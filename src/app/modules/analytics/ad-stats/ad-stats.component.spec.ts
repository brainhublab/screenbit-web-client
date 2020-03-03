import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdStatsComponent } from './ad-stats.component';

describe('AdStatsComponent', () => {
  let component: AdStatsComponent;
  let fixture: ComponentFixture<AdStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
