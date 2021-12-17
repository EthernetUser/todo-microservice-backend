import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { UserRegistrationDto } from '../dto/UserRegistration.dto';
import { AuthService } from './auth.service';
import { AppResponse } from '../helpers/AppResponse.helper';
import { UserLoginDto } from '../dto/UserLogin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: UserLoginDto) {
    const token = await this.authService.authorizeUser(dto);
    if (token) {
      return new AppResponse<string>({
        data: token,
      });
    } else {
      return new AppResponse<null>({
        statusCode: HttpStatus.BAD_REQUEST,
        error: true,
      });
    }
  }

  @Post('registration')
  async registration(@Body() dto: UserRegistrationDto) {
    const user = await this.authService.createUser(dto);
    if (user) {
      return new AppResponse<null>({
        statusCode: HttpStatus.CREATED,
      });
    } else {
      return new AppResponse<null>({
        statusCode: HttpStatus.BAD_REQUEST,
        error: true,
      });
    }
  }
}
