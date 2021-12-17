import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../schemas/user.schema';
import { Model } from 'mongoose';
import { UserRegistrationDto } from '../dto/UserRegistration.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AUTHSERVICE');
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(dto: UserRegistrationDto) {
    if (await this.validateNewUser(dto.email)) {
      const user = await this.userModel.create(dto);
      this.logger.log(
        `Created new user: name - ${user.username}, email - ${user.email}.`,
      );
      return { statusCode: HttpStatus.CREATED };
    } else {
      this.logger.error(`Unsuccessful creating user.`);
      return { statusCode: HttpStatus.BAD_REQUEST };
    }
  }

  async validateNewUser(email: string) {
    const user = await this.userModel.findOne({ email });
    return !user;
  }
}
