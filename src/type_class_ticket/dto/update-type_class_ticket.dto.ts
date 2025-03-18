import { PartialType } from '@nestjs/mapped-types';
import { CreateTypeClassTicketDto } from './create-type_class_ticket.dto';

export class UpdateTypeClassTicketDto extends PartialType(CreateTypeClassTicketDto) {}
