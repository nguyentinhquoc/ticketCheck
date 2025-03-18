import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from 'src/language/entities/language.entity';
import { Repository } from 'typeorm';
import { Gallery } from './entities/gallery.entity';

@Injectable()
export class GalleryService {
  constructor (
      @InjectRepository(Gallery)
    private galleryRepository: Repository<Gallery>
    ) {}
  create(createGalleryDto: CreateGalleryDto) {
    const gallery = this.galleryRepository.create(createGalleryDto);
    return this.galleryRepository.save(gallery);
  }

  findAll() {
    return this.galleryRepository.find();
  }

  async findOne(id: number) {
    const gallery = await this.galleryRepository.findOne({ where: { id } });
    if (!gallery) {
      throw new NotFoundException(`Gallery with ID ${id} not found`);
    }
    return gallery;
  }

  async update(id: number, updateGalleryDto: UpdateGalleryDto) {
    const gallery = await this.findOne(id);
    this.galleryRepository.merge(gallery, updateGalleryDto);
    return this.galleryRepository.save(gallery);
  }

  async remove(id: number) {
    const gallery = await this.findOne(id);
    return this.galleryRepository.remove(gallery);
  }
}
