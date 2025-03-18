import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { TypeTicket } from 'src/type_ticket/entities/type_ticket.entity';
import { Event } from 'src/event/entities/event.entity';
import { ClassTicket } from 'src/class_ticket/entities/class_ticket.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';

@Entity()
export class TypeClassTicket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @ManyToOne(() => TypeTicket)
  type_ticket: TypeTicket;

  @ManyToOne(() => Event)
  event: Event;

  @ManyToOne(() => ClassTicket)
  class_ticket: ClassTicket;
  @OneToMany(() => Ticket, ticket => ticket.typeClassTicket)
  tickets: Ticket[];
}
