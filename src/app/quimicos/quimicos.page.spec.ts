import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuimicosPage } from './quimicos.page';

describe('QuimicosPage', () => {
  let component: QuimicosPage;
  let fixture: ComponentFixture<QuimicosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(QuimicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
