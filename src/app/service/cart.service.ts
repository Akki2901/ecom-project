import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);

  constructor(private router: Router, private userService: UserService) {}

  getProducts() {
    return this.productList.asObservable();
  }

  addtoCart(product: any) {
    let productExists = false;

    for (let i in this.cartItemList) {
      if (this.cartItemList[i].id === product.id) {
        this.cartItemList[i].quantity++;
        productExists = true;
        break;
      }
    }

    if (!productExists) {
      product.quantity = 1;
      this.cartItemList.push(product);
    }
    this.productList.next(this.cartItemList);
    console.log(this.cartItemList);
  }

  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
  }

  increaseQuantity(product: any) {
    this.cartItemList.map((a: any) => {
      if (a.id === product.id) {
        a.quantity += 1;
        a.total = a.quantity * a.price;
      }
    });
    this.productList.next(this.cartItemList);
  }

  decreaseQuantity(product: any) {
    this.cartItemList.map((a: any) => {
      if (a.id === product.id) {
        if (a.quantity > 1) {
          a.quantity -= 1;
          a.total = a.quantity * a.price;
        } else {
          this.removeCartItem(product);
        }
      }
    });
    this.productList.next(this.cartItemList);
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if (product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    });
    this.productList.next(this.cartItemList);
  }
}
