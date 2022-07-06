import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaTrasacaoComponent } from './nova-trasacao.component';

describe('NovaTrasacaoComponent', () => {
  let component: NovaTrasacaoComponent;
  let fixture: ComponentFixture<NovaTrasacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaTrasacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaTrasacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
