import { Controller, Get, Post, Body, Render, Res, UseInterceptors, UploadedFiles, Param } from '@nestjs/common';
import { EventService } from './event.service'
import { CreateEventDto } from './dto/create-event.dto'
import { Response } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ClassTicketService } from 'src/class_ticket/class_ticket.service';
import { TypeTicketService } from 'src/type_ticket/type_ticket.service';
import { TypeClassTicket } from 'src/type_class_ticket/entities/type_class_ticket.entity';
import { TypeClassTicketService } from 'src/type_class_ticket/type_class_ticket.service';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor (
    private readonly eventService: EventService,
    private readonly typeTicketService: TypeTicketService,
    private readonly classTicketService: ClassTicketService,
    private readonly typeClassTicketService: TypeClassTicketService,
  ) {}

  @Get(':id/edit')
  @Render('admin/event/edit')
  async showEditEventForm(@Param('id') id: string) {
    const event = await this.eventService.findOne(+id);
    const typeTickets = await this.typeTicketService.findAll();
    const classTickets = await this.classTicketService.findAll();
    const typeClassTickets = await this.typeClassTicketService.findAllByEvent(+id);
    const eventTickets = await this.eventService.findEventTickets(+id);
    return {
      typeClassTickets,
      event,
      typeTickets,
      classTickets,
      eventTickets
    };
  }
  @Post('edit/:id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'main_image', maxCount: 1 },
    { name: 'sub_image1', maxCount: 1 },
    { name: 'sub_image2', maxCount: 1 },
    { name: 'sub_image3', maxCount: 1 },
    { name: 'sub_image4', maxCount: 1 }
  ]))
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFiles() files: {
      main_image?: Express.Multer.File[],
      sub_image1?: Express.Multer.File[],
      sub_image2?: Express.Multer.File[],
      sub_image3?: Express.Multer.File[],
      sub_image4?: Express.Multer.File[]
    },
    @Res() res: Response
  ) {
    try {
      // Handle image files
      if (files.main_image) {
        updateEventDto.main_image = files.main_image[0].filename;
      }
      if (files.sub_image1) {
        updateEventDto.sub_image1 = files.sub_image1[0].filename;
      }
      if (files.sub_image2) {
        updateEventDto.sub_image2 = files.sub_image2[0].filename;
      }
      if (files.sub_image3) {
        updateEventDto.sub_image3 = files.sub_image3[0].filename;
      }
      if (files.sub_image4) {
        updateEventDto.sub_image4 = files.sub_image4[0].filename;
      }
      console.log('=======================================================')
      console.log(updateEventDto)
      // Update event
      await this.eventService.update(+id, updateEventDto);
      console.log('=======================================================')
      const ticket_types = updateEventDto.ticket_types
      const ticket_classes = updateEventDto.ticket_classes
      const ticket_prices = updateEventDto.ticket_prices
      let arr = []
      for (let index = 0; index < ticket_types.length; index++) {
        const element = ticket_types[index];
        const element2 = ticket_classes[index];
        const element3 = ticket_prices[index];
        const typeClassTicket = await this.typeClassTicketService.checkTicketExists(+id, parseInt(element), parseInt(element2));
        if (!typeClassTicket) {
          const typeClassTicket2 = await this.eventService.createTypeClassTicket({
            eventId: +id,
            typeId: parseInt(element),
            classId: parseInt(element2),
            price: parseInt(element3)
          });
          arr.push(typeClassTicket2)
        }else{
          await this.typeClassTicketService.update(typeClassTicket.id, {
            price: parseInt(element3)
          });
          arr.push(typeClassTicket)
        }
      }
      const existingTickets = await this.typeClassTicketService.findAllByEvent(+id);
      for (const existingTicket of existingTickets) {
        const stillExists = arr.some(ticket => ticket.id === existingTicket.id);
        if (!stillExists) {
          await this.typeClassTicketService.remove(existingTicket.id);
        }
      }
      return res.redirect(`/event`);
    } catch (error) {
      console.error('Error updating event:', error);
      // Handle error appropriately
      return res.redirect(`/event/${id}/edit?error=true`);
    }
  }


  @Get()
  @Render('admin/event/list')
 async  findAll () {
    const envents = await this.eventService.findAll2()
    return { envents }}

  @Get(':id/detail')
  @Render('admin/event/detail')
  async detail(@Param('id') id: string) {
    const event = await this.eventService.findOne(+id);
    const typeClassTickets = await this.typeClassTicketService.findAllByEvent(+id);
    const eventTickets = await this.eventService.findEventTickets(+id);
    return {
      event,
      typeClassTickets,
      eventTickets
    };
  }

  @Render('admin/event/add')
  @Get('add')
  async showAddEventForm() {
    const typeTickets = await this.typeTicketService.findAll();
    const classTickets = await this.classTicketService.findAll();
    return {
      typeTickets,
      classTickets,
    };
  }

  @Post('add')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'main_image', maxCount: 1 },
    { name: 'sub_image1', maxCount: 1 },
    { name: 'sub_image2', maxCount: 1 },
    { name: 'sub_image3', maxCount: 1 },
    { name: 'sub_image4', maxCount: 1 }
  ]))
  async create(
    @Body() createEventDto: CreateEventDto,
    @UploadedFiles() files: {
      main_image?: Express.Multer.File[],
      sub_image1?: Express.Multer.File[],
      sub_image2?: Express.Multer.File[],
      sub_image3?: Express.Multer.File[],
      sub_image4?: Express.Multer.File[]
    },
    @Res() res: Response
  ) {
    try {
      // Handle image files
      if (files.main_image) {
        createEventDto.main_image = files.main_image[0].filename;
      }
      if (files.sub_image1) {
        createEventDto.sub_image1 = files.sub_image1[0].filename;
      }
      if (files.sub_image2) {
        createEventDto.sub_image2 = files.sub_image2[0].filename;
      }
      if (files.sub_image3) {
        createEventDto.sub_image3 = files.sub_image3[0].filename;
      }
      if (files.sub_image4) {
        createEventDto.sub_image4 = files.sub_image4[0].filename;
      }

      // Create event and get its ID
      const event = await this.eventService.create(createEventDto);
      // Get arrays of ticket types, classes and prices from form data
      const ticketTypes = Array.isArray(createEventDto.ticket_types)
        ? createEventDto.ticket_types
        : [createEventDto.ticket_types];

      const ticketClasses = Array.isArray(createEventDto.ticket_classes)
        ? createEventDto.ticket_classes
        : [createEventDto.ticket_classes];

      const ticketPrices = Array.isArray(createEventDto.ticket_prices)
        ? createEventDto.ticket_prices
        : [createEventDto.ticket_prices];

      // Create ticket type-class combinations
      for (let i = 0; i < ticketTypes.length; i++) {
        await this.eventService.createTypeClassTicket({
          eventId: event.id,
          typeId: parseInt(ticketTypes[i]),
          classId: parseInt(ticketClasses[i]),
          price: parseInt(ticketPrices[i])
        });
      }

      return res.redirect(`/event`);
    } catch (error) {
      console.error('Error creating event:', error);
      // Handle error appropriately
      return res.redirect('/event/add?error=true');
    }
  }
}
