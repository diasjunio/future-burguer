import { Injectable, NotFoundException } from '@nestjs/common';
import { questions } from './healthyTeam';

@Injectable()
export class HealthyTeamtService {
  private questions: any[] = questions;

  getQuestions1(): any[] {
    return this.questions;
  }
  getQuestio1nById(id: number): any {
    const question = this.questions.find(q => q.id === id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }
}
