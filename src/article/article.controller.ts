import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Render,
  Query,
  Res,
  Req
} from '@nestjs/common'
import { ArticleService } from './article.service'
import { query, Response, Request } from 'express'
import { LanguageService } from 'src/language/language.service'
import { AreaService } from 'src/area/area.service'
import { AreaSmallService } from 'src/area_small/area_small.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { Public } from 'src/decorators/public.decorator'

@Controller('articles')
export class ArticleController {
  constructor (
    private readonly articleService: ArticleService,
    private readonly languageService: LanguageService,
    private readonly areaService: AreaService,
    private readonly areaSmallService: AreaSmallService
  ) {}
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto, @Res() res: Response) {
    await this.articleService.create(createArticleDto)
    return res.redirect('/articles')
  }
  @Get('changeStatus/:id')
  async changeStatus (@Res() res: Response, @Param('id') id: number) {
    await this.articleService.changeStatus(+id)
    return res.redirect('/articles')
  }
  @Get()
  @Render('admin/article/list')
  async findAll(@Req() req: Request) {
    const languageLocal = await this.languageService.findOne(
      req.cookies.language)
    const articles = await this.articleService.findAll(languageLocal);
    return { articles };
  }

  @Public()
  @Get(':size/:idSize')
  @Render('admin/article/detail')
  async detail (@Param() params: { size: string; idSize: string }) {
    const detail = await this.articleService.findOneWSize(
      params.size,
      +params.idSize
    )
    return { detail }
  }

  @Get('add')
  @Render('admin/article/add')
  async getArticle (@Param('id') id: number,@Req() req: Request) {
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
    const languageLocal = await this.languageService.findOne(req.cookies.language)
    const areas = await this.areaService.findAll(languageLocal)
    const areaSmalls = await this.areaSmallService.findAll(languageLocal)
    return { Languages, areas, areaSmalls }
  }
}
