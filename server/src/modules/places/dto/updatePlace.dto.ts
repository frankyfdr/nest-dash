import { IsOptional, IsString, IsEnum, IsNumber } from 'class-validator';

export class UpdatePlaceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  location?: any;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsEnum(['budget_friendly', 'moderate', 'expensive', 'very_expensive'])
  cost?: string;

  @IsOptional()
  @IsNumber()
  placeTypeId?: number;

  @IsOptional()
  @IsNumber()
  categoryId?: number;
}
