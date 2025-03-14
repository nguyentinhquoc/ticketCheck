import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Article } from './article/entities/article.entity'
import { ArticleController } from './article/article.controller'
import { ArticleModule } from './article/article.module'
import { AreaModule } from './area/area.module'
import { LanguageModule } from './language/language.module'
import { AccountModule } from './account/account.module'
import { Area } from './area/entities/area.entity'
import { Language } from './language/entities/language.entity'
import { Account } from './account/entities/account.entity'
import { AreaSmallModule } from './area_small/area_small.module'
import { BannerModule } from './banner/banner.module'
import { AreaSmall } from './area_small/entities/area_small.entity'
import { Banner } from './banner/entities/banner.entity'
import { APP_GUARD } from '@nestjs/core'
import { CommonGuard } from './common/common.guard'
import { GlobalVariablesMiddleware } from './global-variables.middleware'
import { TicketModule } from './ticket/ticket.module'
import { EventModule } from './event/event.module'
import { Ticket } from './ticket/entities/ticket.entity'
import { Event } from './event/entities/event.entity'
import { User } from './user/entities/user.entity'
import { UserModule } from './user/user.module'
import { JwtService } from '@nestjs/jwt'
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ticket_db',
      entities: [
        Article,
        Area,
        Language,
        Account,
        AreaSmall,
        Banner,
        Ticket,
        Event,
        User
      ],
      synchronize: true
    }),
    ArticleModule,
    AreaModule,
    LanguageModule,
    AccountModule,
    AreaSmallModule,
    BannerModule,
    TicketModule,
    EventModule,
    UserModule,
  ],
  controllers: [AppController, ArticleController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: CommonGuard
    }
  ]
})
export class AppModule implements NestModule {
  configure (consumer: MiddlewareConsumer) {
    consumer.apply(GlobalVariablesMiddleware).forRoutes('*')
  }
}
