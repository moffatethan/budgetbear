import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, Logger, NotFoundException, Post } from "@nestjs/common";
import { CreateUserDTO } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
  constructor (private userService: UserService) {}

  @Post('new')
  async createUser(@Body() userData: CreateUserDTO) {
    if (userData.password !== userData.passwordConfirmation) {
      throw new HttpException('Passwords do not match!', HttpStatus.BAD_REQUEST);
    }
    const userExists: boolean = await this.userService.userExists('emailAddress', userData.emailAddress);
    if (userExists) {
      throw new HttpException('', HttpStatus.BAD_REQUEST);
    }
    try {
      return await this.userService.createUser(userData);
    } catch (error) {
      throw error;
    }
  }

}