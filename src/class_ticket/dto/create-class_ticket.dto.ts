import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClassTicketDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
