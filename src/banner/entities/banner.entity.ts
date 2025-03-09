import { Language } from 'src/language/entities/language.entity'
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
@Entity()
export class Banner {
  @PrimaryGeneratedColumn()
  id: number
  @Column({ type: 'varchar', length: 255 })
  imageUrl: string
  @Column({ type: 'varchar' })
  heading1: string
  @Column({ type: 'varchar' })
  heading2: string
  @Column({ default: false })
  status: boolean
  @ManyToOne(() => Language, language => language.banners, { nullable: false })
  language: Language
}
