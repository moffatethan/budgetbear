import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import { AxiosInstance } from "axios";
import { Model } from "mongoose";
import { Plaid } from "src/schemas/plaid.schema";
import { User } from "src/schemas/user.schema";
import { UserService } from "src/users/user.service";
import { getAxiosApi, PLAID_ENDPOINTS } from '../http/axios';

@Injectable()
/**
 * Provides methods for all plaid related actions.
 */
export class PlaidService {
  api: AxiosInstance;
  constructor(
    /**
     * Plaid model from MongoDB
     */
    @InjectModel(Plaid.name) private plaidModel: Model<Plaid>,
    private configService: ConfigService,
    private userService: UserService
  ) {
    this.api = getAxiosApi(configService.get<string>('ENVIRONMENT'));
  }

  /**
   * Take the public token given by Plaid and convert to an access token.
   * @param publicToken The public token from the Link creation flow
   * @param currentUser The currently signed in user.
   * @returns boolean Whether the exchange took place or not.
   */
  async exchangePublicToken(publicToken: string, metadata: object, currentUser: User): Promise<boolean> {
    try {
      Logger.log(publicToken, PlaidService.name);
      Logger.log(currentUser, PlaidService.name);
      const { data } = await this.api.post(PLAID_ENDPOINTS.PUBLIC_TOKEN_EXCHANGE, {
        "client_id": this.configService.get<string>('PLAID_CLIENT_ID'),
        "secret": this.configService.get<string>('PLAID_SANDBOX_SECRET'),
        "public_token": publicToken
      });
      const plaid = new this.plaidModel({
        accessToken: data.access_token,
        itemId: data.item_id,
        requestId: data.request_id,
        userId: currentUser.id,
        metadata
      });
      const savedPlaidData = await plaid.save();
      Logger.log(savedPlaidData, PlaidService.name);
      Logger.log(currentUser, PlaidService.name);
      const passed = await this.userService.addPlaidAccessToken(savedPlaidData.id, currentUser);
      if (passed) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }

  /**
   * Get a link token for linking the account. 
   * @param currentUser The currently signed in user.
   */
  async getLinkToken(currentUser: User) {
    const linkTokenObject = {
      "client_id": this.configService.get<string>('PLAID_CLIENT_ID'),
      "secret": this.configService.get<string>('PLAID_SANDBOX_SECRET'),
      "client_name": "Budget Bear",
      "language": "en",
      "country_codes": ["CA"],
      "user": {
        "client_user_id": currentUser.id,
        "legal_name": `${currentUser.firstName} ${currentUser.lastName}`,
        "email_address": currentUser.emailAddress
      },
      "products": ["auth", "transactions"],
      "account_filters": {
        "depository": {
          "account_subtypes": ["checking", "savings"]
        }
      }
    }
    try {
      const { data } = await this.api.post(PLAID_ENDPOINTS.LINK_CREATE, linkTokenObject);
      return data;
    } catch (err) {
      throw err;
    }
  }

}