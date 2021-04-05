import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Plaid, PlaidSchema } from 'src/schemas/plaid.schema';
import { UsersModule } from 'src/users/users.module';
import { PlaidController } from './plaid.controller';
import { PlaidService } from './plaid.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Plaid.name,
        schema: PlaidSchema
      }
    ]),
    ConfigModule,
    UsersModule
  ],
  providers: [PlaidService],
  controllers: [PlaidController]
})
export class PlaidModule {}
