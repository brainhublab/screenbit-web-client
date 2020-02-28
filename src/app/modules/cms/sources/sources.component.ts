import { Component, OnInit } from '@angular/core';
import { Ad } from 'src/app/models/ad';
import { AdsService } from 'src/app/services/ads.service';

@Component({
  selector: 'app-sources',
  templateUrl: './sources.component.html',
  styleUrls: ['./sources.component.less']
})
export class SourcesComponent implements OnInit {
  public data: Array<Ad> = [];
  public loading = true;
  constructor(
    private readonly adsService: AdsService
  ) { }

  ngOnInit() {
    this.reload();
  }

  private async reload() {
    this.data = await this.adsService.get().toPromise();
    this.loading = false;
  }

}
