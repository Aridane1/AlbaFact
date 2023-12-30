import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AlbaranService } from 'src/app/services/albaran.service';
import { InformationService } from 'src/app/services/information.service';
import { ProductoService } from 'src/app/services/producto.service';
import { jsPDF } from 'jspdf';

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

  generarPDF(): void {
    const doc = new jsPDF();

    const headers = [
      'Nº Albaran',
      'Lote',
      'Cantidad',
      'Kilos',
      'Precio',
      'Producto',
      'Importe',
    ];

    const data = this.informations.map((item: any) => [
      item.numAlbaran.toString(),
      item.lote.toString(),
      item.cantidad.toString(),
      item.kilosN.toString(),
      item.precio.toString() + '€',
      item.producto.toString(),
      item.importe.toString() + '€',
    ]);

    const marginLeft = 10;
    const marginTop = 20;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);

    doc.text('CSVidagri S.L.', 150, 8);
    doc.text('NIF.: B02875037', 150, 16);
    doc.text('Calle El Pilar, 25.', 150, 24);
    doc.text('35468 Gáldar. Las Palmas', 150, 32);
    let namePerson = prompt('Introduce el nombre de la persona:');
    let DNI = prompt('Introduce el DNI de la persona:');
    let numFactura = prompt('Introduce el numero de la factura:');

    doc.text(`Numero factura: ${numFactura}`, 150, 40);
    doc.text(`${namePerson}`, marginLeft, 8);
    doc.text('BARRANCO EL PINAR Nº10', marginLeft, 16);
    doc.text('FONTANALES MOYA', marginLeft, 24);
    doc.text(`DNi: ${DNI}`, marginLeft, 32);
    doc.text('CP: 34520', marginLeft, 40);

    const fechaActual = new Date();
    const mesActual = fechaActual.toLocaleDateString('es-ES', {
      month: 'long',
    });
    const ultimoDiaMes = new Date(
      fechaActual.getFullYear(),
      fechaActual.getMonth() + 1,
      0
    );
    const formattedFecha = ultimoDiaMes.toLocaleDateString();

    doc.text(
      `MES: ${mesActual.toUpperCase()}\tFECHA: ${formattedFecha}`,
      marginLeft,
      marginTop + 40
    );
    doc.line(10, marginTop + 42, 200, marginTop + 42);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);

    const rowHeight = 5;
    const tableWidth = headers.length * 25;
    let xPos = (doc.internal.pageSize.width - tableWidth) / 2;
    let yPos = marginTop + 50;

    data.unshift(headers);
    data.forEach((row: any) => {
      row.forEach((cell: any) => {
        doc.text(cell, xPos, yPos, { align: 'center' });
        xPos += 25;
      });

      yPos += rowHeight;
      xPos = (doc.internal.pageSize.width - tableWidth) / 2;
    });

    const additionalInfoYPos = yPos + 10;
    doc.setFontSize(8);
    doc.text(`Total bruto: ${this.bruto.toFixed(2)}`, 150, additionalInfoYPos);
    doc.text(
      `Descuento: ${this.descuento.toFixed(2)}`,
      150,
      additionalInfoYPos + 8
    );
    doc.text(
      `Total neto: ${this.neto.toFixed(2)}`,
      150,
      additionalInfoYPos + 16
    );

    doc.output('dataurlnewwindow');
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
