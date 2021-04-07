import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { User } from "src/schemas/user.schema";
import { CreateGoalDTO } from "./dto/goals.dto";
import { GoalService } from "./goals.service";

@Controller('goals')
@UseGuards(JwtAuthGuard)
export class GoalController {
  constructor (
    private goalService: GoalService,
    private authService: AuthService
  ) {}
    
  /**
   * Create and store new savings goals into the users account.
   * @param req The request object
   * @param goalData Data to create the new saving goal.
   */
  @Post('new')
  async createGoal(@Req() req, @Body() goalData: CreateGoalDTO) {
    try {
      const user: User = await this.authService.fetchCurrentUser(req.user.emailAddress);
      return await this.goalService.createGoal(user, goalData);
    } catch (err) {
      throw err;
    }
  }

}