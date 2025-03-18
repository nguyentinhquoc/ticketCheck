import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { Ticket } from './entities/ticket.entity';
import { EventModule } from '../event/event.module';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { TypeClassTicketModule } from 'src/type_class_ticket/type_class_ticket.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    EventModule, UserModule, TypeClassTicketModule
  ],
  controllers: [TicketController],
  providers: [TicketService]
})
export class TicketModule {}
