import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { TypeClassTicket } from 'src/type_class_ticket/entities/type_class_ticket.entity';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(TypeClassTicket)
    private typeClassTicketRepository: Repository<TypeClassTicket>
  ) {}
  async update(id: number, updateEventDto: UpdateEventDto) {
    // Extract ticket_types and ticket_classes from updateEventDto if they exist
    const { ticket_types, ticket_classes, ticket_prices, ...eventData } = updateEventDto;

    // Only update the event with the filtered data
    return this.eventRepository.update(id, eventData);
  }
  findOne(id: number) {
    return this.eventRepository.findOne({where: {id}});
  }
  findEventTickets(id: number) {
    return this.eventRepository.findOne({where: {id}, relations: ['tickets']});
  }
  async create(createEventDto: CreateEventDto) {
    const newEvent = this.eventRepository.create(createEventDto);
    return await this.eventRepository.save(newEvent);
  }
  async findAll3() {
    const events = await this.eventRepository.find({
      relations: ['type_class_tickets', 'type_class_tickets.class_ticket', 'type_class_tickets.type_ticket']
    });
    // Add min and max price to each event
    return events.map(event => {
      if (event.type_class_tickets && event.type_class_tickets.length > 0) {
        const prices = event.type_class_tickets.map(tct => tct.price);
        return {
          ...event,
          min_price: Math.min(...prices),
          max_price: Math.max(...prices)
        };
      }
      return {
        ...event,
        min_price: null,
        max_price: null
      };
    });
  }
  findAll2() {
    return this.eventRepository.find({});
  }
  findAll() {
    return this.eventRepository.find({
      where: {
        start_date: MoreThan(new Date()),
        sale_date: LessThan(new Date())
      },
      relations: ['type_class_tickets','type_class_tickets.class_ticket','type_class_tickets.type_ticket']
    });
  }
  findSeat() {
    return {
      seat: [
      // Row A (11 seats)
      'A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11',
      // Row B (12 seats)
      'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12',
      // Row C (13 seats)
      'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13',
      // Row D (12 seats)
      'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12',
      // Row E (11 seats)
      'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11',
      // Row G (12 seats)
      'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12',
      // Row H (13 seats)
      'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'H11', 'H12', 'H13',
      // Row I (12 seats)
      'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10', 'I11', 'I12',
      // Row K (11 seats)
      'K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10', 'K11',
      // Row L (10 seats)
      'L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8', 'L9', 'L10',
      // Row M (13 seats)
      'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12', 'M13',
      // Row N (12 seats)
      'N1', 'N2', 'N3', 'N4', 'N5', 'N6', 'N7', 'N8', 'N9', 'N10', 'N11', 'N12'
      ]
    }
  }

  async createTypeClassTicket(data: {
    eventId: number;
    typeId: number;
    classId: number;
    price: number;
  }) {
    // First, add proper @InjectRepository for TypeClassTicket in constructor
    const typeClassTicket = this.typeClassTicketRepository.create({
      event: { id: data.eventId },
      class_ticket: { id: data.classId },
      price: data.price,
      type_ticket: { id: data.typeId },
    });
    // Don't forget to save the created entity
    return this.typeClassTicketRepository.save(typeClassTicket);
  }

}
