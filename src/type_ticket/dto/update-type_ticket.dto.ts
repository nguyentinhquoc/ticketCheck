import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeTicketDto } from './create-type_ticket.dto';

export class UpdateTypeTicketDto extends PartialType(CreateTypeTicketDto) {}
