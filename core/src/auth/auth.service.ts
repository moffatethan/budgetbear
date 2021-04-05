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

  async getUserByEmailAddress(emailAddress: string): Promise<User> {
    try {
      const user: User = await this.usersService.findOne('emailAddress', emailAddress);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      return user;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Authenticate a user.
   * @param emailAddress The users email address.
   * @param password The candidate password. 
   * @returns User | null
   */
  async validateUser({ emailAddress, password }: AuthDTO): Promise<boolean> {
    try {
      const user: User = await this.usersService.findOne('emailAddress', emailAddress, ['+password']);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const passwordValid = await argon2.verify(user.password, password);
      if (passwordValid) {
        // findOne already removes the password from the object.
        return true; 
      }
      return false;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Grab the signed in user from the jwt payload
   * @param user The user to fetch
   */
  async fetchCurrentUser(user) {
    try {
      const account = await this.usersService.findOne('emailAddress', user.emailAddress);
      return account;
    } catch (error) {
      throw error;
    }
  }
  
  /**
   * Login a user and setup a JWT payload.
   * @param user The user to login
   * @returns JWT payload
   */
  async login(user: User) {
    const date = new Date();
    const payload = { emailAddress: user.emailAddress, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      expires: date.setDate(date.getDate() + 7),
      user
    };
  }
}
