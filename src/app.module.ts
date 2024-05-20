import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { InfoUsersModule } from './info-users/info-users.module'
import { DiversityRespectSModule } from './questions/areas/diversityRespect/diversityRespect.module';
import { HealthyTeamtModule } from './questions/areas/healthyTeam/healthyTeam.module';
import { PrismaModule } from './prisma/prisma.module';




@Module({
  imports: [PrismaModule,UserModule, AuthModule, InfoUsersModule, DiversityRespectSModule,HealthyTeamtModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
