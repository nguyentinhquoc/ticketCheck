import {
  Controller,
  Get,
  Post,
  Body,
  Render,
  UseInterceptors,
  UploadedFile,
  Redirect,
  Param,
} from '@nestjs/common';
import { GalleryService } from './gallery.service'
import { CreateGalleryDto } from './dto/create-gallery.dto'
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('gallery')
export class GalleryController {
  constructor (private readonly galleryService: GalleryService) {}

  @Get(':id/delete')
  @Redirect('/gallery')
  async deleteGallery(@Param('id') id: string) {
    await this.galleryService.remove(+id);
    return {};
  }

  @Post('add')
  @Redirect('/gallery')
  @UseInterceptors(FileInterceptor('imagePath', {
    storage: diskStorage({
      destination: './public/uploads/gallery',
      filename: (_, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
      },
    }),
    fileFilter: (_, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
  }))
  async addGallery(
    @Body() createGalleryDto: CreateGalleryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      createGalleryDto.imagePath = file.filename.replace(/\\/g, '/');
    }
    await this.galleryService.create(createGalleryDto);
    return {  };
  }

  @Get()
  @Render('admin/gallery/list')
  async list () {
    const gallerys = await this.galleryService.findAll()
    return { gallerys }
  }
  @Get('add')
  @Render('admin/gallery/add')
  async addG () {
    return {  }
  }
  @Get(':id/edit')
  @Render('admin/gallery/edit')

  async edit(@Param('id') id: string) {
    const gallery = await this.galleryService.findOne(+id);
    console.log()
    return { gallery };
  }

  @Post(':id/edit')
  @Redirect('/gallery')
  @UseInterceptors(FileInterceptor('imagePath', {
    storage: diskStorage({
      destination: './public/uploads/gallery',
      filename: (_, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
      },
    }),
    fileFilter: (_, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
      }
      cb(null, true);
    },
  }))
  async updateGallery(
    @Param('id') id: string,
    @Body() updateGalleryDto: CreateGalleryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      updateGalleryDto.imagePath = file.filename.replace(/\\/g, '/');
    }
    await this.galleryService.update(+id, updateGalleryDto);
    return {};
  }

}
