import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { AdsService } from 'src/app/services/ads.service';
import { NzMessageService } from 'ng-zorro-antd';
import { DetailedPieDataRow } from '../../common/charts/detailed-pie-chart/detailed-pie-chart.component';
import { LineChartDataRow } from '../../common/charts/line-chart/line-chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  public selectedAd: Ad = null;
  public ads: Array<Ad> = [];
  public pieData: Array<DetailedPieDataRow> = [];
  public lineData: Array<LineChartDataRow> = [];

  public loading = true;

  constructor(
    private readonly adsService: AdsService,
    private readonly msg: NzMessageService
  ) { }

  ngOnInit() {
    this.reload();
  }

  private async reload() {
    this.ads = await this.adsService.get().toPromise();
    this.pieData = this.ads.map(v => {
      return { name: v.title, value: v.id * 112 };
    });
    this.lineData = this.ads.map(v => {
      return {
        name: v.title,
        series: [
          {name: '2018', value: v.id * 112},
          {name: '2019', value: v.id * 50},
          {name: '2020', value: v.id * 200}
        ]
      };
    });
    this.loading = false;
  }

}
