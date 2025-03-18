import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTypeClassTicketDto } from './dto/create-type_class_ticket.dto';
import { UpdateTypeClassTicketDto } from './dto/update-type_class_ticket.dto';
import { TypeClassTicket } from './entities/type_class_ticket.entity';

@Injectable()
export class TypeClassTicketService {
  constructor(
    @InjectRepository(TypeClassTicket)
    private typeClassTicketRepository: Repository<TypeClassTicket>,
  ) {}

  async create(createTypeClassTicketDto: CreateTypeClassTicketDto): Promise<TypeClassTicket> {
    const ticket = this.typeClassTicketRepository.create(createTypeClassTicketDto);
    return await this.typeClassTicketRepository.save(ticket);
  }

  async findAll(): Promise<TypeClassTicket[]> {
    return await this.typeClassTicketRepository.find();
  }

  findAllByEvent(eventId: number): Promise<TypeClassTicket[]> {
    return this.typeClassTicketRepository.find({where: {event: {id: eventId}}, relations: ['type_ticket', 'class_ticket']});
  }

  async findOne(id: number): Promise<TypeClassTicket> {
    return await this.typeClassTicketRepository.findOne({
      where: { id },
      relations: ['type_ticket', 'class_ticket']
    });
  }

  async update(id: number, updateTypeClassTicketDto: UpdateTypeClassTicketDto): Promise<TypeClassTicket> {
    await this.typeClassTicketRepository.update(id, updateTypeClassTicketDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.typeClassTicketRepository.delete(id);
  }

async checkTicketExists(eventId: number, typeTicketId: number, classTicketId: number){
  const ticket = await this.typeClassTicketRepository.findOne({
    where: {
      event: {id: eventId},
      type_ticket: {id: typeTicketId},
      class_ticket: {id: classTicketId}
    }
  });
  return ticket;
}

}
