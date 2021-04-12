import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../users/schemas/users.schema';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(login: string, pass: string): Promise<User | null> {
    const user: User = await this.userModel.findOne({ login });
    if (user && (await bcrypt.compare(pass, user.password))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...secureUser } = user;
      return secureUser;
    }
    return null;
  }

  async login(user: UserDocument): Promise<AuthDto> {
    const payload = { id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async refresh(id: string): Promise<AuthDto> {
    const candidate: UserDocument = await this.userModel.findById(id);
    if (candidate) {
      return this.login(candidate);
    }
    throw new UnauthorizedException();
  }
}
