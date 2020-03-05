import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { NzMessageService, UploadXHRArgs, UploadFile } from 'ng-zorro-antd';
import { Observable, Observer, Subscription } from 'rxjs';
import { AdsService, CreateAdPdto } from 'src/app/services/ads.service';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Area, Ad } from 'src/app/models/ad';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, map, catchError } from 'rxjs/operators';
import { StationsService } from 'src/app/services/stations.service';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.less']
})
export class CreateAdComponent implements OnInit {
  validateForm: FormGroup;
  loading = false;
  percent = 0;
  areasOptions: Array<Area> = [];
  max_desired_viewers = 0;
  selected_media_type: 'IM' | 'VD' = null;

  marks: any = {
    0: 0,
    [this.max_desired_viewers]: this.max_desired_viewers
  };
  formatterDuration = (value: number) => `${value} s`;
  parserDuration = (value: string) => value.replace(' s', '');

  requiredIfImage = (control: AbstractControl): ValidationErrors | null => {
    return this.selected_media_type === 'IM' && !control.value ? { required: true } : null;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly msg: NzMessageService,
    private readonly adsService: AdsService,
    private readonly stationsService: StationsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }


  public goBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  ngOnInit(): void {
    this.initForm();
    this.reloadAreas();

    this.validateForm.controls.areas.valueChanges.pipe(debounceTime(2000)).subscribe(this.updateMaxDesiredViewers);
    this.validateForm.controls.media_file.valueChanges.pipe(debounceTime(1000)).subscribe(this.updateMediaFileType);
  }

  private initForm() {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      media_file: [null, Validators.required],
      duration: [10, [this.requiredIfImage]],
      hours: [null, Validators.required],
      areas: [null, [Validators.required, Validators.minLength(1)]],
      desired_viewers: [1, [
        Validators.required,
        Validators.min(10),
        (control: AbstractControl) => Validators.max(this.max_desired_viewers)(control)
      ]],
    });
  }

  private updateMediaFileType = (file: UploadFile) => {
    if (!file) {
      this.selected_media_type = null;
    } else if (file.type.startsWith('video')) {
      this.selected_media_type = 'VD';
    } else if (file.type.startsWith('image')) {
      this.selected_media_type = 'IM';
    }
  }

  private updateMaxDesiredViewers = async (v: Array<string>) => {
    if (v && v.length > 0) {
      // this.max_desired_viewers = v.map(s => parseInt(s)).reduce((acc: number, cv) => acc + (cv * 1100), 0);
      try {
        this.max_desired_viewers = await this.getMaxDesiredViewers(v).toPromise();
        console.log(this.max_desired_viewers);
      } catch(e) {
        console.log(e);
      }
    } else {
      this.max_desired_viewers = 0;
    }

    this.marks = {
      1: 1,
      [this.max_desired_viewers]: this.max_desired_viewers
    };
  }

  private getMaxDesiredViewers(areas: Array<string>): Observable<number | null> {
    return this.stationsService.getAreasViewers(areas).pipe(map(r => r.viewers__sum || 0));
  }

  private async reloadAreas() {
    try {
      this.areasOptions = await this.adsService.getAreas().toPromise();
    } catch (e) {
      console.error("Error loading areas...");
    }
  }


  beforeUpload = (file: File) => {
    this.loading = true;
    return new Observable((observer: Observer<boolean>) => {
      const isLt50M = file.size / 1024 / 1024 < 50;
      if (!isLt50M) {
        this.msg.error('Image must smaller than 50MB!');
        observer.complete();
        return;
      }
      this.loading = true;

      observer.next(isLt50M);
      observer.complete();
    });
  }

  upload = (item: UploadXHRArgs): Subscription => {
    return new Observable<null>().subscribe();
  }

  handleFileChange(info: { file: UploadFile, type: string, fileList: Array<UploadFile> }): void {
    this.loading = false;
    info.file.status = 'success';
    this.validateForm.patchValue({
      media_file: info.fileList.length > 0 ? info.fileList[0] : null
    });
  }


  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.invalid && this.validateForm.controls.media_file.errors) {
      this.msg.error("Upload media file please!");
      return;
    } else if (this.validateForm.valid) {
      this.createAd(this.validateForm.value);
    }
  }

  private createAd(ad: CreateAdPdto) {

    this.loading = true;
    ad = {
      ...ad,
      percent_to_load: Math.round((ad.desired_viewers / this.max_desired_viewers) * 100)
    };
    this.adsService.post(ad)
      .subscribe(
        (event: HttpEvent<{} | Ad>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total > 0) {
              this.percent = (event.loaded / event.total) * 100;
            }
          } else if (event instanceof HttpResponse) {
            // uploaded
            this.loading = false;
            const newAd: Ad = event.body as Ad;
            this.msg.success(`Created ad ${newAd.title}`);
            this.router.navigate(['..', newAd.id], { relativeTo: this.route });
          }
        },
        err => {
          // fail
          this.msg.error('Error creating ad');
          this.loading = false;
          console.log("Error:", err);
        });
  }

}
