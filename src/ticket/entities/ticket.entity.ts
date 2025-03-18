import { Account } from 'src/account/entities/account.entity'
import { Event } from 'src/event/entities/event.entity'
import { TypeClassTicket } from 'src/type_class_ticket/entities/type_class_ticket.entity'
import { User } from 'src/user/entities/user.entity'
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from 'typeorm'
@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number
  @ManyToOne(() => Event, event => event.tickets, { onDelete: 'CASCADE' })
  event: Event
  @ManyToOne(() => Account, account => account.tickets, { onDelete: 'CASCADE' })
  account: Account
  @ManyToOne(() => User, user => user.tickets, { onDelete: 'CASCADE' })
  user: User
  @Column({ type: 'varchar', length: 255, unique: true })
  code: string
  @Column({ type: 'varchar', length: 255 })
  seat: string
  @Column({ default: 1 })
  status: boolean
  @Column({ type: 'integer', default: 0 })
  discount: number
  @CreateDateColumn()
  CreatedAt: Date
  @ManyToOne(() => TypeClassTicket, typeClassTicket => typeClassTicket.tickets, { onDelete: 'CASCADE' })
  typeClassTicket: TypeClassTicket
}
