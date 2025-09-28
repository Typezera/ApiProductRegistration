"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const data_source_1 = require("../config/data-source");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../entities/User");
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
class UserService {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        // return await this.userRepository.find({
        //   order: { id: "DESC" },
        //   relations: ["products"],
        // });
    }
    async create(name, email, password) {
        //verify if user already exists
        const existingUser = await this.userRepository.findOneBy({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }
        //Generate a hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
        // make and save hash user
        const user = this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });
        return await this.userRepository.save(user);
    }
    async findById(id) {
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
exports.UserService = UserService;
