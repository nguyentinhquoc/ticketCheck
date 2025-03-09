import { Module } from '@nestjs/common'
import { AreaSmallService } from './area_small.service'
import { AreaSmallController } from './area_small.controller'
import { AreaSmall } from './entities/area_small.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Language } from 'src/language/entities/language.entity'
import { LanguageModule } from 'src/language/language.module'

@Module({
  imports: [TypeOrmModule.forFeature([AreaSmall]), LanguageModule],
  controllers: [AreaSmallController],
  providers: [AreaSmallService],
  exports: [AreaSmallService]
})
export class AreaSmallModule {}
