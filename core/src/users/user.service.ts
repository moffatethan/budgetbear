import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as argon2 from 'argon2';
import { User } from "../schemas/user.schema";
import { CreateUserDTO } from "./dto/user.dto";


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
  ) {}

  /**
   * Create a new user and save to the database.
   * @param userData Data to create user, must follow CreateUserDTO
   * @returns Promise<User>
   * @throws InternalServerErrorException
   */
  async createUser(userData: CreateUserDTO): Promise<User> {
    try {
      const user: User = new this.userModel(userData);
      user.password = await argon2.hash(user.password);
      return await (await user.save()).populate('-password').execPopulate();
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  /**
   * Find and return a user if one exists. If no user found, returns null
   * @param key Key property on the user model. (firstName, lastName, emailAddress, id)
   * @param value The value to lookup.
   */
  async findOne(key: string, value: string): Promise<User> {
    if (!key) {
      throw new Error('findOne must have a key to search by')
    }
    if (!value) {
      throw new Error('findOne must have a value to search for');
    }
    const filter = {};
    filter[key] = value;
    try {
      const user: User = await this.userModel.findOne(filter)
        .populate('-password').exec();
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