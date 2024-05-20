import { Injectable, NotFoundException } from '@nestjs/common';
import { questions } from './diversityRespect';

@Injectable()
export class DiversityRespectService {
  private questions: any[] = questions;

  getQuestions(): any[] {
    return this.questions;
  }
  getQuestionById(id: number): any {
    const question = this.questions.find(q => q.id === id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }
}
