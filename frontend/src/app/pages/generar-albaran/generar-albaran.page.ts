import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AlbaranService } from 'src/app/services/albaran.service';
import { ProductoService } from 'src/app/services/producto.service';
import { InformationService } from 'src/app/services/information.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

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
  token: any;
  constructor(
    private albaranService: AlbaranService,
    private informationService: InformationService,
    private productoService: ProductoService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.token = localStorage.getItem('token');
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
      cantidad: [0, [Validators.required]],
      kilos: [0, [Validators.required]],
      lote: ['', [Validators.required]],
      importe: ['', [Validators.required]],
      producto: ['', [Validators.required]],
      precio: ['', [Validators.required]],
    });
  }

  async generarAlbaran() {
    let decode: any = jwtDecode(this.token) as any;
    let userId = decode.id;
    let user = { userId: userId };
    const response = await firstValueFrom(
      this.albaranService.postAlbaran(user)
    );
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
    const kilos = this.albaranForm.get('kilos')?.value;

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
        kilos: this.albaranForm.get('kilos')?.value,
        cantidad: this.albaranForm.get('cantidad')?.value,
        producto: this.albaranForm.get('producto')?.value,
        importe: formattedImporte,
        precio: this.albaranForm.get('precio')?.value,
        year: this.albaranForm.get('year')?.value,
      };
      this.albaranForm.patchValue({
        cantidad: '',
        kilos: '',
        lote: '',
        importe: '',
        producto: '',
        precio: '',
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
      kilos: data.item.kilos,
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
      const importeValue = this.albaranForm.get('importe')?.value;
      const formattedImporte =
        importeValue != null ? importeValue.toFixed(2) : '';
      this.dataAlbaran[this.index] = {
        numAlbaran: this.albaranForm.get('numAlbaran')?.value,
        lote: this.albaranForm.get('lote')?.value,
        kilos: this.albaranForm.get('kilos')?.value,
        cantidad: this.albaranForm.get('cantidad')?.value,
        producto: this.albaranForm.get('producto')?.value,
        importe: formattedImporte,
        precio: this.albaranForm.get('precio')?.value,
        year: this.albaranForm.get('year')?.value,
      };
    }
  }

  reset() {
    this.albaranForm.patchValue({
      cantidad: '',
      kilos: '',
      lote: '',
      importe: '',
      producto: '',
      precio: '',
    });
    this.selector = false;
  }
}
