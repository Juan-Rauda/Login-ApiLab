import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TempsensorPage } from './tempsensor.page';

describe('TempsensorPage', () => {
  let component: TempsensorPage;
  let fixture: ComponentFixture<TempsensorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TempsensorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
