import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupcakeClickerComponent } from './cupcake-clicker.component';

describe('CupcakeClickerComponent', () => {
  let component: CupcakeClickerComponent;
  let fixture: ComponentFixture<CupcakeClickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupcakeClickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupcakeClickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
