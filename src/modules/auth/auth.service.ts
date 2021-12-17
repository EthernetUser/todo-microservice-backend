import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { UserRegistrationDto } from '../dto/user-registration.dto';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from '../dto/user-login.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AUTHSERVICE');
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async createUser(dto: UserRegistrationDto) {
    const isValid = await this.validateNewUser(dto.email);
    if (!isValid) {
      this.logger.error(`Unsuccessful creating user.`);
      return null;
    }
    const user = await this.userModel.create(dto);
    this.logger.log(
      `Created new user: name - ${user.username}, email - ${user.email}.`,
    );
    return user;
  }

  async authorizeUser(dto: UserLoginDto) {
    const isValid = await this.validateExistingUser(dto.email);
    if (!isValid) {
      this.logger.error(`User with email: ${dto.email} does not exist.`);
      return null;
    }
    const tokenPayload = {
      email: dto.email,
    };
    this.logger.log(`User with email: ${dto.email} is authorized.`);
    return this.jwtService.sign(tokenPayload);
  }

  async validateNewUser(email: string) {
    const user = await this.userModel.findOne({ email });
    return !user;
  }

  async validateExistingUser(email: string) {
    const user = await this.userModel.findOne({ email });
    return !!user;
  }
}
