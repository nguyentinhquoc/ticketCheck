import { Module } from '@nestjs/common'
import { BannerService } from './banner.service'
import { BannerController } from './banner.controller'
import { Banner } from './entities/banner.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LanguageService } from 'src/language/language.service'
import { LanguageModule } from 'src/language/language.module'
@Module({
  imports: [TypeOrmModule.forFeature([Banner]), LanguageModule],
  controllers: [BannerController],
  providers: [BannerService]
})
export class BannerModule {}
