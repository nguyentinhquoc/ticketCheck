import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imagePath?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
