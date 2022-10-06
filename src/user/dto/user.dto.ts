import { MinLength, MaxLength, minLength, IsEmail, IsPhoneNumber, IsOptional } from 'class-validator';

export class UserDto {
  @MinLength(3)
  @IsEmail()
  email: string;
  @MinLength(4)
  password: string;
  @IsOptional()
  @IsPhoneNumber()
  phone: string;
}

/* export class RegisterUserDto extends UserDto {
  @MinLength(4)
  passwordRepeat: string;
  @IsPhoneNumber()
  @IsOptional()
  phone: string;
}
 */
