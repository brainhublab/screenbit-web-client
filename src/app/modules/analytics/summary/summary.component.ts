import { Component, OnInit, Input, SimpleChanges, SimpleChange, OnChanges } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { DetailedPieDataRow } from '../../common/charts/detailed-pie-chart/detailed-pie-chart.component';
import { LineChartDataRow } from '../../common/charts/line-chart/line-chart.component';
import { MapStatDataRow } from '../../common/charts/sofia-svg-map/sofia-svg-map.component';


const getDaysArray = (s, e) => {
  let start = new Date(s);
  let end = new Date(e);

  for (var arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.less']
})
export class SummaryComponent implements OnInit, OnChanges {
  @Input() public ads: Array<Ad> = [];
  public pieData: Array<DetailedPieDataRow> = [];
  public mapData: Array<MapStatDataRow> = [];
  public lineData: Array<LineChartDataRow> = [];
  from: Date;
  to: Date;
  private readonly dates;

  constructor() {
    this.from = new Date();
    this.to = new Date();
    this.to.setDate(this.to.getDate() + 10);
    this.dates = getDaysArray(this.from, this.to);
  }

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
        series: this.dates.map((date: Date) => {
          return {
            name: `${date.toLocaleDateString()}`,
            value: Math.round(date.getDay() * Math.random() * 1000)
          };
        })
      };
    });
    this.mapData = [...Array(217).keys()].map(a => {
      return {
        id: a.toString(),
        value: a / 100 * .5,
        tooltip: [
          {
            name: 'Viewers',
            value: `${a * 100}`,
            color: 'red'
          }
        ]
      };
    });


  }
}
