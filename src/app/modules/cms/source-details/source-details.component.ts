import { Component, OnInit } from '@angular/core';
import { AdsService } from 'src/app/services/ads.service';
import { Ad } from 'src/app/models/ad';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-source-details',
  templateUrl: './source-details.component.html',
  styleUrls: ['./source-details.component.less']
})
export class SourceDetailsComponent implements OnInit {
  public ad: Ad = null;
  public loading = true;
  constructor(
    private readonly adsService: AdsService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly msg: NzMessageService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(pm => {
      const sId = pm.get('sourceId');
      this.reload(sId);
    });
  }

  private async reload(id: string | number) {
    this.ad = await this.adsService.getById(id).toPromise();
    this.loading = false;
  }

  public goBack() {
    this.router.navigate(['..'], {relativeTo: this.route});
  }

  public async deleteAd(ad: Ad) {
    try {
      const result = await this.adsService.delete(ad.id).toPromise();
      this.msg.success("Successfully deleted ad.");
      this.goBack();
    } catch (e) {
      this.msg.error("Error deleting ad.");
      console.log('Error:', e);
    }
  }


  public async toggleActiveStatus(event: any, ad: Ad) {
    try {
      if (ad.is_active) {
        const result = await this.adsService.disable(ad.id).toPromise();
        if (result.message) {
          this.reload(ad.id);
          this.msg.success("Disabled ad");
        }
      } else {
        const result = await this.adsService.enable(ad.id).toPromise();
        if (result.message) {
          this.reload(ad.id);
          this.msg.success("Enabled ad");
        }
      }
    } catch (e) {
      this.msg.error("Error changing ad status.");
      console.log(e);
    }
  }
}
