import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Article } from './entities/article.entity'; // Import entity
import { LanguageModule } from 'src/language/language.module';
import { AreaModule } from 'src/area/area.module';
import { AreaSmallModule } from 'src/area_small/area_small.module';
import { AreaSmall } from 'src/area_small/entities/area_small.entity';
import { Language } from 'src/language/entities/language.entity';
import { Area } from 'src/area/entities/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Area, AreaSmall, Language]),LanguageModule,AreaModule,AreaSmallModule], //Đây là
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule { }
