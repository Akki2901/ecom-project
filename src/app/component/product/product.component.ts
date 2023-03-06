import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/models/product.interface';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() item!: Product;
  @Output() addToCart: EventEmitter<Product> = new EventEmitter<Product>();

  onAddToCart(): void {
    this.addToCart.emit(this.item);
  }
}
