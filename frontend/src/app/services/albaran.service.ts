import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlbaranService {
  endpoint = 'http://localhost:8080/api/albaranes';
  constructor(private httpClient: HttpClient) {}

  postAlbaran() {
    return this.httpClient.post(this.endpoint, null);
  }

  getAllAlbaranes() {
    return this.httpClient.get(this.endpoint);
  }

  getAllAlbaranesByYear(year: number) {
    return this.httpClient.get(this.endpoint + `/${year}`);
  }

  getAlbaranByNumAlbaranAndYear(numAlbaran: number, year: number) {
    return this.httpClient.get(this.endpoint + `/${numAlbaran}/${year}`);
  }

  getDistinctYear() {
    return this.httpClient.get(this.endpoint + '/years');
  }
}
