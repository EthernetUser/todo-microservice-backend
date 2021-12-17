import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'supasecret',
    }),
  ],
  controllers: [AuthService],
})
export class AuthModule {}
