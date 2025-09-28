import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {
  private userRepository = AppDataSource.getRepository(User);

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      return res.status(401).json({ message: "Credentials not match" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Credentials not match" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET || "default_secret",
      {
        expiresIn: "1h",
      }
    );

    return res.json({ token });
  }
}
