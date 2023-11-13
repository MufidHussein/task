import { IsNotEmpty, IsString, IsDateString, IsArray } from 'class-validator';
export class RestaurantDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  street_name: string;

  @IsNotEmpty()
  @IsDateString()
  opening_hours_start: string;

  @IsNotEmpty()
  @IsDateString()
  opening_hours_end: string;

  @IsNotEmpty()
  @IsArray()
  nearby_landmarks: string[];
}
