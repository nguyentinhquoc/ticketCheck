import { IsString, IsNumber, IsDate, IsOptional, Min } from 'class-validator';

export class CreateEventDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(1)
  quantity: number;

  @IsString()
  start_date: string;

  @IsString()
  end_date: string;

  @IsString()
  sale_date: string;

  @IsString()
  @IsOptional()
  main_image?: string;

  @IsString()
  @IsOptional()
  sub_image1?: string;

  @IsString()
  @IsOptional()
  sub_image2?: string;

  @IsString()
  @IsOptional()
  sub_image3?: string;

  @IsString()
  @IsOptional()
  sub_image4?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsString()
  ticket_types: string | string[];

  @IsString()
  ticket_classes: string | string[];

  @IsString()
  ticket_prices: string | string[];
}
