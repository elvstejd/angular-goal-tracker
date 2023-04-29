import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let localStorageProto: Storage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    localStorageProto = Object.getPrototypeOf(localStorage);

    // spy on local storage
    spyOn(localStorageProto, 'setItem');
    spyOn(localStorageProto, 'removeItem');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login', () => {
    const loggedInUser = { username: 'test', token: 'test' };

    service.login({ username: 'test', password: 'test' }).subscribe((user) => {
      expect(user).toEqual(loggedInUser);
    });

    const req = httpTestingController.expectOne(`${service.apiUrl}/token`);
    expect(req.request.method).toEqual('POST');
    req.flush({ access_token: 'test', token_type: 'test' });
    expect(localStorageProto.setItem).toHaveBeenCalledWith(
      'user',
      JSON.stringify(loggedInUser)
    );
  });

  it('should logout', () => {
    service.logout();
    expect(localStorageProto.removeItem).toHaveBeenCalledWith('user');
  });

  it('should get null from get local user when no user is set', () => {
    spyOn(localStorageProto, 'getItem').and.returnValue(null);
    const user = service.getUserFromLocalStorage();
    expect(user).toBeNull();
  });

  it('should get user from local storage when user is set', () => {
    const localStorageUser = { username: 'test', token: 'test' };
    spyOn(localStorageProto, 'getItem').and.returnValue(
      JSON.stringify(localStorageUser)
    );
    const user = service.getUserFromLocalStorage();
    expect(user).toEqual(localStorageUser);
  });

  it('should get token from user subject', () => {
    // arrange
    const access_token = 'test_token';
    const loggedInUser = { username: 'test', token: access_token };
    spyOn(service, 'getCurrentToken').and.returnValue(loggedInUser.token);

    // act (mainly)
    service.login({ username: 'test', password: 'test' }).subscribe();
    httpTestingController
      .expectOne(service.apiUrl + '/token')
      .flush({ access_token });
    const token = service.getCurrentToken();

    // assert
    expect(token).toEqual(loggedInUser.token);
  });

  it('should return true when token is expired', () => {
    const pastDate = new Date('2022-04-01T00:00:00');

    const expiredToken = `header.${btoa(
      JSON.stringify({
        sub: 'test',
        exp: Math.floor(pastDate.getTime() / 1000) + 60 * 60,
      })
    )}.secret`;

    expect(service.tokenExpired(expiredToken)).toBe(true);
  });

  it('should return false when token is not expired', () => {
    const validToken = `header.${btoa(
      JSON.stringify({
        sub: 'test',
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      })
    )}.secret`;

    expect(service.tokenExpired(validToken)).toBe(false);
  });
});
