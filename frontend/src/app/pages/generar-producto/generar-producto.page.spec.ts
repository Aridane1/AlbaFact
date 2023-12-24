import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarProductoPage } from './generar-producto.page';

describe('GenerarProductoPage', () => {
  let component: GenerarProductoPage;
  let fixture: ComponentFixture<GenerarProductoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GenerarProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
