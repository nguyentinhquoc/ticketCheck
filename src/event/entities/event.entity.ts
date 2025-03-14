import { Ticket } from 'src/ticket/entities/ticket.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column()
  quantity: number
  @Column()
  price: number
  @Column({ nullable: true })
  description: string
  @Column({ type: 'datetime' })
  start_date: Date
  @Column({ type: 'datetime' })
  end_date: Date
  @Column({ type: 'datetime' })
  sale_date: Date
  @OneToMany(() => Ticket, ticket => ticket.event)
  tickets: Ticket[]
}
