import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AlbaranService } from 'src/app/services/albaran.service';
import { ProductoService } from 'src/app/services/producto.service';
import { InformationService } from 'src/app/services/information.service';
import { Router } from '@angular/router';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-generar-albaran',
  templateUrl: './generar-albaran.page.html',
  styleUrls: ['./generar-albaran.page.scss'],
})
export class GenerarAlbaranPage implements OnInit {
  albaran: any;
  productos: any = [];
  dataAlbaran: any = [];
  albaranForm: any;
  selector: boolean = false;
  index: number = 0;
  constructor(
    private albaranService: AlbaranService,
    private informationService: InformationService,
    private productoService: ProductoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.inicialiteForm();
  }

  ngOnInit() {
    this.getAllProducts();
  }

  ionViewWillEnter() {
    this.getAllProducts();
    this.albaran = undefined;
    this.dataAlbaran = [];
    this.albaranForm.reset();
  }

  inicialiteForm() {
    this.albaranForm = this.formBuilder.group({
      numAlbaran: [0, [Validators.required]],
      date: [0, [Validators.required]],
      year: [0, [Validators.required]],
      bulto: [0, [Validators.required]],
      cantidad: [0, [Validators.required]],
      kilosB: [0, [Validators.required]],
      kilosP: [0, [Validators.required]],
      kilosN: [0, [Validators.required]],
      kilosC: [0, [Validators.required]],
      lote: ['', [Validators.required]],
      importe: ['', [Validators.required]],
      producto: ['', [Validators.required]],
      precio: ['', [Validators.required]],
    });
  }

  async generarAlbaran() {
    const response = await firstValueFrom(this.albaranService.postAlbaran());
    if (typeof response === 'object' && response !== null) {
      this.albaran = [response];
      let today = new Date(this.albaran[0].date);
      let isoFormattedDate = today.toISOString().slice(0, 10);
      this.albaranForm.patchValue({
        numAlbaran: this.albaran[0].numAlbaran,
        date: isoFormattedDate,
        year: this.albaran[0].year,
      });
    }
  }

  generarPdf() {
    const doc = new jsPDF();

    const headers = [
      'Lote',
      'Producto',
      'Peso Bruto',
      'Unds',
      'Peso Caja',
      'Peso Palet',
      'Peso Neto',
      'Precio',
      'Total',
    ];

    let numAlbaran = this.dataAlbaran[0].numAlbaran;
    let total = 0;
    this.dataAlbaran.map((item: any) => {
      total += parseFloat(item.importe);
    });
    const data = this.dataAlbaran.map((item: any) => [
      item.lote.toString(),
      item.producto.toString(),
      item.kilosB.toString(),
      item.cantidad.toString(),
      item.kilosC.toString(),
      item.kilosP.toString(),
      item.kilosN.toString(),
      item.precio.toString() + '€',
      item.importe.toString() + '€',
    ]);

    const marginTop = 20;

    const rowHeight = 10;
    const tableWidth = headers.length * 25;

    let xPos = (doc.internal.pageSize.width - tableWidth) / 2;
    let yPos = marginTop + 30;
    let fechaActual = new Date();
    let fechaHoy = fechaActual.getDate();
    const meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];

    const nombreMes = meses[fechaActual.getMonth()];
    const year = fechaActual.getFullYear();
    let namePro = prompt('Introduzca el nombre del proveedor');
    let DNI = prompt('Introduzca el dni del proveedor');
    let nameClient = prompt('Introduzca el nombre del cliente');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text(`${namePro}`, xPos + 15, 15);
    doc.text(`${DNI}`, xPos + 15, 20);
    doc.text(`Barranco del pinar`, xPos + 15, 25);
    doc.text(`${nameClient}`, xPos + 15, 30);
    doc.text(`Nº Albaran: ${numAlbaran}`, 150, 20);
    doc.text(`Fecha: ${fechaHoy} de ${nombreMes} de ${year}`, 130, 30);

    doc.setFontSize(10);
    data.unshift(headers);
    data.forEach((row: any) => {
      row.forEach((cell: any) => {
        doc.text(cell, xPos, yPos, { align: 'center' });
        xPos += 25;
      });

      yPos += rowHeight;
      xPos = (doc.internal.pageSize.width - tableWidth) / 2;
    });
    doc.text(`Total importe: ${total}€`, 130, yPos + 40);

