import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CupcakeClickerComponent, Vector2 } from './cupcake-clicker.component';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CupcakeClickerComponent', () => {
  let component: CupcakeClickerComponent;
  let fixture: ComponentFixture<CupcakeClickerComponent>;
  let dataService: UserDataService;
  let userService: UserService;
  const dataServiceSpy = jasmine.createSpyObj('UserDataService', ['getUser', 'setUser', 'setDeletedFlag']);
  const userServiceSpy = jasmine.createSpyObj('UserService', ['saveData', 'deleteUser']);
  let router: Router;

  const MOCK_USER: User = {
    id: 1,
    name: "username",
    clicks: 1
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      declarations: [ CupcakeClickerComponent ],
      imports: [ RouterTestingModule ],
      providers: [ 
        { provide: UserService, useValue: userServiceSpy },
        { provide: UserDataService, useValue: dataServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupcakeClickerComponent);
    dataService = TestBed.get(UserDataService);
    userService = TestBed.get(UserService);
    router = TestBed.get(Router);

    spyOn(router, 'navigate');
    (dataService.getUser as jasmine.Spy).and.returnValue(MOCK_USER);
    (userService.saveData as jasmine.Spy).and.returnValue(of(MOCK_USER));
    (userService.deleteUser as jasmine.Spy).and.returnValue(of("{ \"response\": \"DELETE_SUCCESSFUL\" }"));

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get the user from the data store when the page loads', () => {
      expect(dataService.getUser).toHaveBeenCalled();
    });
  });

  describe('component functions', () => {
    it('should increment the count by 1 when the incremntCount function is called', () => {
      component.user.clicks = 0;
      component.incrementClickCounter();
      expect(component.user.clicks).toEqual(1);
    });
  });

  describe('cupcake clicked', () => {
    it('should call the incrementCount function when clicked', () => {
      spyOn(component, "incrementClickCounter");
      fixture.debugElement.nativeElement.querySelector('.cupcake').click();
      expect(component.incrementClickCounter).toHaveBeenCalled();
    });

    it('should call createPlusOneAnimation with the clicked location and correct id', () => {
      spyOn(component, "createPlusOneAnimation");
      const event = { x: 0, y: 0 };
      fixture.debugElement.nativeElement.querySelector('.cupcake').click();
      expect(component.createPlusOneAnimation).toHaveBeenCalledWith( { id: MOCK_USER.id+1, ...event });
    });

    it('should add the item-${id} style to the DOM when createPlusOneAnimation is called', () => {
      const location: Vector2 = { id: 1, x: 0, y: 0 };
      expect(fixture.debugElement.nativeElement.querySelector('.item-1')).toBeFalsy();
      component.createPlusOneAnimation(location);
      expect(fixture.debugElement.nativeElement.querySelector('.item-1')).toBeTruthy();
    });

    it('should remove the item-${id} style to the DOM when createPlusOneAnimation is called and 2 seconds pass', fakeAsync(() => {
      const location: Vector2 = { id: 1, x: 0, y: 0 };
      component.createPlusOneAnimation(location);
      expect(fixture.debugElement.nativeElement.querySelector('.item-1')).toBeTruthy();

      tick(2000);
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('.item-1')).toBeFalsy();
    }));
  });

  describe('buttons', () => {
    it('should call saveData service when the save button is clicked', () => {
      component.user = MOCK_USER;
      fixture.debugElement.nativeElement.querySelector('#save-button').click();
      expect(userService.saveData).toHaveBeenCalledWith(MOCK_USER);
    });

    it('should set the user in the dataService when the save button is clicked and successful', () => {
      component.user = MOCK_USER;
      fixture.debugElement.nativeElement.querySelector('#save-button').click();
      expect(dataService.setUser).toHaveBeenCalledWith(MOCK_USER);
    });

    it('should show the saved data notification when save button is clicked and successful', () => {
      component.user = MOCK_USER;
      fixture.debugElement.nativeElement.querySelector('#save-button').click();
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('#saved-notification')).toBeTruthy();
    });
  });

  it('should hide the saved data notification when the save notification is clicked', () => {
    component.saved = true;
    fixture.detectChanges();
    fixture.debugElement.nativeElement.querySelector('#saved-notification').click();
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#saved-notification')).toBeFalsy();
  });

  it('should call setDeletedFlag data service when the deleted button is clicked and successful', () => {
    fixture.debugElement.nativeElement.querySelector('#delete-button').click();
    expect(userService.deleteUser).toHaveBeenCalledWith(MOCK_USER.name);
  });

  it('should route to login page when the delete button is clicked and successful', () => {
    fixture.debugElement.nativeElement.querySelector('#delete-button').click();
    expect(router.navigate).toHaveBeenCalledWith([""]);
  });

  it('should route to leaderboard page when the leaderboard button is clicked', () => {
    fixture.debugElement.nativeElement.querySelector('#leaderboard-button').click();
    expect(router.navigate).toHaveBeenCalledWith(["/leaderboard"]);
  });
});
