import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransacoesAlterarComponent } from './transacoes-alterar.component';

describe('TransacoesAlterarComponent', () => {
  let component: TransacoesAlterarComponent;
  let fixture: ComponentFixture<TransacoesAlterarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransacoesAlterarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransacoesAlterarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
