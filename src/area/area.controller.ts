import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  Res,
  Req
} from '@nestjs/common'
import { AreaService } from './area.service'
import { CreateAreaDto } from './dto/create-area.dto'
import { UpdateAreaDto } from './dto/update-area.dto'
import { Response, Request } from 'express'
import { LanguageService } from 'src/language/language.service'
import { Language } from 'src/language/entities/language.entity'

@Controller('area')
export class AreaController {
  constructor (
    private readonly areaService: AreaService,
    private readonly languageService: LanguageService
  ) {}
  @Get()
  @Render('admin/area/list')
  async getArticle (@Req() req: Request) {
    const languageLocal = await this.languageService.findOne(
      req.cookies.language
    )
    const areas = await this.areaService.findAll(languageLocal)
    const language = req.cookies.language

    return { areas, language }
  }
  @Post()
  async create (@Body() createAreaDto: CreateAreaDto, @Res() res: Response) {
    await this.areaService.create(createAreaDto)
    return res.redirect(`back`)
  }
}
