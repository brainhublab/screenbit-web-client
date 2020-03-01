import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-vbar-chart',
  templateUrl: './vbar-chart.component.html',
  styleUrls: ['./vbar-chart.component.less']
})
export class VbarChartComponent implements OnInit {
  single: Array<{ name: string, value: number }>;
  multi: any[];

  @Input() valuesPerHour: Array<number> = [...Array(24).keys()];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Hours';
  showYAxisLabel = true;
  yAxisLabel = 'Interaction';
  barPadding = 24;
  colorScheme = {
    domain: [
      '#707070'
    ]
  };

  constructor() {
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
    if (this.valuesPerHour?.length > 24) {
      console.warn('Values per hour must contain <= 24 items');
    } else {
      this.single = this.valuesPerHour.map((v, i) => {
        return { name: i.toString().padStart(2, '0'), value: v };
      });
    }
  }

}
