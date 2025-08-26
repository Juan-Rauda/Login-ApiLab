import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensoresPage } from './sensores.page';

describe('SensoresPage', () => {
  let component: SensoresPage;
  let fixture: ComponentFixture<SensoresPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SensoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
