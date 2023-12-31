import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoint = 'http://localhost:8080/api/user';

  constructor(private httpClient: HttpClient, private router: Router) {}

  register(user: any) {
    return this.httpClient.post(this.endpoint, user).pipe(
      tap(async (res: any) => {
        if (res.user) {
          await localStorage.setItem('token', res.token);
        }
      })
    );
  }

  async isLoggedIn() {
    // return this.authSubject.asObservable();
    let token = await localStorage.getItem('token');
    if (token) {
      return true;
    }
    this.router.navigateByUrl('/login');
    return false;
  }
}
