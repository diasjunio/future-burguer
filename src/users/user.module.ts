import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UsersController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Importe o PrismaModule
import { PrismaService } from '../prisma/prisma.service'; // Importe o PrismaService

@Module({
  imports: [PrismaModule], // Use o PrismaModule aqui

  controllers: [UsersController],
  providers: [UsersService, PrismaService], // Certifique-se de incluir o PrismaService aqui
})
export class UserModule {}
