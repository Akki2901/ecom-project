import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { Product } from 'src/models/product.interface';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public productList!: Product[];
  public loading: boolean = true;

  constructor(private api: ApiService, private cartService: CartService) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res) => {
      this.productList = res;
      this.productList.forEach((a: Product) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
      this.loading = false;
    });
  }
  addtocart(item: Product) {
    this.cartService.addtoCart(item);
  }
}
