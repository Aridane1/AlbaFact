import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  endpoint = 'http://localhost:8080/api/productos';
  constructor(private httpClient: HttpClient) {}

  getAllProductos() {
    return this.httpClient.get(this.endpoint);
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
