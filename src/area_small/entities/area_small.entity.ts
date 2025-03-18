import { Article } from 'src/article/entities/article.entity'
import { Area } from 'src/area/entities/area.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { Language } from 'src/language/entities/language.entity'
@Entity()
export class AreaSmall {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', length: 255 })
  name: string
  @ManyToOne(() => Area, area => area.areaSmalls, { nullable: false })
  area: Area
  @OneToMany(() => Article, article => article.areaSmall)
  articles: Article[]
  @ManyToOne(() => Language, language => language.areaSmalls, {
    onDelete: 'CASCADE'
  })
  language: Language
  @Column()
  image: string;

  @Column({ nullable: true })
  description: string
}
