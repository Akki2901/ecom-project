import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.get('assets/users.json').subscribe((response: any) => {
      const user: any = response.users.find(
        (u: any) => u.username === this.username && u.password === this.password
      );
      if (user) {
        this.router.navigate(['products']);
        console.log('login Successful');
      } else {
        this.error = 'Invalid username or password';
      }
    });
  }
}
