import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create(name: string, email: string, password: string) {
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const user = this.userRepository.create({ name, email, password });
    return await this.userRepository.save(user);
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ["products"], // Carrega os produtos do usuário
    });

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
