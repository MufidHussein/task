import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { RestaurantDto } from './dto/create-restaurant.dto';
import { JwtGuard } from 'src/auth/guard';
import { MaintenanceHistoryDto, MenuItemToRestaurantDto } from './dto';

@UseGuards(JwtGuard)
@Controller('restaurant')
export class RestaurantController {
  constructor(private restaurantService: RestaurantService) {}

  @Get()
  async getRestaurants() {
    return await this.restaurantService.getRestaurants();
  }

  @Get(':id')
  async getRestaurantById(@Param('id') id: string) {
    return await this.restaurantService.getRestaurantById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Post()
  async createRestaurant(@Body() restaurantDto: RestaurantDto) {
    return await this.restaurantService.createRestaurant(restaurantDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('menu-item')
  async addMenuItem(@Body() menuItemToRestaurantDto: MenuItemToRestaurantDto) {
    return await this.restaurantService.addMenuItemToRestaurant(
      menuItemToRestaurantDto,
    );
  }
  @HttpCode(HttpStatus.OK)
  @Delete('menu-items/:id')
  async deleteRestaurantMenuItems(@Param('id') restaurantId: string) {
    return await this.restaurantService.deleteRestaurantMenuItems(restaurantId);
  }
  @HttpCode(HttpStatus.OK)
  @Post('maintenance-history')
  async addMaintenanceHistory(
    @Body() maintenanceHistoryDto: MaintenanceHistoryDto,
  ) {
    return await this.restaurantService.addMaintenanceHistoryToRestaurant(
      maintenanceHistoryDto,
    );
  }

  @Get('maintenance-history')
  async getMaintenanceHistory() {
    return await this.restaurantService.getMaintenanceHistoryToRestaurant();
  }

  @HttpCode(HttpStatus.OK)
  @Delete('maintenance-history/:id')
  async deleteMaintenanceHistoryForRestaurant(
    @Param('id') restaurantId: string,
  ) {
    return await this.restaurantService.deleteMaintenanceHistoryForRestaurant(
      restaurantId,
    );
  }
  @HttpCode(HttpStatus.OK)
  @Put(':id')
  async updateRestaurant(
    @Param('id') id: string,
    @Body() restaurantDto: RestaurantDto,
  ) {
    return await this.restaurantService.updateRestaurant(id, restaurantDto);
  }

  @Delete(':id')
  async deleteRestaurant(@Param('id') id: string): Promise<void> {
    await this.restaurantService.deleteRestaurant(id);
  }
}
