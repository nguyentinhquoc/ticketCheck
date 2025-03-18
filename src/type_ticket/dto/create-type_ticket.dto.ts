import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTypeTicketDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
