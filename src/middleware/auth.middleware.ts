import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    );
    (req as any).user = decoded; // save the user in the req
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
}
