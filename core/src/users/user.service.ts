import { forwardRef, Inject, Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import * as argon2 from 'argon2';
import { User } from "../schemas/user.schema";
import { CreateUserDTO } from "./dto/user.dto";
import { AuthService } from "src/auth/auth.service";
import { Plaid } from "src/schemas/plaid.schema";


@Injectable()
/**
 * Provides methods for all user related actions.
 */
export class UserService {
  constructor(
    /**
     * User model from MongoDB
     */
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
  ) {}

  /**
   * Create a new user and save to the database.
   * @param userData Data to create user, must follow CreateUserDTO
   * @returns Promise<User>
   * @throws InternalServerErrorException
   */
  async createUser(userData: CreateUserDTO): Promise<any> {
    try {
      const user: User = new this.userModel(userData);
      user.password = await argon2.hash(user.password);
      await user.save();
      const userFromDb = await this.userModel.findOne({ emailAddress: userData.emailAddress });
      const authToken = await this.authService.login(user);
      return authToken;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  /**
   * Associate the plaid access token to the users account.
   * @param plaidModelId 
   * @param user 
   * @returns boolean | Error
   */
  async addPlaidAccessToken(plaidModelId: Types.ObjectId, user: User): Promise<boolean | Error> {
    try {
      user.accessTokens.push(plaidModelId);
      user.plaidLinked = true;
      await user.save();
      return true;
    } catch (err) {
      throw err;
    }
  }

  /**
   * Find and return a user if one exists. If no user found, returns null
   * @param key Key property on the user model. (firstName, lastName, emailAddress, id)
   * @param value The value to lookup.
   * @params selectPassword Include the password hash (used for authentication)
   */
  async findOne(key: string, value: string, selectedProperties = []): Promise<User> {
    if (!key) {
      throw new Error('findOne must have a key to search by')
    }
    if (!value) {
      throw new Error('findOne must have a value to search for');
    }
    const filter = {};
    filter[key] = value;
    try {
      let user: User = null;
      if (selectedProperties.length >= 1) {
        if (selectedProperties.length === 0) {
          selectedProperties = selectedProperties[0];
        }
        user = await this.userModel.findOne(filter).select(selectedProperties);
      } else {
        user = await this.userModel.findOne(filter);
      }
      if (!user) {
        Logger.debug('No User Found', UserService.name);
        return null;
      }
      return user;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Checks the database if a particular user with the key/value lookup exists. Returns a boolean
   * @param key Key property on the user model. (firstName, lastName, emailAddress, id)
   * @param value The value to lookup.
   * @returns boolean
   */
  async userExists(key: string, value: string): Promise<boolean> {
    try {
      const user: User = await this.findOne(key, value);
      if (user) {
        return true;
      }
      return false;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException();
    }
  }

}