import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NzMessageService, UploadXHRArgs, UploadFile } from 'ng-zorro-antd';
import { Observable, Observer, Subscription } from 'rxjs';
import { AdsService, CreateAdPdto } from 'src/app/services/ads.service';
import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-ad',
  templateUrl: './create-ad.component.html',
  styleUrls: ['./create-ad.component.less']
})
export class CreateAdComponent implements OnInit {
  validateForm: FormGroup;
  public loading = false;
  percent = 0;

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
  };

  upload = (item: UploadXHRArgs): Subscription => {
    return new Observable<null>().subscribe();
  };

  handleChange(info: { file: UploadFile, type: string, fileList: Array<UploadFile> }): void {
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
    } else {
      this.createAd(this.validateForm.value);
    }
  }

  private createAd(ad: CreateAdPdto) {

    this.loading = true;
    this.adsService.post(ad)
      .subscribe(
        (event: HttpEvent<{}>) => {
          if (event.type === HttpEventType.UploadProgress) {
            if (event.total > 0) {
              this.percent = (event.loaded / event.total) * 100;
            }
          } else if (event instanceof HttpResponse) {
            // uploaded
            this.loading = false;
            const newAd = event.body;
            this.msg.success('Created');
            console.log(newAd);
          }
        },
        err => {
          // fail
          this.msg.error('Error creating ad');
          this.loading = false;
        });
  }



  constructor(
    private readonly fb: FormBuilder,
    private readonly msg: NzMessageService,
    private readonly adsService: AdsService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      media_file: [null, Validators.required],
      hours: [null, Validators.required],
    });
  }
}
