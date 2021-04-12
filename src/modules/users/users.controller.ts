import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<User> {
    return this.usersService.getOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  register(@Body() createUser: CreateUserDto): Promise<User> {
    return this.usersService.create(createUser);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  update(
    @Param('id') userId: string,
    @Body() updateUser: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(userId, updateUser);
  }
}
