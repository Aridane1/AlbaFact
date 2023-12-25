import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InformationService {
  endpoint = 'http://localhost:8080/api/information';

  constructor(private httpClient: HttpClient) {}

  addManyInformation(albaran: any) {
    return this.httpClient.post(`${this.endpoint}/many`, albaran);
  }

  addOneInformation(albaran: any) {
    return this.httpClient.post(`${this.endpoint}/one`, albaran);
  }

  modifyInfoAlbaran(albaran: any) {
    return this.httpClient.put(`${this.endpoint}/update`, albaran);
  }

  getInfoAlbaran(numAlbaran: number, year: number) {
    return this.httpClient.get(`${this.endpoint}/${numAlbaran}/${year}`);
  }

  getManyInfoAlbaran(albaran: any) {
    return this.httpClient.post(`${this.endpoint}/many-information`, albaran);
  }

  deleteInfo(id: number) {
    return this.httpClient.delete(`${this.endpoint}/${id}`);
  }
}
