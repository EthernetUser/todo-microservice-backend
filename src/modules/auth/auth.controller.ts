import { Controller, Logger, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  private logger = new Logger('AUTH');

  @Post('login')
  async login() {
    return;
  }

  @Post('registration')
  async registration() {
    return;
  }
}
