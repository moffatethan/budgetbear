import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/schemas/user.schema';
import { userInfo } from 'node:os';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'emailAddress' });
  }

  /**
   * Validate the user for authentication.
   * @param emailAddress The email address of the user.
   * @param password The password to check against the user.
   * @returns User
   */
  async validate(emailAddress: string, password: string): Promise<User> {
    const valid = await this.authService.validateUser({ emailAddress, password });
    if (!valid) {
      throw new UnauthorizedException('Incorrect email address or password');
    }
    return await this.authService.getUserByEmailAddress(emailAddress);
  }
}
