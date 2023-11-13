import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from './decorator/user.decorator';
import { ActivateDto } from './dto';
@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  getUser(@GetUser() user: User) {
    return user;
  }

  @Get('all')
  getAllUsers(@GetUser() user: User) {
    return this.userService.getAllUsers(user.id);
  }

  @HttpCode(HttpStatus.OK)
  @Put('activate')
  activateUser(@Body() dto: ActivateDto, @GetUser() user: User) {
    return this.userService.activate(dto, user.id);
  }
}
