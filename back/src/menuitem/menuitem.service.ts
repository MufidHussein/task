import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { MenuItem, Prisma } from '@prisma/client';
import { MenuItemDto } from './dto';

@Injectable()
export class MenuitemService {
  constructor(private prisma: PrismaService) {}

  async createMenuItem(menuItemDto: MenuItemDto): Promise<MenuItem> {
    try {
      return await this.prisma.menuItem.create({
        data: menuItemDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'Duplicate menu item entry. Please provide a unique item name.',
        );
      }
      throw new InternalServerErrorException(
        'An error occurred while creating a menu item.',
      );
    }
  }

  async getAllMenuItems(): Promise<MenuItem[]> {
    try {
      return await this.prisma.menuItem.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while fetching menu items.',
      );
    }
  }

  async getMenuItemById(id: string): Promise<MenuItem | null> {
    try {
      const menuItem = await this.prisma.menuItem.findFirst({
        where: {
          id: id,
        },
      });
      if (!menuItem) {
        throw new NotFoundException('Menu item with this ID does not exist.');
      }
      return menuItem;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while retrieving menu item.',
      );
    }
  }

  async updateMenuItem(
    id: string,
    menuItemDto: MenuItemDto,
  ): Promise<MenuItem> {
    try {
      const updatedMenuItem = await this.prisma.menuItem.update({
        where: {
          id: id,
        },
        data: menuItemDto,
      });
      if (!updatedMenuItem) {
        throw new NotFoundException('Menu item with this ID does not exist.');
      }
      return updatedMenuItem;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'Duplicate menu item entry. Please provide a unique item name.',
        );
      }
      throw new InternalServerErrorException(
        'An error occurred while updating menu item.',
      );
    }
  }

  async deleteMenuItem(id: string): Promise<void> {
    try {
      const deletedMenuItem = await this.prisma.menuItem.delete({
        where: {
          id: id,
        },
      });
      if (!deletedMenuItem) {
        throw new NotFoundException('Menu item with this ID does not exist.');
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while deleting menu item.',
      );
    }
  }
}
