import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { AdsService } from 'src/app/services/ads.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.less']
})
export class AdvertisementsComponent implements OnInit {
  public data: Array<Ad> = [];
  public loading = true;
  constructor(
    private readonly adsService: AdsService,
    private readonly msg: NzMessageService
  ) { }

  ngOnInit() {
    this.reload();
  }

  private async reload() {
    this.data = await this.adsService.get().toPromise();
    this.loading = false;
  }

  public async toggleActiveStatus(event: any, ad: Ad) {
    try {
      if (ad.is_active) {
        const result = await this.adsService.disable(ad.id).toPromise();
        if (result.message) {
          this.reload();
          this.msg.success("Disabled ad");
        }
      } else {
        const result = await this.adsService.enable(ad.id).toPromise();
        if (result.message) {
          this.reload();
          this.msg.success("Enabled ad");
        }
      }
    } catch (e) {
      this.msg.error("Error changing ad status.");
      console.log(e);
    }
  }

}
