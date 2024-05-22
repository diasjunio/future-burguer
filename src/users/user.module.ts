import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service'; 

@Module({
  imports: [PrismaModule], 

  controllers: [UsersController],
  providers: [UsersService, PrismaService], 
})
export class UserModule {}
