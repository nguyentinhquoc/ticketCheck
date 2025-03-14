import { Controller, Get, Post, Body, Render, Res } from '@nestjs/common';
import { EventService } from './event.service'
import { CreateEventDto } from './dto/create-event.dto'
import { Response } from 'express';

@Controller('event')
export class EventController {
  constructor (private readonly eventService: EventService) {}

  @Post()
  create (@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto)
  }

  @Get()
  @Render('admin/event/list')
 async  findAll () {
    const envents =  await this.eventService.findAll()
    return { envents }
  }

  @Render('admin/event/add')
  @Get('add')
  createG () {
    return {}
  }
  @Post('add')
  async createPost (@Body() createEventDto: CreateEventDto,@Res() res: Response) {
    console.log(createEventDto)
    await this.eventService.create(createEventDto)
    return res.redirect(`/event`)
  }
}
