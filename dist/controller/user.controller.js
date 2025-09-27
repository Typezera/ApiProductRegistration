"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const user_service_1 = require("../service/user.service");
class UserController {
    constructor() {
        this.userService = new user_service_1.UserService();
    }
    // Create a user
    async create(req, res) {
        try {
            const { name, email, password } = req.body;
            const user = await this.userService.create(name, email, password);
            res.status(201).json(user);
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
            res.status(200).json(user);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
        }
        catch (error) {
            return res.status(500).json({ message: "Error to find user..." });
        }
    }
}
exports.UserController = UserController;
