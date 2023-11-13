import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { MenuitemService } from './menuitem.service';
import { MenuItemDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
@UseGuards(JwtGuard)
@Controller('menuitem')
export class MenuitemController {
  constructor(private readonly menuItemService: MenuitemService) {}

  @Get()
  async getAllMenuItems(): Promise<MenuItemDto[]> {
    return await this.menuItemService.getAllMenuItems();
  }

  @Get(':id')
  async getMenuItemById(@Param('id') id: string): Promise<MenuItemDto> {
    return await this.menuItemService.getMenuItemById(id);
  }
  @HttpCode(HttpStatus.OK)
  @Post()
  async createMenuItem(@Body() menuItemDto: MenuItemDto) {
    return await this.menuItemService.createMenuItem(menuItemDto);
  }

  @Put(':id')
  async updateMenuItem(
    @Param('id') id: string,
    @Body() menuItemDto: MenuItemDto,
  ): Promise<MenuItemDto> {
    return await this.menuItemService.updateMenuItem(id, menuItemDto);
  }

  @Delete(':id')
  async deleteMenuItem(@Param('id') id: string): Promise<void> {
    await this.menuItemService.deleteMenuItem(id);
  }
}
