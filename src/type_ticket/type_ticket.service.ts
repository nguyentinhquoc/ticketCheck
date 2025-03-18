import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeTicket } from './entities/type_ticket.entity';
import { CreateTypeTicketDto } from './dto/create-type_ticket.dto';
import { UpdateTypeTicketDto } from './dto/update-type_ticket.dto';

@Injectable()
export class TypeTicketService {
  constructor(
    @InjectRepository(TypeTicket)
    private typeTicketRepository: Repository<TypeTicket>,
  ) {}

  async create(createTypeTicketDto: CreateTypeTicketDto): Promise<TypeTicket> {
    const newTypeTicket = this.typeTicketRepository.create(createTypeTicketDto);
    return this.typeTicketRepository.save(newTypeTicket);
  }

  async findAll(): Promise<TypeTicket[]> {
    return this.typeTicketRepository.find();
  }

  async findOne(id: number): Promise<TypeTicket> {
    return this.typeTicketRepository.findOneOrFail({ where: { id } });
  }

  async update(id: number, updateTypeTicketDto: UpdateTypeTicketDto): Promise<TypeTicket> {
    await this.typeTicketRepository.update(id, updateTypeTicketDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.typeTicketRepository.delete(id);
  }
}
