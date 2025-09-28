"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    async login(req, res) {
        const { email, password } = req.body;
        const user = await this.userRepository.findOneBy({ email });
        if (!user) {
            return res.status(401).json({ message: "Credentials not match" });
        }
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Credentials not match" });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_SECRET || "default_secret", {
            expiresIn: "1h",
        });
        return res.json({ token });
    }
}
exports.AuthController = AuthController;
