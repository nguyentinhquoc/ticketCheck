import { Module } from '@nestjs/common';
import { TypeTicketService } from './type_ticket.service';
import { TypeTicketController } from './type_ticket.controller';
import { TypeTicket } from './entities/type_ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
          TypeOrmModule.forFeature([TypeTicket]),
    ],
  controllers: [TypeTicketController],
  providers: [TypeTicketService],
  exports: [TypeTicketService],
})
export class TypeTicketModule {}
