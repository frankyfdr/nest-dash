import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePlaceTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  icon?: string;
}
