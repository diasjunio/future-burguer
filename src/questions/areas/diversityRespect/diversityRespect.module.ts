import { Module } from '@nestjs/common';
import { DiversityRespectController } from './diversityRespect.controller';
import { DiversityRespectService } from './diversityRespect.service';

@Module({
  controllers: [DiversityRespectController],
  providers: [DiversityRespectService],
})
export class DiversityRespectSModule {}
