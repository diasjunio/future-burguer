import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DiversityRespectService } from './diversityRespect.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('questions')
export class DiversityRespectController {
  constructor(private readonly questionsService: DiversityRespectService) {}

  @Get()
  @IsPublic()
  getAllQuestions() {
    return this.questionsService.getQuestions();
  }

  @Get(':id')
  @IsPublic()
  getQuestionById(@Param('id', ParseIntPipe) id: number) {
    return this.questionsService.getQuestionById(id);
  }
}
