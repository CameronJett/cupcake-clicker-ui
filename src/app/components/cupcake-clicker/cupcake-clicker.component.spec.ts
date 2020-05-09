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

  describe('component functions', () => {
    it('should increment the count by 1 when the incremntCount function is called', () => {
      component.clickCount = 0;
      component.incrementClickCounter();
      expect(component.clickCount).toEqual(1);
    });
  });

  describe('cupcake clicked', () => {
    it('should call the incrementCount function when clicked', () => {
      spyOn(component, "incrementClickCounter");
      fixture.debugElement.nativeElement.querySelector('.cupcake').click();
      expect(component.incrementClickCounter).toHaveBeenCalled();
    });
  });
});
