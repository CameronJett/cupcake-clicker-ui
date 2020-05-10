import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { of } from 'rxjs';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let router: Router;
  let fixture: ComponentFixture<LoginPageComponent>;
  let userService: UserService;
  const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserByName']);

  const MOCK_USER: User = {
    name: "username",
    clicks: 1
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPageComponent ],
      imports: [ RouterTestingModule, ReactiveFormsModule, FormsModule ],
      providers: [ 
        { provide: UserService, useValue: userServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    router = TestBed.get(Router);
    userService = TestBed.get(UserService);

    spyOn(router, 'navigate');
    (userService.getUserByName as jasmine.Spy).and.returnValue(of(MOCK_USER));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on submit', () => {
    it('should route to the cupcake clicker page when user clicks on login', () => {
      fixture.debugElement.nativeElement.querySelector('#login-button').click();
      expect(router.navigate).toHaveBeenCalledWith(["cupcake-clicker"]);
    });

    it('should get the user info from the userService when user clicks on login', () => {
      fixture.debugElement.nativeElement.querySelector('#login-button').click();
      expect(router.navigate).toHaveBeenCalledWith(["cupcake-clicker"]);
    })

    it('should route to the cupcake clicker page when user clicks on create user', () => {
      fixture.debugElement.nativeElement.querySelector('#create-button').click();
      expect(router.navigate).toHaveBeenCalledWith(["cupcake-clicker"])
    });
  });
});
