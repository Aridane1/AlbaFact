import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarFacturaPage } from './generar-factura.page';

describe('GenerarFacturaPage', () => {
  let component: GenerarFacturaPage;
  let fixture: ComponentFixture<GenerarFacturaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GenerarFacturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
