import { Product } from "../entities/Product";

export class ProductDto {
  id: number;
  name: string;
  price: number;
  userId: number;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.price = Number(product.price);
    this.userId = product.user?.id;
  }
}
