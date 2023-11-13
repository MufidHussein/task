import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';

export class ActivateDto {
  @IsBoolean()
  @IsNotEmpty()
  activate: boolean;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
