import { Module } from '@nestjs/common';
import { InfoUsersService } from './info-users.service';
import { InfoUsersController } from './info-users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [InfoUsersController],
  providers: [InfoUsersService],
})
export class InfoUsersModule {}
