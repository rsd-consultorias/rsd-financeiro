import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivoFixoComponent } from './ativo-fixo.component';

describe('AtivoFixoComponent', () => {
  let component: AtivoFixoComponent;
  let fixture: ComponentFixture<AtivoFixoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtivoFixoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtivoFixoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
