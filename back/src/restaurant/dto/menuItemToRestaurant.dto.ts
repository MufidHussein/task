import { IsUUID, IsNotEmpty } from 'class-validator';

export class MenuItemToRestaurantDto {
  @IsNotEmpty()
  @IsUUID()
  menuItemId: string;

  @IsNotEmpty()
  @IsUUID()
  restaurantId: string;
}
