import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarDocumentosPage } from './listar-documentos.page';

describe('ListarDocumentosPage', () => {
  let component: ListarDocumentosPage;
  let fixture: ComponentFixture<ListarDocumentosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarDocumentosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
