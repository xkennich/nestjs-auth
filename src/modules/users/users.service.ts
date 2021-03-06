import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument, UserQuery } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async getAll(): Promise<User[]> {
    return this.userModel.find({}, UserQuery.query).exec();
  }

  async getOne(id: string): Promise<User> {
    return this.userModel.findById(id, UserQuery.query);
  }

  async create(user: CreateUserDto): Promise<User> {
    const candidate = await this.userModel.findOne({
      where: { login: user.login },
    });
    if (candidate) {
      // todo длобавить отправку ошибки на существующий логин
      return null;
    }
    const password = await bcrypt.hash(user.password, 12);
    const newUser = new this.userModel({ ...user, password });
    return newUser.save();
  }

  async update(id: string, user: UpdateUserDto): Promise<User> {
    const password = await bcrypt.hash(user.password, 12);
    const updateUser = {
      ...user,
      password,
    };
    return this.userModel.findByIdAndUpdate(id, updateUser, { new: true });
  }
}
