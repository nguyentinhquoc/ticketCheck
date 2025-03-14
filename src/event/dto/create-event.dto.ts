import { IsString, IsNumber, IsDate, IsOptional, Min } from 'class-validator'

export class CreateEventDto {
  @IsString()
  name: string

  @IsNumber()
  @Min(0)
  price: number

  @IsNumber()
  @Min(1)
  quantity: number

  @IsDate()
  start_date: Date

  @IsDate()
  end_date: Date

  @IsString()
  @IsOptional()
  description?: string

  @IsDate()
  sale_date: Date
}
