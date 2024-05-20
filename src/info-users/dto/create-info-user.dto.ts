import { IsString  } from 'class-validator';

export class CreateInfoUserDto {
  @IsString()
  hobby: string;

  @IsString()
  dream: string;

  @IsString()
  motivation: string;
  
  @IsString()
  personal_reference: string;

  @IsString()

  personal_valuer: string;
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
