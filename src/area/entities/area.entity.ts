import { AreaSmall } from 'src/area_small/entities/area_small.entity';
import { Article } from 'src/article/entities/article.entity';
import { Language } from 'src/language/entities/language.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  code: string;

  @OneToMany(() => Article, (article) => article.area)
  articles: Article[];

  @OneToMany(() => AreaSmall, (areaSmall) => areaSmall.area)
  areaSmalls: AreaSmall[];

  @ManyToOne(() => Language, (language) => language.areas, { onDelete: 'CASCADE' })
  language: Language;
}
