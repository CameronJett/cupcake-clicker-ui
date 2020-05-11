import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CupcakeClickerComponent } from './cupcake-clicker.component';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/models/user';

describe('CupcakeClickerComponent', () => {
  let component: CupcakeClickerComponent;
  let fixture: ComponentFixture<CupcakeClickerComponent>;
  let dataService: UserDataService;
  const dataServiceSpy = jasmine.createSpyObj('UserDataService', ['getUser']);

  const MOCK_USER: User = {
    name: "username",
    clicks: 1
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CupcakeClickerComponent ],
      providers: [ 
        { provide: UserDataService, useValue: dataServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CupcakeClickerComponent);
    dataService = TestBed.get(UserDataService);

    (dataService.getUser as jasmine.Spy).and.returnValue(MOCK_USER);

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
  });
});
