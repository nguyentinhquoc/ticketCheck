import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { TypeClassTicket } from '../type_class_ticket/entities/type_class_ticket.entity';
import { TypeTicketService } from '../type_ticket/type_ticket.service';
import { ClassTicketService } from '../class_ticket/class_ticket.service';
import { TypeTicket } from '../type_ticket/entities/type_ticket.entity';
import { ClassTicket } from '../class_ticket/entities/class_ticket.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { TypeClassTicketModule } from 'src/type_class_ticket/type_class_ticket.module';

@Module({
  imports: [TypeClassTicketModule,
    TypeOrmModule.forFeature([Event, TypeClassTicket, TypeTicket, ClassTicket]),
    MulterModule.register({
      storage: diskStorage({
        destination: './public/uploads/events',
        filename: (req, file, cb) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          cb(null, uniqueSuffix + '-' + file.originalname);
        }
      })
    })
  ],
  controllers: [EventController],
  providers: [EventService, TypeTicketService, ClassTicketService],
  exports: [EventService]
})
export class EventModule {}
