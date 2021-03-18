import { BadRequestException, Body, Controller, Get, Logger, NotFoundException, Post } from "@nestjs/common";
import { CreateUserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  constructor (private userService: UserService) {}

  @Post('new')
  async createUser(@Body() userData: CreateUserDTO) {
    const userExists: boolean = await this.userService.userExists('emailAddress', userData.emailAddress);
    if (userExists) {
      return new BadRequestException('User already exists');
    }
    return await this.userService.createUser(userData);
  }

}