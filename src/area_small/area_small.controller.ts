import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  UseInterceptors,
  UploadedFile
} from '@nestjs/common'
import { AreaSmallService } from './area_small.service'
import { CreateAreaSmallDto } from './dto/create-area_small.dto'
import { UpdateAreaSmallDto } from './dto/update-area_small.dto'
import { Response, Request } from 'express'
import { LanguageService } from 'src/language/language.service'
import {
  FileFieldsInterceptor,
  FileInterceptor
} from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname } from 'path'

@Controller('area-small')
export class AreaSmallController {
  constructor (
    private readonly areaSmallService: AreaSmallService,
    private readonly languageService: LanguageService
  ) {}

  // @Post()
  //   @UseInterceptors(FileFieldsInterceptor([
  //     { name: 'image', maxCount: 1 }
  //   ]))
  // async create (
  //   @Body() createAreaSmallDto: CreateAreaSmallDto,
  //   @Res() res: Response,
  //   @Req() req: Request
  // ) {
  //   await this.areaSmallService.create(createAreaSmallDto)
  //   return res.redirect(`back`)
  // }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads/area',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9)
          const ext = extname(file.originalname)
          callback(null, `${uniqueSuffix}${ext}`)
        }
      })
    })
  )
  async create (
    @Body() createAreaSmallDto: CreateAreaSmallDto,
    @Res() res: Response,
    @UploadedFile() file: Express.Multer.File
  ) {
    createAreaSmallDto.image = file.filename
    console.log(createAreaSmallDto)
    await this.areaSmallService.create(createAreaSmallDto)
    return res.redirect('back')
  }

  @Get()
  async findAll (@Req() req: Request) {
    const languageLocal = await this.languageService.findOne(
      req.cookies.language
    )
    return this.areaSmallService.findAll(languageLocal)
  }

  @Get(':id')
  findOne (@Param('id') id: string) {
    return this.areaSmallService.findOne(+id)
  }

  @Patch(':id')
  update (
    @Param('id') id: string,
    @Body() updateAreaSmallDto: UpdateAreaSmallDto
  ) {
    return this.areaSmallService.update(+id, updateAreaSmallDto)
  }

  @Delete(':id')
  remove (@Param('id') id: string) {
    return this.areaSmallService.remove(+id)
  }
}
