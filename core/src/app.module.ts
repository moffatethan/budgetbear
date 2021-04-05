import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PlaidModule } from './plaid/plaid.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/budgetbear'),
    UsersModule,
    AuthModule,
    PlaidModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
