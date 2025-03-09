import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Article } from './entities/article.entity'
import { CreateArticleDto } from './dto/create-article.dto'
import { Area } from 'src/area/entities/area.entity'
import { AreaSmall } from 'src/area_small/entities/area_small.entity'
import { Language } from 'src/language/entities/language.entity'

@Injectable()
export class ArticleService {
  constructor (
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,

    @InjectRepository(Area)
    private readonly areaRepository: Repository<Area>,

    @InjectRepository(AreaSmall)
    private readonly areaSmallRepository: Repository<AreaSmall>,

    @InjectRepository(Language)
    private readonly languageRepository: Repository<Language>
  ) {}

  async changeStatus (id: number): Promise<void> {
    const article = await this.articleRepository.findOne({ where: { id } })
    article.status = !article.status
    await this.articleRepository.save(article)
  }
  async create (createArticleDto: CreateArticleDto) {
    const { title, content, status, area, language, areaSmall } =
      createArticleDto
    const newArticle = this.articleRepository.create({
      title,
      content,
      status: status ?? true // Mặc định là `true` nếu không truyền vào
    })
    // Kiểm tra nếu area có giá trị thì lấy từ database
    if (area) {
      newArticle.area = await this.areaRepository.findOne({
        where: { id: area }
      })
    }
    // Kiểm tra nếu areaSmall có giá trị thì lấy từ database
    if (areaSmall) {
      newArticle.areaSmall = await this.areaSmallRepository.findOne({
        where: { id: areaSmall }
      })
    }
    // Lấy language từ database
    newArticle.language = await this.languageRepository.findOne({
      where: { id: language }
    })

    return this.articleRepository.save(newArticle)
  }

  async findOne (id: number): Promise<Article> {
    return this.articleRepository.findOne({ where: { id } })
  }
  async findAll (languageLocal) {
    return this.articleRepository.find({
      relations: ['area', 'areaSmall', 'language'],
      where: { language: languageLocal }
    })
  }

  async findOneWSize (size: string, id: number) {
    if (size === 'l') {
      return this.articleRepository.findOne({
        where: {
          area: { id: id },
          status: true
        },
        relations: ['area']
      })
    } else {
      return this.articleRepository.findOne({
        where: { areaSmall: { id }, status: true },
        relations: ['areaSmall']
      })
    }
  }
}
