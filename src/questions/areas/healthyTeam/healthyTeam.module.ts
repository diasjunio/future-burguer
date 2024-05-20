import { Module } from '@nestjs/common';
import { HealthyTeamtController } from './healthyTeam.controller';
import { HealthyTeamtService } from './healthyTeam.service';

@Module({
  controllers: [HealthyTeamtController],
  providers: [HealthyTeamtService],
})
export class HealthyTeamtModule {}
