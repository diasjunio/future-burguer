import { IsString, IsEmail, MinLength, MaxLength, Matches, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsString() 
  cpf: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*\W)).*$/, {
    message: 'A senha deve conter uma letra maiúscula, uma letra minúscula, um número e um caractere especial.',
  })
  password: string;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  role: string;

  @IsString()
  branch_company: string;


  
}
