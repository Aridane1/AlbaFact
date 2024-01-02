import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  endpoint = 'http://localhost:8080/api/cliente';

  constructor(private httpClient: HttpClient) {}

  getAllByUserId() {
    let token = localStorage.getItem('token') as any;
    let decode = jwtDecode(token) as any;
    return this.httpClient.get(this.endpoint + `/${decode.id}`);
  }
  getOneClient(id: any) {
    return this.httpClient.get(this.endpoint + `/one-client/${id}`);
  }

  addClient(client: any) {
    return this.httpClient.post(this.endpoint, client);
  }

  updateClient(id: any, client: any) {
    return this.httpClient.put(this.endpoint + `/${id}`, client);
  }
}
