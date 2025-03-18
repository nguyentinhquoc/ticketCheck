import { PartialType } from '@nestjs/mapped-types';
import { CreateClassTicketDto } from './create-class_ticket.dto';

export class UpdateClassTicketDto extends PartialType(CreateClassTicketDto) {}