    doc.output('dataurlnewwindow');
  }

  async getAllProducts() {
    const response = await firstValueFrom(
      this.productoService.getAllProductos()
    );
    this.productos = response;
  }

  onProductSelected() {
    const selectedProductId = this.albaranForm.get('producto')?.value;
    const selectedProduct = this.productos.find(
      (producto: any) => producto.name === selectedProductId
    );
    const precio = selectedProduct ? selectedProduct.price : null;
    const kilos = this.albaranForm.get('kilosN')?.value;

    this.albaranForm.get('precio')?.setValue(precio);
    const importe = kilos && precio ? kilos * precio : null;

    this.albaranForm.get('importe')?.setValue(importe);
  }

  addValuesInTable() {
    if (this.albaranForm.valid) {
      const importeValue = this.albaranForm.get('importe')?.value;
      const formattedImporte =
        importeValue != null ? importeValue.toFixed(2) : '';

      const data = {
        numAlbaran: this.albaranForm.get('numAlbaran')?.value,
        lote: this.albaranForm.get('lote')?.value,
        bulto: this.albaranForm.get('bulto')?.value,
        kilosP: this.albaranForm.get('kilosP')?.value,
        kilosB: this.albaranForm.get('kilosB')?.value,
        kilosC: this.albaranForm.get('kilosC')?.value,
        kilosN: this.albaranForm.get('kilosN')?.value,
        cantidad: this.albaranForm.get('cantidad')?.value,
        producto: this.albaranForm.get('producto')?.value,
        importe: formattedImporte,
        precio: this.albaranForm.get('precio')?.value,
        year: this.albaranForm.get('year')?.value,
      };
      this.albaranForm.patchValue({
        cantidad: 0,
        bulto: 0,
        kilosP: 0,
        kilosB: 0,
        kilosC: 0,
        kilosN: 0,
        lote: 0,
        importe: 0,
        producto: 0,
        precio: 0,
      });
      this.dataAlbaran.push(data);
    }
  }

  finishAlbaran() {
    if (this.dataAlbaran.length === 1) {
      this.informationService
        .addOneInformation(this.dataAlbaran)
        .subscribe((data) => {
          this.router.navigateByUrl('/albaranes');
        });
    } else {
      this.informationService
        .addManyInformation(this.dataAlbaran)
        .subscribe((data) => {
          this.router.navigateByUrl('/albaranes');
        });
    }
  }

  async putDataInForm(data: any) {
    this.albaranForm.patchValue({
      cantidad: data.item.cantidad,
      kilosP: data.item.kilosP,
      kilosB: data.item.kilosB,
      kilosC: data.item.kilosC,
      kilosN: data.item.kilosN,
      lote: data.item.lote,
      importe: data.item.importe,
      producto: data.item.producto,
      precio: data.item.precio,
    });
    this.index = data.i;
    this.selector = true;
  }

  delete(data: any) {
    let index = data.i;
    this.dataAlbaran.splice(index, 1);
  }

  modifyInfo() {
    if (this.albaranForm.valid) {
      const importeValue = Number(this.albaranForm.get('importe')?.value);
      const formattedImporte =
        importeValue != null ? importeValue.toFixed(2) : '';
      this.dataAlbaran[this.index] = {
        numAlbaran: this.albaranForm.get('numAlbaran')?.value,
        lote: this.albaranForm.get('lote')?.value,
        kilosC: this.albaranForm.get('kilosC')?.value,
        kilosP: this.albaranForm.get('kilosP')?.value,
        kilosB: this.albaranForm.get('kilosB')?.value,
        kilosN: this.albaranForm.get('kilosN')?.value,
        cantidad: this.albaranForm.get('cantidad')?.value,
        producto: this.albaranForm.get('producto')?.value,
        importe: formattedImporte,
        precio: this.albaranForm.get('precio')?.value,
        year: this.albaranForm.get('year')?.value,
      };
      this.albaranForm.patchValue({
        cantidad: 0,
        bulto: 0,
        kilosP: 0,
        kilosB: 0,
        kilosC: 0,
        kilosN: 0,
        lote: 0,
        importe: 0,
        producto: 0,
        precio: 0,
      });
      this.selector = false;
    }
  }

  reset() {
    this.albaranForm.patchValue({
      cantidad: 0,
      bulto: 0,
      kilosP: 0,
      kilosB: 0,
      kilosC: 0,
      kilosN: 0,
      lote: 0,
      importe: 0,
      producto: 0,
      precio: 0,
    });
    this.selector = false;
  }
}
