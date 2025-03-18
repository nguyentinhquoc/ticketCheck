import { Controller, Get, Post, Body, Param, Render, Redirect } from '@nestjs/common';
import { ClassTicketService } from './class_ticket.service';
import { CreateClassTicketDto } from './dto/create-class_ticket.dto';
import { UpdateClassTicketDto } from './dto/update-class_ticket.dto';

@Controller('class-ticket')
export class ClassTicketController {
  constructor(private readonly classTicketService: ClassTicketService) {}

  @Get()
  @Render('admin/classTicket/list')
  async findAll() {
    const classTickets = await this.classTicketService.findAll();
    return { classTickets };
  }

  @Get('create')
  @Render('admin/classTicket/add')
  createForm() {
    return {};
  }

  @Post('create')
  @Redirect('/class-ticket')
  async create(@Body() createClassTicketDto: CreateClassTicketDto) {
    return await this.classTicketService.create(createClassTicketDto);
  }

  @Get('edit/:id')
  @Render('admin/classTicket/edit')
  async edit(@Param('id') id: string) {
    const classTicket = await this.classTicketService.findOne(+id);
    return { classTicket };
  }

  @Post('edit/:id')
  @Redirect('/class-ticket')
  async update(@Param('id') id: string, @Body() updateClassTicketDto: UpdateClassTicketDto) {
    return await this.classTicketService.update(+id, updateClassTicketDto);
  }
}
