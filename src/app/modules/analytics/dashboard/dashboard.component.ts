import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { AdsService } from 'src/app/services/ads.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  public selectedAd: Ad = null;
  public ads: Array<Ad> = [];

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

    this.loading = false;
  }

}
