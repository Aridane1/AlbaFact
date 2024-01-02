import { Component, OnInit } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { firstValueFrom } from 'rxjs';
import { AlbaranService } from 'src/app/services/albaran.service';
import { InformationService } from 'src/app/services/information.service';
import { ProductoService } from 'src/app/services/producto.service';
import { jsPDF } from 'jspdf';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-generar-factura',
  templateUrl: './generar-factura.page.html',
  styleUrls: ['./generar-factura.page.scss'],
})
export class GenerarFacturaPage implements OnInit {
  albaranes: any;
  clientes: any;
  clienteSelected: any;
  informations: any;
  productos: any;
  datosSeleccionados: any = [];
  bruto: number = 0;
  irpf: number = 2;
  descuento: number = 0;
  neto: number = 0;
  token: any;

  constructor(
    private albaranService: AlbaranService,
    private clientService: ClienteService,
    private productoService: ProductoService,
    private informationService: InformationService
  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.getAllAlbaranes();
    this.getAllClientByUserId();
    this.changeYear(new Date().getFullYear());
  }

  async getAllAlbaranes() {
    let decode = jwtDecode(this.token) as any;
    let userId = decode.id;
    let response = await firstValueFrom(
      this.albaranService.getAllAlbaranesByUserId(userId)
    );
    this.albaranes = response;
  }

  async getAllClientByUserId() {
    let response = await firstValueFrom(this.clientService.getAllByUserId());
    this.clientes = response;
  }

  onClientSelected() {
    this.clienteSelected = this.clientes.find(
      (cliente: any) => cliente.name === this.clienteSelected
    );
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

    let token = localStorage.getItem('token') as any;
    let decode = jwtDecode(token) as any;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.text(`${this.clienteSelected.name}`, 150, 8);
    doc.text(`NIF: ${this.clienteSelected.nif}`, 150, 16);
    doc.text(`${this.clienteSelected.calle}`, 150, 24);
    doc.text(
      `${this.clienteSelected.cp} ${this.clienteSelected.localidad}`,
      150,
      32
    );
    let namePerson = decode.name;
    let DNI = decode.dni;
    let direccion = decode.direccion;
    let cp = decode.cp;
    let localidad = prompt('Introduce tu localidad:');
    let numFactura = prompt('Introduce el numero de la factura:');

    doc.text(`Numero factura: ${numFactura}`, 150, 40);
    doc.text(`${namePerson}`, marginLeft, 8);
    doc.text(`${direccion}`, marginLeft, 16);
    doc.text(`${localidad}`, marginLeft, 24);
    doc.text(`DNi: ${DNI}`, marginLeft, 32);
    doc.text(`CP:${cp}`, marginLeft, 40);

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
      this.productoService.getAllProductosByUserId()
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
    let decode = jwtDecode(this.token) as any;
    let userId = decode.id;
    this.albaranService
      .getAllAlbaranesByYearAndUser(year, userId)
      .subscribe((response) => {
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
