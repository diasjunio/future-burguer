import { IsString } from 'class-validator';

export class CreateInfoUserPart1Dto {

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
}
