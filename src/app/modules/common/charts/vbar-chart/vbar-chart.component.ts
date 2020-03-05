import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';


@Component({
  selector: 'app-vbar-chart',
  templateUrl: './vbar-chart.component.html',
  styleUrls: ['./vbar-chart.component.less']
})
export class VbarChartComponent implements OnInit, OnChanges {
  data: Array<{ name: string, value: number }>;

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
      this.data = this.valuesPerHour.map((v, i) => {
        return { name: i.toString().padStart(2, '0'), value: (Math.round(Math.random() * v)) };
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const vphChange = changes.valuesPerHour;
    if (vphChange && vphChange.currentValue !== vphChange.previousValue) {
      this.data = this.valuesPerHour.map((v, i) => {
        return { name: i.toString().padStart(2, '0'), value: v };
      });
    }
  }

}
