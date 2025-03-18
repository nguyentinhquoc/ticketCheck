import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Redirect,
  Render,
  Req,
  Res
} from '@nestjs/common'
import { LanguageService } from './language.service'
import { Response } from 'express'
import { Public } from 'src/decorators/public.decorator'
@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) { }
  @Public()
  @Get('pick')
  @Render('admin/language/pick')
  async pickLanguege(@Body() body, @Res() res: Response) {
    const languagesObj = await this.languageService.findAction()
    const listCodeObj = await this.languageService.listCode()
    const languages = Array.isArray(languagesObj) ? languagesObj : []
    const listCode = Array.isArray(listCodeObj.languages)
      ? listCodeObj.languages
      : []
    const LanguagesCreate = listCode.filter(
      item => !languages.some(lang => lang.code === item.code)
    )
    let Languages = languages.map(lang => {
      const matched = listCode.find(item => item.code === lang.code)
      return {
        ...lang,
        name: matched ? matched.name : 'Không xác định'
      }
    })
    console.log(Languages)
    return { Languages }
  }
  @Public()
  @Post('pick')
  pickLanguegeP(@Body() body:any, @Res() res: Response) {
    console.log(body.id)
    res.cookie('language', body.id, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 3 * 60 * 60 * 1000 * 10
    })
    res.redirect('/admin')
  }

  @Get()
  @Render('admin/language/list')
  async findAll() {
    const languagesObj = await this.languageService.findAll()
    const listCodeObj = await this.languageService.listCode()
    const languages = Array.isArray(languagesObj) ? languagesObj : []
    const listCode = Array.isArray(listCodeObj.languages)
      ? listCodeObj.languages
      : []
    const LanguagesCreate = listCode.filter(
      item => !languages.some(lang => lang.code === item.code)
    )
    let Languages = languages.map(lang => {
      const matched = listCode.find(item => item.code === lang.code)
      return {
        ...lang,
        name: matched ? matched.name : 'Không xác định'
      }
    })
    return { Languages, LanguagesCreate }
  }
  @Post('add')
  async createP(@Body() body, @Res() res: Response) {
    console.log(body.code)
    await this.languageService.create({ code: body.code })
    return res.redirect('/language')
  }

  @Get('changeStatus/:id')
  async changeStatus(@Res() res: Response, @Param('id') id: number) {
    await this.languageService.changeStatus(+id)
    return res.redirect('/language')
  }
}
