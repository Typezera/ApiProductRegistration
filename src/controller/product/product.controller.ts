import { Request, Response } from "express";
import { ProductService } from "../../service/product.service";
import { AppDataSource } from "../../config/data-source";
import { ProductDto } from "../../dto/product.dto";
import { User } from "../../entities/User";

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  async create(req: Request, res: Response) {
    try {
      const { name, price } = req.body;

      //take the id of the authenticated user
      const userId = (req as any).user.id;

      //search for the user in the database
      const userRepo = AppDataSource.getRepository(User);
      const user = await userRepo.findOneBy({ id: userId });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const product = await this.productService.create(name, price, user);
      return res.status(201).json(new ProductDto(product));
    } catch (error: any) {
      return res
        .status(400)
        .json({ message: "Error to create product", error: error.message });
    }
  }
}
