"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
class UserService {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    async create(name, email, password) {
        const existingUser = await this.userRepository.findOneBy({ email });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const user = this.userRepository.create({ name, email, password });
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
}
exports.UserService = UserService;
