import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivateDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getAllUsers(id: string): Promise<User[]> {
    try {
      const user = await this.prisma.user.findFirst({
        where: {
          id: id,
        },
      });

      if (user.role !== 'ADMIN')
        throw new UnauthorizedException('Error fetching user');
      const users = await this.prisma.user.findMany();
      if (!users) throw new BadRequestException('Error fetching users');
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Error fetching users');
    }
  }

  async activate(dto: ActivateDto, id: string) {
    try {
      const admin = await this.prisma.user.findFirst({
        where: {
          id: id,
        },
      });
      if (!admin || admin.role !== 'ADMIN')
        throw new UnauthorizedException('Credentials incorrect');
      if (dto.activate) throw new NotAcceptableException('User activated');

      const updatedUser = await this.prisma.user.update({
        where: {
          id: dto.userId,
        },
        data: {
          activate: true,
        },
      });

      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException('Error activating user');
      }
    }
  }
}
