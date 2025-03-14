import { IsString, IsEmail, IsOptional, IsNumber, Min, IsPhoneNumber } from 'class-validator';

export class CreateTicketDto {
  @IsNumber()
  eventId: number;
  @IsNumber()
  userId: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsPhoneNumber('VN')
  phone?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  discount: number = 0;

  @IsNumber()
  @Min(1)
  quantity: number = 1;

  @IsString()
  seat:Array<string>;
}
