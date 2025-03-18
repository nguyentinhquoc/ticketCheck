import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeClassTicketService } from './type_class_ticket.service';
import { TypeClassTicketController } from './type_class_ticket.controller';
import { TypeClassTicket } from './entities/type_class_ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TypeClassTicket])],
  controllers: [TypeClassTicketController],
  providers: [TypeClassTicketService],
  exports: [TypeClassTicketService],
})
export class TypeClassTicketModule {}
