import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let mockHttp: HttpClient;

  const MOCK_USER: User = {
    id: 1,
    name: "username",
    clicks: 0
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(UserService);

    mockHttp = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    service = new UserService(mockHttp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a user when getUserByName function is called', () => {
    (mockHttp.get as jasmine.Spy).and.returnValue(of(<User>(MOCK_USER)));
    service.getUserByName(MOCK_USER.name).subscribe(response => {
      expect(response).toEqual(MOCK_USER);
    })
    expect(mockHttp.get).toHaveBeenCalledWith(`http://localhost:8080/${MOCK_USER.name}`)
  });

  it('should return a user when createNewUser function is called', () => {
    (mockHttp.post as jasmine.Spy).and.returnValue(of(<User>(MOCK_USER)));
    service.createNewUser(MOCK_USER.name).subscribe(response => {
      expect(response).toEqual(MOCK_USER);
    });
    expect(mockHttp.post).toHaveBeenCalledWith(`http://localhost:8080`, MOCK_USER.name)
  });
  
  it('should return the saved user when saveData function is called', () => {
    (mockHttp.put as jasmine.Spy).and.returnValue(of(<User>(MOCK_USER)));
    service.saveData(MOCK_USER).subscribe(response => {
      expect(response).toEqual(MOCK_USER);
    });
    expect(mockHttp.put).toHaveBeenCalledWith(`http://localhost:8080/save`, MOCK_USER)
  });  

  it('should return deleted user when delete function is called', () => {
    (mockHttp.delete as jasmine.Spy).and.returnValue(of(<User>(MOCK_USER)));
    service.deleteUser(MOCK_USER.name).subscribe(response => {
      expect(response).toEqual(MOCK_USER);
    });
    expect(mockHttp.delete).toHaveBeenCalledWith(`http://localhost:8080/${MOCK_USER.name}`)
  });  
});
