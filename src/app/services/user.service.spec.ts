import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let mockHttp: HttpClient;
  let userService: UserService;

  const MOCK_USER: User = {
    name: "username",
    clicks: 1
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(UserService);

    mockHttp = jasmine.createSpyObj('HttpClient', ['get']);
    userService = new UserService(mockHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a user when getUserByName function is called', () => {
    (mockHttp.get as jasmine.Spy).and.returnValue(of(<User>(MOCK_USER)));
    userService.getUserByName(MOCK_USER.name).subscribe(response => {
      expect(response).toEqual(MOCK_USER);
    })
    expect(mockHttp.get).toHaveBeenCalledWith(`http://localhost:8080/${MOCK_USER.name}`)
  });
});
