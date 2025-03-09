import { Area } from 'src/area/entities/area.entity'
import { AreaSmall } from 'src/area_small/entities/area_small.entity'
import { Article } from 'src/article/entities/article.entity'
import { Banner } from 'src/banner/entities/banner.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
@Entity()
export class Language {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ unique: true })
  code: string
  @Column({ default: true })
  status: boolean
  @OneToMany(() => Article, article => article.language)
  articles: Article[]
  @OneToMany(() => Banner, banner => banner.language)
  banners: Banner[]
  @OneToMany(() => AreaSmall, (areaSmall) => areaSmall.language)
  areaSmalls: AreaSmall[];
  @OneToMany(() => Area, (area) => area.language)
  areas: Area[];
}
