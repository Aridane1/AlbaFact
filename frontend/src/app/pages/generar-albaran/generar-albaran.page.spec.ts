import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GenerarAlbaranPage } from './generar-albaran.page';

describe('GenerarAlbaranPage', () => {
  let component: GenerarAlbaranPage;
  let fixture: ComponentFixture<GenerarAlbaranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GenerarAlbaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
