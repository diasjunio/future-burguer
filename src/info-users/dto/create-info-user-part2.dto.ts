import { IsString } from 'class-validator'

export class CreateInfoUserPart2Dto {
  @IsString()
  academic_education: string;
  
  @IsString()
  academic_status: string;
  
  @IsString()
  interest_area: string;
  
  @IsString()
  strong_points: string;

  @IsString()
  develop_skills: string;
  
  @IsString()
  support: string;
}
