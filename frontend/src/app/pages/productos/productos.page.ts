import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],
})
export class ProductosPage implements OnInit {
  productos: any;
  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.getAllProductos();
  }

  ionViewWillEnter() {
    this.getAllProductos();
  }

  async getAllProductos() {
    this.productos = await firstValueFrom(
      this.productoService.getAllProductos()
    );
  }
}
