import { Injectable } from '@nestjs/common'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Ticket } from './entities/ticket.entity'
import { Repository } from 'typeorm'
import { User } from 'src/user/entities/user.entity'
import { Event } from '../event/entities/event.entity'

@Injectable()
export class TicketService {
  constructor (
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>
  ) {}
  create (
    seat: string,
    code: string,
    discount: number,
    quantity: number,
    eventId: number,
    accountId: number,
    userId: number,
    typeClassTicket:number
  ) {
    return this.ticketRepository.save({
      seat,
      code,
      discount,
      quantity,
      event: { id: eventId },
      account: { id: accountId },
      user: { id: userId },
      typeClassTicket: { id: typeClassTicket }
    })
  }

  findList() {
    return this.ticketRepository.find({ relations: ['event', 'account', 'user','typeClassTicket']})
  }

  findByCode (code: string) {
    return this.ticketRepository.findOne({
      where: {
        code
      },
      relations: ['event', 'account', 'user']
    })
  }

  findBySeat (seat: string, eventId: number) {
    return this.ticketRepository.findOne({
      where: {
        seat,
        event: { id: eventId }
      }
    })
  }

  findByEvent (idEvent: number) {
    return this.ticketRepository.find({
      where: {
        event: { id: idEvent }
      },
      relations: ['event']
    })
  }

  findOne (id: number) {
    return `This action returns a #${id} ticket`
  }

  unpdateStatus(id: any, status: any) {
  return this.ticketRepository.update(id, { status })
}

  remove (id: number) {
    return `This action removes a #${id} ticket`
  }
}
