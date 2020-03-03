import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { LineChartDataRow } from '../../common/charts/line-chart/line-chart.component';
import { MapStatDataRow } from '../../common/charts/sofia-svg-map/sofia-svg-map.component';

function datediff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

const getDaysArray = (s, e) => {
  let start = new Date(s);
  let end = new Date(e);

  for (var arr = [], dt = start; dt <= end; dt.setDate(dt.getDate() + 1)) {
    arr.push(new Date(dt));
  }
  return arr;
};

@Component({
  selector: 'app-ad-stats',
  templateUrl: './ad-stats.component.html',
  styleUrls: ['./ad-stats.component.less']
})
export class AdStatsComponent implements OnInit, OnChanges {
  @Input() ad: Ad;
  public lineData: Array<LineChartDataRow> = [];
  public mapData: Array<MapStatDataRow> = [];

  from: Date;
  to: Date;
  constructor() {
  }

  ngOnInit(): void {
    this.initDates();
  }

  private initDates() {
    if (!this.from || !this.to) {
      this.from = new Date();
      this.to = new Date();
      this.to.setDate(this.to.getDate() + 27);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const adChange = changes.ad;
    if (adChange.currentValue) {
      this.initDates();
      console.log(this.from, this.to);
      const days = getDaysArray(this.from, this.to);
      console.log(days.length);
      const series = days.map((date: Date, index) => {
        const r = {
          name: `${date.toLocaleDateString()}`,
          value: Math.round(this.ad.areas.length * this.ad.hours.length * Math.random() * 1000)
        };
        return r;
      });
      this.lineData = [{
        name: 'Views',
        series: series
      },
      {
        name: 'Potential Views',
        series: series.map(v => {
          return { ...v, value: Math.round(this.ad.areas.length * this.ad.hours.length * 1000) }
        })
      },
      {
        name: 'Reached Views',
        series: series.map(v => {
          return { ...v, value: Math.round(this.ad.areas.length * this.ad.hours.length * Math.random() * 1000) }
        })
      },
      {
        name: 'Slides in',
        series: series.map(v => {
          return { ...v, value: Math.round(this.ad.areas.length * Math.random() * 1000) }
        })
      }];
      this.mapData = this.ad.areas.map(a => {
        return { id: a, value: .5 }
      });
      console.log(this.ad.areas, this.mapData);
      // {
      //   id: '152',
      //   value: 1
      // },
      // {
      //   id: '201',
      //   value: .3
      // }
      // ]
    }
  }

}
