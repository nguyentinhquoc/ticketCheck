import { Injectable } from '@nestjs/common'
import { CreateAreaSmallDto } from './dto/create-area_small.dto'
import { UpdateAreaSmallDto } from './dto/update-area_small.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { AreaSmall } from './entities/area_small.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AreaSmallService {
  constructor (
    @InjectRepository(AreaSmall)
    private readonly areaSmallRepository: Repository<AreaSmall>
  ) {}
  create (createAreaSmallDto: CreateAreaSmallDto) {
    return this.areaSmallRepository.save(createAreaSmallDto)
  }
  findAll(languageLocal) {
    return this.areaSmallRepository.find({ relations: ['area'], where: { language: languageLocal } })
  }
  findOne (id: number) {
    return `This action returns a #${id} areaSmall`
  }

  update (id: number, updateAreaSmallDto: UpdateAreaSmallDto) {
    return `This action updates a #${id} areaSmall`
  }

  remove (id: number) {
    return `This action removes a #${id} areaSmall`
  }
}
