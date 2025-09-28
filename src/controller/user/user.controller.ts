import { Request, Response } from "express";
import { UserService } from "../../service/user.service";
import { QueryFailedError } from "typeorm";
import { User } from "../../entities/User";
import { UserDto } from "../../dto/user.dto";

export class UserController {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  // Create a user
  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const userDTO = new UserDto(
        await this.userService.create(name, email, password)
      );
      res.status(201).json(userDTO);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Find a user
  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(Number(id));
      if (!user) return res.status(404).json({ message: "User not found" });
      return res.status(200).json(new UserDto(user));
    } catch (error: any) {
      return res.status(500).json({ message: "Error to find user..." });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const users = await this.userService.findAll();
      return res.status(200).json(users.map((user) => new UserDto(user)));
    } catch (error: unknown) {
      if (error instanceof QueryFailedError) {
        return res.status(500).json({ message: "Database query failed" });
      }
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message });
      }
      return res.status(500).json({ message: "Unexpected error" });
    }
  }
}
