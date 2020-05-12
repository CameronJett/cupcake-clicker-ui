import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderboardComponent } from './leaderboard.component';
import { LeaderboardService } from 'src/app/services/leaderboard.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { User } from 'src/app/models/user';

describe('LeaderboardComponent', () => {
  let component: LeaderboardComponent;
  let fixture: ComponentFixture<LeaderboardComponent>;

  let leaderboardService: LeaderboardService;
  const leaderboardServiceSpy = jasmine.createSpyObj('LeaderboardService', ['getLeaderboardList']);

  const MOCK_USER: User = {
    id: 1,
    name: "username",
    clicks: 8
  }

  const MOCK_USER_LESS_CLICKS: User = {
    id: 1,
    name: "username",
    clicks: 4
  }
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderboardComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ { provide: LeaderboardService, useValue: leaderboardServiceSpy } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderboardComponent);
    component = fixture.componentInstance;
    leaderboardService = TestBed.get(LeaderboardService);
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call getLeaderboardList when the page loads', () => {
    (leaderboardService.getLeaderboardList as jasmine.Spy);
    fixture.detectChanges();
    expect(leaderboardService.getLeaderboardList).toHaveBeenCalled();
  });

  it('should set the components userList when the page loads', () => {
    (leaderboardService.getLeaderboardList as jasmine.Spy).and.returnValue(of([MOCK_USER, MOCK_USER]));
    fixture.detectChanges();
    expect(component.userList).toEqual([MOCK_USER, MOCK_USER]);
  });

  it('should sort the userList when the page loads', () => {
    (leaderboardService.getLeaderboardList as jasmine.Spy).and.returnValue(of([MOCK_USER_LESS_CLICKS, MOCK_USER]));
    fixture.detectChanges();
    expect(component.userList).toEqual([MOCK_USER, MOCK_USER_LESS_CLICKS]);
  });
});
