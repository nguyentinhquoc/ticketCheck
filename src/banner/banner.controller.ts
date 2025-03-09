import { Controller, Get, Render } from '@nestjs/common'
import { BannerService } from './banner.service'
import { Language } from '../language/entities/language.entity'
import { LanguageService } from 'src/language/language.service'
@Controller('banner')
export class BannerController {
  constructor (
    private readonly bannerService: BannerService,
    private readonly languageService: LanguageService
  ) {}
  @Get()
  @Render('admin/banner/list')
  async findAll () {
    const banner = await this.bannerService.findAll()
    return { banner }
  }
  @Get('add')
  @Render('admin/banner/add')
  async createG () {
    const languages = await this.languageService.findAll()
    return { languages }
  }
}
