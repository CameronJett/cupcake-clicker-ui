import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPageComponent } from './login-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { of } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data.service';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let router: Router;
  let fixture: ComponentFixture<LoginPageComponent>;
  let userService: UserService;
  let dataService: UserDataService;
  const userServiceSpy = jasmine.createSpyObj('UserService', ['getUserByName', 'createNewUser']);
  const dataServiceSpy = jasmine.createSpyObj('UserDataService', ['setUser', 'getDeletedFlag']);

  const MOCK_USER: User = {
    name: "username",
    clicks: 1
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPageComponent],
      imports: [RouterTestingModule, ReactiveFormsModule, FormsModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: UserDataService, useValue: dataServiceSpy }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPageComponent);
    router = TestBed.get(Router);
    userService = TestBed.get(UserService);
    dataService = TestBed.get(UserDataService);

    spyOn(router, 'navigate');
    (userService.getUserByName as jasmine.Spy).and.returnValue(of(MOCK_USER));
    (userService.createNewUser as jasmine.Spy).and.returnValue(of(MOCK_USER));
    (dataService.getDeletedFlag as jasmine.Spy).and.returnValue(true);

    component = fixture.componentInstance;
    fixture.detectChanges();
    component.fg.get("name").setValue(MOCK_USER.name);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the user deleted notification when user has been deleted', () => {
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#deleted-notification')).toBeTruthy();
  });

  it('should hide the user delted notification when the deleted notification is clicked', () => {
    fixture.debugElement.nativeElement.querySelector('#deleted-notification').click();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#deleted-notification')).toBeFalsy();
  });

  describe('on submit', () => {
    it('should route to the cupcake clicker page when user clicks on login', () => {
      fixture.debugElement.nativeElement.querySelector('#login-button').click();
      expect(router.navigate).toHaveBeenCalledWith(["cupcake-clicker"]);
    });

    it('should get the user info from the userService when user clicks on login', () => {
      fixture.debugElement.nativeElement.querySelector('#login-button').click();
      expect(userService.getUserByName).toHaveBeenCalledWith(MOCK_USER.name);
    });

    it('should route to the cupcake clicker page when user clicks on create user', () => {
      fixture.debugElement.nativeElement.querySelector('#create-button').click();
      expect(router.navigate).toHaveBeenCalledWith(["cupcake-clicker"])
    });

    it('should create a new user with the userService when user clicks on create new user', () => {
      fixture.debugElement.nativeElement.querySelector('#create-button').click();
      expect(userService.createNewUser).toHaveBeenCalledWith(MOCK_USER.name);
    });

    it('should not call onFormSubmit when the user has not entered any data into the name field and clicked login', () => {
      component.fg.get("name").setValue('');
      fixture.detectChanges();
      spyOn(component, 'onFormSubmit');
      fixture.debugElement.nativeElement.querySelector('#login-button').click();
      expect(component.onFormSubmit).not.toHaveBeenCalled();
    });

    it('should not call onFormSubmit when the user has not entered any data into the name field and clicked create user', () => {
      component.fg.get("name").setValue('');
      fixture.detectChanges();
      spyOn(component, 'onFormSubmit');
      fixture.debugElement.nativeElement.querySelector('#create-button').click();
      expect(component.onFormSubmit).not.toHaveBeenCalled();
    });

    it('should set the user data into the data service when user clicks on login', () => {
      fixture.debugElement.nativeElement.querySelector('#login-button').click();
      expect(dataService.setUser).toHaveBeenCalledWith(MOCK_USER);
    });

    it('should set the user data into the data service when user clicks on create user', () => {
      fixture.debugElement.nativeElement.querySelector('#create-button').click();
      expect(dataService.setUser).toHaveBeenCalledWith(MOCK_USER);
    });
  });
});
