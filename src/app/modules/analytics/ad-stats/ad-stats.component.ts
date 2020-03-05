import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { LineChartDataRow } from '../../common/charts/line-chart/line-chart.component';
import { MapStatDataRow } from '../../common/charts/sofia-svg-map/sofia-svg-map.component';
import { RetentionChartDataRow } from '../../common/charts/retention-chart/retention-chart.component';

function datediff(first, second) {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

type Series = Array<{ name: string, value: number }>;

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
  public retentionData: Array<RetentionChartDataRow> = [];
  private readonly emptyCells: Array<[any, any]> = [[0, 3], [1, 1], [1, 5], [2, 4], [4, 3]];

  from: Date;
  to: Date;
  constructor() {
  }

  ngOnInit(): void {
    this.initDates();
  }

  ngOnChanges(changes: SimpleChanges) {
    const adChange = changes.ad;
    if (adChange.currentValue) {
      const series: Series = this.generateSeries();
      this.lineData = this.generateLineData(series);
      this.mapData = this.generateMapData();
      this.retentionData = this.generateRetentionData(series);
    }
  }

  private initDates() {
    if (!this.from || !this.to) {
      this.from = new Date();
      this.to = new Date();
      this.to.setDate(this.to.getDate() + 27);
    }
  }

  private generateSeries(): Series {
    this.initDates();
    const days = getDaysArray(this.from, this.to);
    return days.map((date: Date, index) => {
      const r = {
        name: `${date.toLocaleDateString()}`,
        value: Math.round(this.ad.areas.length * this.ad.hours.length * Math.random() * 1000)
      };
      return r;
    });
  }

  private generateRetentionData = (series: Series) => {
    return [...new Array(5)].map((v, wi) => {
      return {
        name: `Week ${wi}`,
        series: series.slice(0, 6).map((sv, j) => {
          let value = 100 - 10 * (wi + j);
          const idxs = [wi, j];
          if (this.emptyCells.find(v => v[0] === idxs[0] && v[1] === idxs[1])) {
            value = 1;
          }
          return {
            name: sv.name,
            value
          };
        })
      };
    });
  }

  private generateMapData() {
    return this.ad.areas.map(a => {
      return {
        id: a, value: parseInt(a) / 100 * .5, tooltip: [
          {
            name: 'Viewers',
            value: `${parseInt(a) * 100}`,
            color: 'red'
          }
        ]
      };
    });
  }
  private generateLineData(series: Series) {
    return [{
      name: 'Views',
      series
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

  }

}
