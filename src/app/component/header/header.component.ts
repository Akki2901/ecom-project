import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public username: string | null = null;
  public totalItems: number = 0;

  constructor(
    private userService: UserService,
    private cartService: CartService
  ) {
    this.userService.username$.subscribe(
      (username) => (this.username = username)
    );
  }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.totalItems = res.length;
    });
  }

  logout(): void {
    this.userService.logout();
  }
}
