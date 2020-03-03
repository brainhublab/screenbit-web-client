import { Component, OnInit, Input } from '@angular/core';
export interface RetentionChartDataRow {
  name: string;
  series: Array<{ name: string, value: number }>;
}

@Component({
  selector: 'app-retention-chart',
  templateUrl: './retention-chart.component.html',
  styleUrls: ['./retention-chart.component.less']
})
export class RetentionChartComponent {

  @Input() data: RetentionChartDataRow[];
  // options
  legend: boolean = false;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  yAxisLabel: string = '';

  colorScheme = {
    domain: [
      '#7aa3e5',
      // '#9abbf1',
      // '#a8c5f3',
      // '#b1cdfa',
      // '#b7d0f8',
      // '#bbd1f5',
      // '#cbdfff',
      // '#dde9fd',
      // '#f0f5ff',
      '#eee',
    ].reverse()
  };

  constructor() {
  }

  onSelect(data): void {
    // console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    // console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    // console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
