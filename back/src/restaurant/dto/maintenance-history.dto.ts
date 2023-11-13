import { Impact } from '@prisma/client';
import {
  IsUUID,
  IsNotEmpty,
  IsDateString,
  IsOptional,
  IsDecimal,
  IsString,
} from 'class-validator';

export class MaintenanceHistoryDto {
  @IsUUID()
  restaurant_id: string;

  @IsNotEmpty()
  @IsDateString()
  maintenance_date_start: string;

  @IsNotEmpty()
  @IsDateString()
  maintenance_date_end: string;

  @IsNotEmpty()
  impact_on_restaurant: Impact;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2' })
  quota_price: number;

  @IsOptional()
  @IsString()
  comments: string;
}
