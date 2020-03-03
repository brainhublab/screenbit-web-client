import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { DetailedPieDataRow } from '../../common/charts/detailed-pie-chart/detailed-pie-chart.component';
import { LineChartDataRow } from '../../common/charts/line-chart/line-chart.component';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.less']
})
export class SummaryComponent implements OnInit, OnChanges {
  @Input() public ads: Array<Ad> = [];
  public pieData: Array<DetailedPieDataRow> = [];
  public lineData: Array<LineChartDataRow> = [];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    const adsChange: SimpleChange = changes.ads;
    if (adsChange.currentValue) {
      this.resync(adsChange.currentValue);
    }
  }

  private resync(ads: Array<Ad>) {
    this.pieData = ads.map(v => {
      return { name: v.title, value: v.id * 112 };
    });
    this.lineData = ads.map(v => {
      return {
        name: v.title,
        series: [
          { name: '2018', value: v.id * 112 },
          { name: '2019', value: v.id * 50 },
          { name: '2020', value: v.id * 200 }
        ]
      };
    });
  }
}
