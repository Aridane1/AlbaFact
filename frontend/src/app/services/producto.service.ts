import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  endpoint = 'http://localhost:8080/api/productos';
  constructor(private httpClient: HttpClient) {}

  getAllProductosByUserId() {
    let token = localStorage.getItem('token') as any;
    let decode = jwtDecode(token) as any;
    let userId = decode.id;
    return this.httpClient.get(this.endpoint + `/all-products/${userId}`);
  }

  getOneProduct(id: number) {
    return this.httpClient.get(this.endpoint + `/${id}`);
  }

  addProduct(product: any) {
    return this.httpClient.post(this.endpoint, product);
  }

  updateProduct(product: any, id: number) {
    return this.httpClient.put(this.endpoint + `/${id}`, product);
  }
}
