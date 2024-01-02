import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarClientesPage } from './generar-clientes.page';

describe('GenerarClientesPage', () => {
  let component: GenerarClientesPage;
  let fixture: ComponentFixture<GenerarClientesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GenerarClientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
