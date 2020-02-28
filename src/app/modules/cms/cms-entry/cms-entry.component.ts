import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cms-entry',
  templateUrl: './cms-entry.component.html',
  styleUrls: ['./cms-entry.component.less']
})
export class CmsEntryComponent implements OnInit {
  public isCollapsed = false;
  constructor() { }

  ngOnInit(): void {
  }

}
