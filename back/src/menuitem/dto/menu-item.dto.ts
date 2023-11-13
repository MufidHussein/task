import { IsNotEmpty, IsString, IsArray, ArrayNotEmpty } from 'class-validator';

export class MenuItemDto {
  @IsNotEmpty()
  @IsString()
  item_name: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  serving_times: string[];
}
