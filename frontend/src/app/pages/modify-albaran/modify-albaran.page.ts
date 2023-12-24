import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AlbaranService } from 'src/app/services/albaran.service';
import { InformationService } from 'src/app/services/information.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-modify-albaran',
  templateUrl: './modify-albaran.page.html',
  styleUrls: ['./modify-albaran.page.scss'],
})
export class ModifyAlbaranPage implements OnInit {
  dataAlbaran: any = [];
  dataAlbaranToAdd: any = [];
  numAlbaran: number = 0;
  year: number = 0;
  updateData: any = [];
  productos: any = [];
  selector: boolean = false;
  albaran: any = [];
  cargaAlbaran: boolean = false;
  cargaProducto: boolean = false;
  albaranForm: any;
  index: number = 0;
  idAlbaran: number = 0;
  constructor(
    private informationService: InformationService,
    private albaranService: AlbaranService,
    private productoService: ProductoService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.numAlbaran = this.activatedRoute.snapshot.params['id'];
    this.year = this.activatedRoute.snapshot.params['year'];
    this.inicialiteForm();
  }

  ngOnInit() {
    this.getInfoAlbaran();
    this.getAllProducts();
    this.getAlbaranByNumAlbaranAndYear();
  }

  inicialiteForm() {
    this.albaranForm = this.formBuilder.group({
      numAlbaran: [0, [Validators.required]],
      date: [0, [Validators.required]],
      year: [0, [Validators.required]],
      cantidad: ['', [Validators.required]],
      kilos: ['', [Validators.required]],
      lote: ['', [Validators.required]],
      importe: ['', [Validators.required]],
      producto: ['', [Validators.required]],
      precio: ['', [Validators.required]],
    });
  }

  getProductById(id: number) {
    return this.productoService.getOneProduct(id);
  }

  async getInfoAlbaran() {
    this.dataAlbaran = await firstValueFrom(
      this.informationService.getInfoAlbaran(this.numAlbaran, this.year)
    );

    for (const iterator of this.dataAlbaran) {
      let producto: any = await firstValueFrom(
        this.getProductById(iterator.productoId)
      );
      iterator.producto = producto.name;
    }
  }

  async getAllProducts() {
    const response = await firstValueFrom(
      this.productoService.getAllProductos()
    );
    this.productos = response;
    this.cargaProducto = true;
  }

  async getAlbaranByNumAlbaranAndYear() {
    const response = await firstValueFrom(
      this.albaranService.getAlbaranByNumAlbaranAndYear(
        this.numAlbaran,
        this.year
      )
    );
    this.albaran = response;
    let day = new Date(this.albaran.date);
    let isoFormattedDate = day.toISOString().slice(0, 10);
    this.albaranForm.patchValue({
      numAlbaran: this.albaran.numAlbaran,
      date: isoFormattedDate,
      year: this.albaran.year,
    });

    this.cargaAlbaran = true;
  }

  async putDataInForm(data: any) {
    this.idAlbaran = data.item.id;
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
    if (data.item.id) {
      this.informationService.deleteInfo(data.item.id).subscribe((response) => {
        this.getInfoAlbaran();
      });
      return;
    }
    this.dataAlbaran.splice(index, 1);
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
      this.dataAlbaran.push(data);
    }
  }

  modifyInfo() {
    if (this.albaranForm.valid) {
      const importeValue = this.albaranForm.get('importe')?.value;
      const formattedImporte =
        importeValue != null ? importeValue.toFixed(2) : '';

      if (this.idAlbaran === undefined) {
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
        return;
      }

      this.dataAlbaran[this.index] = {
        id: this.idAlbaran,
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
  finishAlbaran() {
    this.informationService
      .modifyInfoAlbaran(this.dataAlbaran)
      .subscribe((response) => {
        this.router.navigateByUrl('/albaranes');
      });
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
