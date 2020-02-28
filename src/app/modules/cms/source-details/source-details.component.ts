import { Component, OnInit } from '@angular/core';
import { AdsService } from 'src/app/services/ads.service';
import { Ad } from 'src/app/models/ad';
import { ActivatedRoute } from '@angular/router';

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
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(pm => {
      const sId = pm.get('sourceId');
      this.reload(sId);
    });
  }

  private async reload(id: string) {
    this.ad = await this.adsService.getById(id).toPromise();
    this.loading = false;
  }
}
