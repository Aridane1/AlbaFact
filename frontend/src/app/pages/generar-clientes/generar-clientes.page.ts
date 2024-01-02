import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-generar-clientes',
  templateUrl: './generar-clientes.page.html',
  styleUrls: ['./generar-clientes.page.scss'],
})
export class GenerarClientesPage implements OnInit {
  clientsForm: FormGroup;
  id: number = 0;
  edit: any;
  constructor(
    private formBuilde: FormBuilder,
    private clientService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.clientsForm = this.formBuilde.group({
      name: ['', [Validators.required]],
      nif: ['', [Validators.required]],
      cp: ['', [Validators.required]],
      calle: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
    });
  }

  ngOnInit() {}
  ionViewWillEnter() {
    if (this.id) {
      this.edit = true;
      this.clientService.getOneClient(this.id).subscribe((response: any) => {
        this.clientsForm.get('name')?.setValue(response.name);
        this.clientsForm.get('localidad')?.setValue(response.localidad);
        this.clientsForm.get('nif')?.setValue(response.nif);
        this.clientsForm.get('calle')?.setValue(response.calle);
        this.clientsForm.get('cp')?.setValue(response.cp);
      });
    }
  }
  addClient() {
    const name = this.clientsForm.get('name')?.value;
    const localidad = this.clientsForm.get('localidad')?.value;
    const nif = this.clientsForm.get('nif')?.value;
    const calle = this.clientsForm.get('calle')?.value;
    const cp = this.clientsForm.get('cp')?.value;

    let token = localStorage.getItem('token') as any;
    let decode = jwtDecode(token) as any;

    let client = {
      name: name,
      localidad: localidad,
      nif: nif,
      calle: calle,
      cp: cp,
      userId: decode.id,
    };

    this.clientService.addClient(client).subscribe((response) => {
      this.clientsForm.reset();
    });
  }
  update() {
    const name = this.clientsForm.get('name')?.value;
    const localidad = this.clientsForm.get('localidad')?.value;
    const nif = this.clientsForm.get('nif')?.value;
    const calle = this.clientsForm.get('calle')?.value;
    const cp = this.clientsForm.get('cp')?.value;
    let client = {
      name: name,
      localidad: localidad,
      nif: nif,
      calle: calle,
      cp: cp,
    };
    this.clientService.updateClient(this.id, client).subscribe((data) => {
      this.router.navigateByUrl('/clientes');
    });
  }
}
