import { Ticket } from 'src/ticket/entities/ticket.entity'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

enum Role {
  ADMIN = 'admin',
  BAN_VE = 'banVe',
  SOAT_VE = 'soatVe'
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  user_name: string

  @Column()
  password: string

  @OneToMany(() => Ticket, ticket => ticket.account)
  tickets: Ticket[]

  @Column({
    type: 'enum',
    enum: ['admin', 'banVe', 'soatVe'],
    default: 'soatVe'
  })
  role: string
}
