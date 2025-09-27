import { AppDataSource } from "../config/data-source";
import bcrypt from "bcrypt";
import { User } from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  async create(name: string, email: string, password: string) {
    //verify if user already exists
    const existingUser = await this.userRepository.findOneBy({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    //Generate a hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // make and save hash user
    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
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

  async findAll() {
    return await this.userRepository.find({
      order: { id: "DESC" },
      relations: ["products"],
    });
  }
}
