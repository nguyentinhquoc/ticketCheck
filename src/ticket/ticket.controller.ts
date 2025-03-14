import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render
} from '@nestjs/common'
import { TicketService } from './ticket.service'
import { EventService } from '../event/event.service'
import { CreateTicketDto } from './dto/create-ticket.dto'
import { UpdateTicketDto } from './dto/update-ticket.dto'
import { UserService } from 'src/user/user.service'
import * as QRCode from 'qrcode'
import { Public } from 'src/decorators/public.decorator'
@Controller('ticket')
export class TicketController {
  constructor (
    private readonly ticketService: TicketService,
    private readonly eventService: EventService,
    private readonly userService: UserService
  ) {}
  @Get()
  @Render('admin/ticket/list')
  async findAll () {
    const tickets = await this.ticketService.findList()
    return { tickets }
  }

  @Get('check')
  @Render('admin/ticket/check')
  async checkQr() {

    return { tickets:[] }
  }
  @Post('check')
  @Render('admin/ticket/check')
  async checkQrP (@Body('code') code: string) {
    const tickets = await this.ticketService.findByCode(code)
    if (tickets) {
      return {
        tickets
      }
    }
  }

  @Post('changeStatus')
  async changeStatus (@Body('code') code: string) {
    const ticket = await this.ticketService.findByCode(code)
    if (ticket) {
      ticket.status = !ticket.status
      await this.ticketService.unpdateStatus(ticket.id, ticket.status)
    }
    return {
      message: 'Change status success'
    }
  }


  @Get('add')
  @Render('admin/ticket/add')
  async createG () {
    const events = await this.eventService.findAll()
    const users = await this.userService.findAll()
    return {
      events,
      users
    }
  }
  @Get(':idEvent')
  async findByEvent (@Param('idEvent') idEvent: string) {
    if (!idEvent || isNaN(+idEvent)) {
      return { tickets: [] }
    }
    const tickets = await this.ticketService.findByEvent(+idEvent)
    return {
      tickets: tickets?.map(ticket => ticket.seat) || []
    }
  }
  @Post('add')
  @Render('admin/ticket/xuatTicket')
  async createP (@Body() createTicketDto: CreateTicketDto) {
    let codeQr = []
    // for (let index = 0; index < createTicketDto.seat.length; index++) {
    //   const seat = createTicketDto.seat[index]
    //   const ticket = await this.ticketService.findBySeat(
    //     seat,
    //     createTicketDto.eventId
    //   )
    //   if (ticket) {
    //     return {
    //       message: 'Seat already taken'
    //     }
    //   }
    // }
    if (!createTicketDto.userId) {
      const user = await this.userService.create({
        name: createTicketDto.name,
        email: createTicketDto.email,
        phone: createTicketDto.phone
      })
      createTicketDto.userId = user.id
    }
    for (let index = 0; index < createTicketDto.seat.length; index++) {
      const seat = createTicketDto.seat[index]
      const code = Math.random().toString(36).substring(7)
      const discount = createTicketDto.discount
      const quantity = createTicketDto.quantity
      const eventId = createTicketDto.eventId
      const accountId = 1
      const userId = createTicketDto.userId
      await this.ticketService.create(
        seat,
        code,
        discount,
        quantity,
        eventId,
        accountId,
        userId
      )
      {
      }
      const event = await this.eventService.findOne(eventId)
      const ticketInfo = {
        code,
        seat,
        eventName: event.name,
        eventDate: event.start_date
      }
      codeQr.push(JSON.stringify(ticketInfo))
    }
    if (codeQr && codeQr.length > 0) {
      const qrCodeUrls = await Promise.all(
        codeQr.map(ticketData => {
          const data = JSON.parse(ticketData)
          return QRCode.toDataURL(data.code)
        })
      )
      return {
        qrCodes: qrCodeUrls,
        tickets: codeQr.map(data => JSON.parse(data))
      }
    }
  }
  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.ticketService.remove(+id)
  }
}
