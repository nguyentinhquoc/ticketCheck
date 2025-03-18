import { Module } from '@nestjs/common';
import { ClassTicketService } from './class_ticket.service';
import { ClassTicketController } from './class_ticket.controller';
import { ClassTicket } from './entities/class_ticket.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
        TypeOrmModule.forFeature([ClassTicket]),
  ],
  controllers: [ClassTicketController],
  providers: [ClassTicketService],
  exports: [ClassTicketService],
})
export class ClassTicketModule {}
