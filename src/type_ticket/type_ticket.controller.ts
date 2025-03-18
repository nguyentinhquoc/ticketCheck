import { Controller, Get, Post, Body, Patch, Param, Delete, Render, Redirect } from '@nestjs/common';
import { TypeTicketService } from './type_ticket.service';
import { CreateTypeTicketDto } from './dto/create-type_ticket.dto';
import { UpdateTypeTicketDto } from './dto/update-type_ticket.dto';

@Controller('type-ticket')
export class TypeTicketController {
  constructor(private readonly typeTicketService: TypeTicketService) {}

  @Get('create')
  @Render('admin/typeTicket/add')
  createForm() {
    return {};
  }

  @Post()
  create(@Body() createTypeTicketDto: CreateTypeTicketDto) {
    return this.typeTicketService.create(createTypeTicketDto);
  }

  @Get()
  @Render('admin/typeTicket/list')
  async findAll() {
    const typeTickets = await this.typeTicketService.findAll();
    return { typeTickets };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeTicketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeTicketDto: UpdateTypeTicketDto) {
    return this.typeTicketService.update(+id, updateTypeTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeTicketService.remove(+id);
  }

  @Get('edit/:id')
  @Render('admin/typeTicket/edit')
  async edit(@Param('id') id: string) {
    const typeTicket = await this.typeTicketService.findOne(+id);
    return { typeTicket };
  }

  @Post('edit/:id')
  @Redirect('/type-ticket')
  async updateTypeTicket(@Param('id') id: string, @Body() updateTypeTicketDto: UpdateTypeTicketDto) {
    return await this.typeTicketService.update(+id, updateTypeTicketDto);
  }



  @Post('create')
  @Redirect('/type-ticket')
  async createTypeTicket(@Body() createTypeTicketDto: CreateTypeTicketDto) {
    return await this.typeTicketService.create(createTypeTicketDto);
  }
}
