import { IsEmail, IsString, MinLength, Matches, Validate } from 'class-validator';
import { PasswordValidator } from '../../helper/password-validator';
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  name: string;

  @Validate(PasswordValidator)
  password: string;
}
