import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AlbaranService {
  endpoint = 'http://localhost:8080/api/albaranes';
  constructor(private httpClient: HttpClient) {}

  postAlbaran(user: any) {
    return this.httpClient.post(this.endpoint, user);
  }

  getAllAlbaranesByUserId(userId: number) {
    return this.httpClient.get(this.endpoint + `/albaranUser/${userId}`);
  }

  getAllAlbaranesByYearAndUser(year: number, userId: number) {
    return this.httpClient.get(this.endpoint + `/${year}/${userId}`);
  }

  getAlbaranByNumAlbaranAndYear(
    numAlbaran: number,
    year: number,
    userId: number
  ) {
    return this.httpClient.get(
      this.endpoint + `/${numAlbaran}/${year}/${userId}`
    );
  }

  getDistinctYear() {
    return this.httpClient.get(this.endpoint + '/years');
  }
}
