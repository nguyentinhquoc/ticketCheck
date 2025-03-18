import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClassTicket } from "./entities/class_ticket.entity";
import { CreateClassTicketDto } from "./dto/create-class_ticket.dto";
import { UpdateClassTicketDto } from "./dto/update-class_ticket.dto";


@Injectable()
export class ClassTicketService {
  constructor(
    @InjectRepository(ClassTicket)
    private classTicketRepository: Repository<ClassTicket>,
  ) {}

  create(createClassTicketDto: CreateClassTicketDto) {
    const newClassTicket = this.classTicketRepository.create(createClassTicketDto);
    return this.classTicketRepository.save(newClassTicket);
  }

  findAll() {
    return this.classTicketRepository.find();
  }

  findOne(id: number) {
    return this.classTicketRepository.findOneBy({ id });
  }

  update(id: number, updateClassTicketDto: UpdateClassTicketDto) {
    return this.classTicketRepository.update(id, updateClassTicketDto);
  }

  remove(id: number) {
    return `This action removes a #${id} classTicket`;
  }
}
