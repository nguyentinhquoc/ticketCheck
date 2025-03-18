import { Ticket } from 'src/ticket/entities/ticket.entity'
import { TypeClassTicket } from 'src/type_class_ticket/entities/type_class_ticket.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column()
  quantity: number
  @Column({ nullable: true })
  description: string
  @Column({ type: 'datetime' })
  start_date: Date
  @Column({ type: 'datetime' })
  end_date: Date
  @Column({ type: 'datetime' })
  sale_date: Date

  @Column({ type: 'longtext' })
  content: string

  @Column()
  main_image: string

  @Column({ nullable: true })
  sub_image1: string

  @Column({ nullable: true })
  sub_image2: string

  @Column({ nullable: true })
  sub_image3: string

  @Column({ nullable: true })
  sub_image4: string

  @OneToMany(() => Ticket, ticket => ticket.event)
  tickets: Ticket[]

  @OneToMany(() => TypeClassTicket, typeClassTicket => typeClassTicket.event)
  type_class_tickets: TypeClassTicket[]
}
