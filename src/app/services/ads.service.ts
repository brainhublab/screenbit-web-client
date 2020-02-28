import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Ad } from '../models/ad';
import { first, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UploadFile } from 'ng-zorro-antd';

export interface CreateAdPdto {
  title: string;
  description: string;
  hours: Array<number>;
  media_file: UploadFile
}

@Injectable({
  providedIn: 'root'
})
export class AdsService {
  private readonly basePath = `${environment.api_url}/ads`;
  constructor(
    private readonly http: HttpClient
  ) { }


  public get() {
    return this.http.get<Array<Ad>>(`${this.basePath}/`).pipe(first());
  }

  public getById(id: string) {
    return this.http.get<Ad>(`${this.basePath}/${id}/`).pipe(first());
  }

  public post(ad: Partial<CreateAdPdto>): Observable<HttpEvent<{}>> {
    // return this.http.post<Ad>(`${this.basePath}/`, ad).pipe();

    const formData = this.getFd(ad);

    const req = new HttpRequest('POST', `${this.basePath}/`, formData, {
      reportProgress: true,
      withCredentials: true,
    });

    return this.http.request(req).pipe(
      catchError(error => {
        // this.errorHandlerService.handleError(error);
        return throwError(error);
      })
    );
  }

  public put(ad: Partial<Ad>) {
    return this.http.put<Ad>(`${this.basePath}/`, ad).pipe();
  }


  private getFd(ad: Partial<CreateAdPdto>): FormData {
    const formData = new FormData();

    for (const key in ad) {
      if (key === 'media_file') {
        console.log(ad.media_file);
        formData.append(`media_file`, ad.media_file.originFileObj);
      } else {
        formData.append(key, ad[key]);
      }
    }

    return formData;
  }

}
