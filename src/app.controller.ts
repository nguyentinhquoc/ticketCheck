import { Gallery } from './gallery/entities/gallery.entity';
import { Controller, Get, Render, Query, Req, Res, Redirect } from '@nestjs/common'
import { AppService } from './app.service'
import * as QRCode from 'qrcode'
import { Public } from './decorators/public.decorator';
import { AreaService } from './area/area.service';
const bcrypt = require('bcrypt');
const saltRounds = 10;
import { Response, Request } from 'express'
import { LanguageService } from './language/language.service';
import { GalleryService } from './gallery/gallery.service';
import { EventService } from './event/event.service';

@Controller()
export class AppController {
  constructor (
    private readonly appService: AppService,
    private readonly areaService: AreaService,
    private readonly eventService: EventService,
    private readonly languageService: LanguageService,
    private readonly galleryService: GalleryService
  ) {}


  @Get()
  @Public()
  @Render('client/index')
  async clientG (@Req() req: Request) {
    const languageLocal = await this.languageService.findOne(req.cookies.language)
    const areas = await this.areaService.findAll(languageLocal);
    const gallerys = await this.galleryService.findAll()
    const events = await this.eventService.findAll3()
    return { gallerys, events, areas }
  }

  @Get('admin')
  @Render('admin/index')
 async adminG (@Req() req: Request) {
    const myPlaintextPassword = 'admin@1234!';
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
      // console.log(hash)
    });
    const languageLocal = await this.languageService.findOne(req.cookies.language)

    const areas = await this.areaService.findAll(languageLocal);
    return { areas }
    // bcrypt.compare('admin', '$2b$10$H5YsGsKfi4DtrtrXQ9aQfeFzBjC5h8rOf5bZ0nmX42WORmB.HO15m', function (err, result) {
    //   console.log(result)
    // });
  }

  @Get('CreateQrCode')
  @Render('admin/createQR')
  async generateQRCode (@Query('text') text: string) {
    if (text) {
      return { qrCode: await QRCode.toDataURL(text) }
    }
    return {}
  }

  @Get('logout')
  @Public()
  @Redirect('/admin/login')
  async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { success: true, message: 'Logged out successfully' };
  }

}
