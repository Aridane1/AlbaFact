import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AlbaranService } from 'src/app/services/albaran.service';
import { InformationService } from 'src/app/services/information.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-generar-factura',
  templateUrl: './generar-factura.page.html',
  styleUrls: ['./generar-factura.page.scss'],
})
export class GenerarFacturaPage implements OnInit {
  albaranes: any;
  informations: any;
  productos: any;
  datosSeleccionados: any = [];
  bruto: number = 0;
  irpf: number = 2;
  descuento: number = 0;
  neto: number = 0;

  constructor(
    private albaranService: AlbaranService,
    private productoService: ProductoService,
    private informationService: InformationService
  ) {}

  ngOnInit() {
    this.getAllAlbaranes();
    this.changeYear(new Date().getFullYear());
  }

  async getAllAlbaranes() {
    let response = await firstValueFrom(this.albaranService.getAllAlbaranes());
    this.albaranes = response;
  }

  async getAllProducts() {
    const response = await firstValueFrom(
      this.productoService.getAllProductos()
    );
    this.productos = response;
  }

  getProductById(id: number) {
    return this.productoService.getOneProduct(id);
  }

  onCheckboxChange(elemento: any) {
    const index = this.datosSeleccionados.findIndex(
      (item: any) => item.numAlbaran === elemento.numAlbaran
    );

    if (index !== -1) {
      this.datosSeleccionados.splice(index, 1);
    } else {
      this.datosSeleccionados.push({
        numAlbaran: elemento.numAlbaran,
        year: elemento.year,
      });
    }
  }

  changeYear(year: number) {
    this.albaranService.getAllAlbaranesByYear(year).subscribe((response) => {
      this.albaranes = response;
    });
  }

  async enviarDatosABaseDeDatos() {
    this.informations = await firstValueFrom(
      this.informationService.getManyInfoAlbaran(this.datosSeleccionados)
    );

    this.bruto = 0;

    for (const iterator of this.informations) {
      let producto: any = await firstValueFrom(
        this.getProductById(iterator.productoId)
      );
      iterator.producto = producto.name;

      const importeNumerico = parseFloat(iterator.importe) || 0;

      this.bruto += importeNumerico;
    }
    this.descuento = this.bruto * (this.irpf / 100);
    this.neto = this.bruto - this.descuento;
  }
}
