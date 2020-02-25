import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analytics-entry',
  templateUrl: './analytics-entry.component.html',
  styleUrls: ['./analytics-entry.component.less']
})
export class AnalyticsEntryComponent implements OnInit {
  public isCollapsed = false;
  constructor() { }

  ngOnInit(): void {
  }

}
