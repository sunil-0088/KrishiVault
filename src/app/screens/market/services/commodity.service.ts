import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchDto } from '../model/search-dto';
import { start } from '@popperjs/core';

@Injectable({
  providedIn: 'root',
})
export class CommodityService {
  apikey = environment.commodityApiKey;
  apiUrl = environment.commodityApiUrl;

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  fetchCommodities(): Observable<any> {
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${this.apikey}`,
    };
    return this.http.get(`${this.apiUrl}/get-commodities/?type=1`, { headers });
  }
  fetchCommodityAreas(cId: number): Observable<any> {
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${this.apikey}`,
    };
    return this.http.get(
      `${this.apiUrl}/get-commodity-areas/?type=2&commodity=${cId}`,
      { headers }
    );
  }
  GetCommodityPrices(data: SearchDto): Observable<any> {
    const headers = {
      accept: 'application/json',
      Authorization: `Bearer ${this.apikey}`,
    };
    return this.http.get(
      `${this.apiUrl}/get-commodity-prices/?states=${[data.state]}
      &districts=${[data.district]}
      &markets=${[
        data.market,
      ]}&date_from=2024-06-02&date_to=2024-06-26&commodity=${data.commodity}`,
      { headers }
    );
  }
}
