import { TestBed } from '@angular/core/testing';

import { UserDataService } from './user-data.service';
import { User } from '../models/user';

describe('UserDataService', () => {
  let service: UserDataService;
  const MOCK_USER: User = {
    name: "name",
    clicks: 1
  }

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the user when setUser is called', () => {
    service.setUser(MOCK_USER);
    expect(service.user.name).toEqual(MOCK_USER.name);
  });

  it('should get the user when getUser is called', () => {
    service.user = MOCK_USER;
    expect(service.getUser().name).toEqual(MOCK_USER.name);
  });

  it('should set the deletedFlag when setDeletedFlag is called', () => {
    service.setDeletedFlag(true);
    expect(service.deletedFlag).toEqual(true);
  });

  it('should get the deletedFlag when setDeletedFlag is called', () => {
    service.deletedFlag = true;
    expect(service.getDeletedFlag()).toEqual(true);
  });

});
