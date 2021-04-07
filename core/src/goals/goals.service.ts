import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Goal } from "src/schemas/goal.schema";
import { User } from "src/schemas/user.schema";
import { UserService } from "src/users/user.service";
import { CreateGoalDTO } from "./dto/goals.dto";

@Injectable()
/**
 * Provides methods for all goal related actions.
 */
export class GoalService {
  constructor(
    /**
     * Goal model from MongoDB
     */
    @InjectModel(Goal.name) private goalModel: Model<Goal>,
    private userService: UserService
  ) {}

  async createGoal(currentUser: User, goalData: CreateGoalDTO) {
    try {
      const goal = new this.goalModel(goalData);
      goal.userId = currentUser.id;
      goal.monthlyContribution = this.calculateMonthlyContribution(goalData.amount, goalData.dueDate);
      goal.biWeeklyContribution = Math.round(goal.monthlyContribution / 2);
      const passed = await this.userService.addGoal(goal.id, currentUser);
      if (passed) {
        return await goal.save();
      } else {
        throw new BadRequestException('Error adding goal to user');
      }
    } catch (err) {
      throw err;
    }
  }

  private calculateMonthlyContribution(amount: number, dueDate: string): number {
    try {
      const currentDate = new Date();
      const futureDate = new Date(dueDate);
      const dateDiff = futureDate.getTime() - currentDate.getTime();
      const dateDiffInDays = Math.floor(dateDiff / (1000 * 3600 * 24));
      return Math.round(amount / Math.round(dateDiffInDays / 30));
    } catch (err) {
      throw err;
    }
  }

}