import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  endpoint = 'http://localhost:8080/api/user';

  private getOptions(user: any) {
    let base64UserAndPassword = window.btoa(user.email + ':' + user.password);
    let basicAccess = 'Basic ' + base64UserAndPassword;

    let options = {
      headers: {
        Authorization: basicAccess,
        'Content-Type': 'application/json',
      },
      //, withCredentials: true
    };

    return options;
  }

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

  login(user: any) {
    return this.httpClient
      .post(`${this.endpoint}/singin`, null, this.getOptions(user))
      .pipe(
        switchMap(async (res: any) => {
          if (res.user) {
            localStorage.setItem('token', res.access_token);
            return res; // Emitir la respuesta original después de realizar las operaciones de almacenamiento
          } else {
            throw new Error('Invalid credentials'); // Puedes personalizar el mensaje de error según tus necesidades
          }
        })
      );
  }

  logout() {
    this.router.navigate(['login']);
    localStorage.removeItem('token');
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
