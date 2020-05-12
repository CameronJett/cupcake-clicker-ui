import { TestBed } from '@angular/core/testing';

import { LeaderboardService } from './leaderboard.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('LeaderboardService', () => {
  let service: LeaderboardService;
  let mockHttp: HttpClient;

  const MOCK_USER: User = {
    id: 1,
    name: "username",
    clicks: 2
}
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(LeaderboardService);

    mockHttp = jasmine.createSpyObj('HttpClient', ['get']);
    service = new LeaderboardService(mockHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of users when getLeaderboardList function is called', () => {
    (mockHttp.get as jasmine.Spy).and.returnValue(of(<User[]>([MOCK_USER, MOCK_USER])));
    service.getLeaderboardList().subscribe(response => {
      expect(response).toEqual([MOCK_USER, MOCK_USER]);
    })
    expect(mockHttp.get).toHaveBeenCalledWith(`http://localhost:8080/leaderboard`)
  });
});
