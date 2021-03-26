import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserService } from 'src/users/user.service';
import { JwtService } from '@nestjs/jwt';
import { AuthDTO } from './dto/auth.dto';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private usersService: UserService,
    private jwtService: JwtService
  ) {}
  /**
   * Authenticate a user.
   * @param emailAddress The users email address.
   * @param password The candidate password. 
   * @returns boolean
   */
  async validateUser({ emailAddress, password }: AuthDTO): Promise<User | null> {
    try {
      const user: User = await this.usersService.findOne('emailAddress', emailAddress);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const passwordValid = await argon2.verify(user.password, password);
      if (passwordValid) {
        // findOne already removes the password from the object.
        return user;
      }
      return null;
    } catch (err) {

    }
  }

  async login(user: User) {
    const payload = { emailAddress: user.emailAddress, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload)
    };
  }
}
