import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModifyAlbaranPage } from './modify-albaran.page';

describe('ModifyAlbaranPage', () => {
  let component: ModifyAlbaranPage;
  let fixture: ComponentFixture<ModifyAlbaranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ModifyAlbaranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
