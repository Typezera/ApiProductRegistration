import { AppDataSource } from "../config/data-source";
import { ProductDto } from "../dto/product.dto";
import { Product } from "../entities/Product";
import { User } from "../entities/User";

export class ProductService {
  private productRepository = AppDataSource.getRepository(Product);

  async create(name: string, price: number, user: User) {
    const product = this.productRepository.create({ name, price, user });
    return await this.productRepository.save(product);
  }
}
