import { IsNotEmpty } from 'class-validator';

export class UserRegistrationDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
