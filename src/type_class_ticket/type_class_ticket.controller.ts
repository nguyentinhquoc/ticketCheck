import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypeClassTicketService } from './type_class_ticket.service';
import { CreateTypeClassTicketDto } from './dto/create-type_class_ticket.dto';
import { UpdateTypeClassTicketDto } from './dto/update-type_class_ticket.dto';

@Controller('type-class-ticket')
export class TypeClassTicketController {
  constructor(private readonly typeClassTicketService: TypeClassTicketService) {}

  @Post()
  create(@Body() createTypeClassTicketDto: CreateTypeClassTicketDto) {
    return this.typeClassTicketService.create(createTypeClassTicketDto);
  }

  @Get()
  findAll() {
    return this.typeClassTicketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeClassTicketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeClassTicketDto: UpdateTypeClassTicketDto) {
    return this.typeClassTicketService.update(+id, updateTypeClassTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeClassTicketService.remove(+id);
  }
}
