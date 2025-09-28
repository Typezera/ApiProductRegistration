"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../../service/user.service");
const typeorm_1 = require("typeorm");
const user_dto_1 = require("../../dto/user.dto");
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    // Create a user
    async create(req, res) {
        try {
            const { name, email, password } = req.body;
            const userDTO = new user_dto_1.UserDto(await this.userService.create(name, email, password));
            res.status(201).json(userDTO);
        }
        catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    // Find a user
    async findById(req, res) {
        try {
            const { id } = req.params;
            const user = await this.userService.findById(Number(id));
            if (!user)
                return res.status(404).json({ message: "User not found" });
            return res.status(200).json(new user_dto_1.UserDto(user));
        }
        catch (error) {
            return res.status(500).json({ message: "Error to find user..." });
        }
    }
    async findAll(req, res) {
        try {
            const users = await this.userService.findAll();
            return res.status(200).json(users.map((user) => new user_dto_1.UserDto(user)));
        }
        catch (error) {
            if (error instanceof typeorm_1.QueryFailedError) {
                return res.status(500).json({ message: "Database query failed" });
            }
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
            return res.status(500).json({ message: "Unexpected error" });
        }
    }
}
exports.UserController = UserController;
