import {Body, Controller, Logger, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {UserRegistrationDto} from "../dto/UserRegistration.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
  private logger = new Logger('AUTH');
  constructor(private authService: AuthService) {}

  @Post('login')
  async login() {
    return;
  }

  @Post('registration')
  @UsePipes(new ValidationPipe())
  async registration(@Body() dto: UserRegistrationDto) {
    return this.authService.createUser(dto)
  }
}
