import { Component, OnInit, Input } from '@angular/core';

export interface DetailedPieDataRow {
  name: string;
  value: number;
}

@Component({
  selector: 'app-detailed-pie-chart',
  templateUrl: './detailed-pie-chart.component.html',
  styleUrls: ['./detailed-pie-chart.component.less']
})
export class DetailedPieChartComponent implements OnInit {
  @Input() data: DetailedPieDataRow[] = [];
  // options
  gradient: boolean = false;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;

  constructor() {  }

  onSelect(data): void {
    // // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnInit(): void {
  }

}
