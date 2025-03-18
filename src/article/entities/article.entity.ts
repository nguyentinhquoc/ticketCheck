import { Area } from 'src/area/entities/area.entity'
import { AreaSmall } from 'src/area_small/entities/area_small.entity'
import { Language } from 'src/language/entities/language.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm'

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column({ type: 'longtext' }) // Dùng longtext để lưu HTML
  content: string

  @Column({ default: true })
  status: boolean

  @ManyToOne(() => Area, area => area.articles, {
    onDelete: 'CASCADE',
    nullable: true
  })
  area: Area

  @ManyToOne(() => Language, language => language.articles, {
    onDelete: 'CASCADE'
  })
  language: Language

  @ManyToOne(() => AreaSmall, areaSmall => areaSmall.articles, {
    onDelete: 'CASCADE',
    nullable: true
  })
  areaSmall: AreaSmall

  @Column({ nullable: true })
  description: string
}
