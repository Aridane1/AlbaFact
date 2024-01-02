import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-generar-producto',
  templateUrl: './generar-producto.page.html',
  styleUrls: ['./generar-producto.page.scss'],
})
export class GenerarProductoPage implements OnInit {
  productoForm: FormGroup;
  id: number = 0;
  edit: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.productoForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: [0.0, [Validators.required]],
    });
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.productoForm.reset();
  }
  ionViewWillEnter() {
    if (this.id) {
      this.edit = true;
      this.productoService.getOneProduct(this.id).subscribe((data: any) => {
        this.productoForm.get('name')?.setValue(data.name);
        this.productoForm.get('price')?.setValue(data.price);
        console.log(data);
      });
    }
  }

  add() {
    let token = localStorage.getItem('token') as any;
    let decode = jwtDecode(token) as any;
    let userId = decode.id;
    const name = this.productoForm.get('name')?.value;
    const price = this.productoForm.get('price')?.value;

    this.productoService
      .addProduct({ name: name, price: price, userId: userId })
      .subscribe((data) => {
        this.productoForm.reset();
      });
  }

  update() {
    const name = this.productoForm.get('name')?.value;
    const price = this.productoForm.get('price')?.value;

    this.productoService
      .updateProduct({ name: name, price: price }, this.id)
      .subscribe((data) => {
        this.productoForm.reset();
        this.router.navigateByUrl('/productos');
      });
  }
}
