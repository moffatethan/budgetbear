import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Goal, GoalSchema } from 'src/schemas/goal.schema';
import { UsersModule } from 'src/users/users.module';
import { GoalController } from './goals.controller';
import { GoalService } from './goals.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Goal.name,
        schema: GoalSchema
      }
    ]),
    AuthModule,
    UsersModule
  ],
  providers: [GoalService],
  controllers: [GoalController]
})
export class GoalsModule {}
