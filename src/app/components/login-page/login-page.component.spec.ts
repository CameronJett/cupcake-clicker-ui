import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let router: Router;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports: [ RouterTestingModule, ReactiveFormsModule, FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on submit', () => {
    it('should route to the cupcake clicker page when user clicks on login', () => {
      fixture.debugElement.nativeElement.querySelector('#login-button').click();
      expect(router.navigate).toHaveBeenCalledWith(["cupcake-clicker"])
    });

    it('should route to the cupcake clicker page when user clicks on create user', () => {
      fixture.debugElement.nativeElement.querySelector('#create-button').click();
      expect(router.navigate).toHaveBeenCalledWith(["cupcake-clicker"])
    });
  });
});
