import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  area?: number; // ID của Area

  @IsNotEmpty()
  language: number; // ID của Language

  @IsOptional()
  areaSmall?: number; // ID của AreaSmall

  description?: string;
}
