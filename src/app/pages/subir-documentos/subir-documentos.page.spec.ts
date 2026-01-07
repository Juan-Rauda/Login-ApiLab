import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubirDocumentosPage } from './subir-documentos.page';

describe('SubirDocumentosPage', () => {
  let component: SubirDocumentosPage;
  let fixture: ComponentFixture<SubirDocumentosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SubirDocumentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
