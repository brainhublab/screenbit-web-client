import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StationsService {

  private readonly basePath = `${environment.api_url}/stations`;
  constructor(
    private readonly http: HttpClient
  ) { }


  public getAreasViewers(areasIds: Array<string>) {
    return this.http.get<Array<{ viewers__sum: number | null }>>(`${this.basePath}/areas/viewers/`, {
      params: {
        areas: areasIds
      }
    }).pipe(first());
  }
}
