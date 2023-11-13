import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Restaurant } from '@prisma/client';
import {
  MaintenanceHistoryDto,
  MenuItemToRestaurantDto,
  RestaurantDto,
} from './dto';

@Injectable()
export class RestaurantService {
  constructor(private prisma: PrismaService) {}

  async createRestaurant(restaurantDto: RestaurantDto) {
    try {
      return await this.prisma.restaurant.create({
        data: restaurantDto,
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'Duplicate restaurant name. Please provide a unique name.',
        );
      } else {
        throw new InternalServerErrorException(
          'An error occurred while creating a restaurant.',
        );
      }
    }
  }

  async getRestaurants() {
    try {
      return await this.prisma.restaurant.findMany({
        include: {
          maintenance_history: true,
          restaurant_menu_items: {
            include: {
              menuItem: true,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while retrieving restaurants.',
      );
    }
  }

  async getRestaurantById(id: string) {
    try {
      const restaurant = await this.prisma.restaurant.findUnique({
        where: {
          id: id,
        },
        include: {
          maintenance_history: true,
          restaurant_menu_items: {
            include: {
              menuItem: true,
            },
          },
        },
      });
      if (!restaurant) {
        throw new NotFoundException('Restaurant with this ID does not exist.');
      }
      return restaurant;
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while retrieving restaurant.',
      );
    }
  }

  async updateRestaurant(
    id: string,
    restaurantDto: RestaurantDto,
  ): Promise<Restaurant> {
    try {
      const updatedRestaurant = await this.prisma.restaurant.update({
        where: {
          id: id,
        },
        data: restaurantDto,
      });
      if (!updatedRestaurant) {
        throw new NotFoundException('Restaurant with this ID does not exist.');
      }
      return updatedRestaurant;
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'Duplicate restaurant name. Please provide a unique name.',
        );
      } else {
        throw new InternalServerErrorException(
          'An error occurred while updating restaurant.',
        );
      }
    }
  }

  async deleteRestaurant(id: string) {
    try {
      const deletedRestaurant = await this.prisma.restaurant.delete({
        where: {
          id: id,
        },
      });
      if (!deletedRestaurant) {
        throw new NotFoundException('Restaurant with this ID does not exist.');
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while deleting restaurant.',
      );
    }
  }
  async addMenuItemToRestaurant(Dto: MenuItemToRestaurantDto) {
    try {
      const restaurant = await this.prisma.restaurant.findFirst({
        where: { id: Dto.restaurantId },
      });
      if (!restaurant) throw new NotFoundException('Restaurant not found');
      const menuItem = await this.prisma.menuItem.findFirst({
        where: { id: Dto.menuItemId },
      });
      if (!menuItem) throw new NotFoundException('Menu item not found');
      return await this.prisma.restaurant.update({
        where: { id: Dto.restaurantId },
        data: {
          restaurant_menu_items: {
            create: {
              menuItem: {
                connect: {
                  id: Dto.menuItemId,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(
        'An error occurred while adding a menu item to the restaurant.',
      );
    }
  }
  async addMaintenanceHistoryToRestaurant(Dto: MaintenanceHistoryDto) {
    try {
      const restaurant = await this.prisma.restaurant.findFirst({
        where: { id: Dto.restaurant_id },
      });
      if (!restaurant) throw new NotFoundException('Restaurant not found');
      return await this.prisma.maintenanceHistory.create({
        data: Dto,
      });
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException(
        'An error occurred while adding maintenance history to the restaurant.',
      );
    }
  }
  async getMaintenanceHistoryToRestaurant() {
    try {
      return await this.prisma.maintenanceHistory.findMany();
    } catch (error) {
      throw new InternalServerErrorException(
        'An error occurred while retrieving restaurants.',
      );
    }
  }

  async deleteMaintenanceHistoryForRestaurant(restaurantId: string) {
    try {
      return await this.prisma.maintenanceHistory.deleteMany({
        where: {
          restaurant_id: restaurantId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new ConflictException(
        'Error deleting maintenance history for the restaurant.',
      );
    }
  }

  async deleteRestaurantMenuItems(restaurantId: string) {
    try {
      return await this.prisma.restaurantMenuItem.deleteMany({
        where: {
          restaurant_id: restaurantId,
        },
      });
    } catch (error) {
      console.error(error);
      throw new ConflictException('Error deleting restaurant menu items.');
    }
  }
}
