import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { HealthyTeamtService } from './healthyTeam.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('healthyteam')
export class HealthyTeamtController {
  constructor(private readonly questionsService: HealthyTeamtService) {}

  @Get()
  @IsPublic()
  getAllQuestions() {
    return this.questionsService.getQuestions1();
  }

  @Get(':id')
  @IsPublic()
  getQuestionById(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.getQuestio1nById(id);
  }
}
