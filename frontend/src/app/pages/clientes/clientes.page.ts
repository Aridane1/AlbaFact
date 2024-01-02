import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  clients: any;
  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.getAllClientByUse();
  }

  getAllClientByUse() {
    this.clienteService.getAllByUserId().subscribe((response) => {
      this.clients = response;
    });
  }
}
