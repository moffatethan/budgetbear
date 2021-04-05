import { Body, Controller, Logger, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { UserService } from "src/users/user.service";
import { PublicTokenDTO } from "./dto/plaid.dto";
import { PlaidService } from "./plaid.service";

@Controller('plaid')
@UseGuards(JwtAuthGuard)
export class PlaidController {
  constructor (
    private plaidService: PlaidService,
    private userService: UserService
  ) {}

  @Post('exchangePublicToken')
  async exchangePublicToken(@Req() req, @Body() data: PublicTokenDTO) {
    try {
      const user = await this.userService.findOne('emailAddress', req.user.emailAddress, ['+accessTokens']);
      return await this.plaidService.exchangePublicToken(data.publicToken, data.metadata, user);
    } catch (err) {
      throw err;
    }
  }

  @Post('getLinkToken')
  async getLinkToken(@Req() req) {
    try {
      const user = await this.userService.findOne('emailAddress', req.user.emailAddress);
      return await this.plaidService.getLinkToken(user);
    } catch (err) {
      throw err;
    }
  }

}