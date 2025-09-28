"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
    }
}
exports.UserDto = UserDto;
